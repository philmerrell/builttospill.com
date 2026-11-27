import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import * as path from 'node:path';
import { test } from 'node:test';
import * as cdk from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { CertificateStack } from '../lib/certificate-stack';
import { DeployRoleStack } from '../lib/deploy-role-stack';
import { InfrastructureStack, LOGICAL_IDS } from '../lib/infrastructure-stack';

const env = { account: '111111111111', region: 'us-west-2' };

function synth(lockBucket = false) {
  const app = new cdk.App();
  const stack = new InfrastructureStack(app, 'InfrastructureStack', {
    env,
    domain: 'www.builttospill.com',
    redirectDomains: ['builttospill.com'],
    zoneName: 'builttospill.com',
    certificateArn: 'arn:aws:acm:us-east-1:111111111111:certificate/test',
    lockBucket,
  });
  return Template.fromStack(stack);
}

test('live resources keep their logical ids (an id change would replace them)', () => {
  const resources = synth().toJSON().Resources as Record<string, { Type: string }>;
  assert.equal(resources[LOGICAL_IDS.bucket]?.Type, 'AWS::S3::Bucket');
  assert.equal(resources[LOGICAL_IDS.bucketPolicy]?.Type, 'AWS::S3::BucketPolicy');
  assert.equal(resources[LOGICAL_IDS.distribution]?.Type, 'AWS::CloudFront::Distribution');
  assert.equal(resources[LOGICAL_IDS.aliasRecord]?.Type, 'AWS::Route53::RecordSet');

  // Exactly one of each: nothing is being created alongside the pinned resource.
  const count = (type: string) => Object.values(resources).filter((r) => r.Type === type).length;
  assert.equal(count('AWS::S3::Bucket'), 1);
  assert.equal(count('AWS::CloudFront::Distribution'), 1);
});

test('the bucket is retained and only readable through CloudFront', () => {
  const template = synth();
  template.hasResource('AWS::S3::Bucket', {
    DeletionPolicy: 'Retain',
    UpdateReplacePolicy: 'Retain',
    Properties: { BucketName: 'www.builttospill.com' },
  });

  const policy = template.toJSON().Resources[LOGICAL_IDS.bucketPolicy].Properties.PolicyDocument;
  const allows = policy.Statement.filter((s: { Effect: string }) => s.Effect === 'Allow');
  assert.equal(allows.length, 1);
  assert.deepEqual(allows[0].Principal, { Service: 'cloudfront.amazonaws.com' });
  assert.equal(allows[0].Action, 's3:GetObject');
  assert.ok(allows[0].Condition.StringEquals['AWS:SourceArn'], 'scoped to this distribution');
});

test('block public access is opt-in, so the migration deploy has no gap', () => {
  const unlocked = synth(false).toJSON().Resources[LOGICAL_IDS.bucket].Properties;
  assert.equal(unlocked.PublicAccessBlockConfiguration, undefined);

  synth(true).hasResourceProperties('AWS::S3::Bucket', {
    PublicAccessBlockConfiguration: {
      BlockPublicAcls: true,
      BlockPublicPolicy: true,
      IgnorePublicAcls: true,
      RestrictPublicBuckets: true,
    },
  });
});

test('the distribution serves a static multi-page site', () => {
  synth().hasResourceProperties('AWS::CloudFront::Distribution', {
    DistributionConfig: Match.objectLike({
      Aliases: ['www.builttospill.com', 'builttospill.com'],
      DefaultRootObject: 'index.html',
      HttpVersion: 'http2and3',
      PriceClass: 'PriceClass_100',
      DefaultCacheBehavior: Match.objectLike({
        Compress: true,
        ViewerProtocolPolicy: 'redirect-to-https',
        FunctionAssociations: [Match.objectLike({ EventType: 'viewer-request' })],
      }),
      CustomErrorResponses: [
        Match.objectLike({ ErrorCode: 403, ResponseCode: 404, ResponsePagePath: '/404.html' }),
        Match.objectLike({ ErrorCode: 404, ResponseCode: 404, ResponsePagePath: '/404.html' }),
      ],
      Origins: [Match.objectLike({ OriginAccessControlId: Match.anyValue() })],
      ViewerCertificate: Match.objectLike({ MinimumProtocolVersion: 'TLSv1.2_2021', SslSupportMethod: 'sni-only' }),
    }),
  });
});

test('the stack does not try to create the bare domain records', () => {
  // They already exist outside the stack; scripts/point-bare-domain.sh upserts them.
  const records = Object.values(synth().toJSON().Resources as Record<string, { Type: string; Properties: { Name: string } }>)
    .filter((r) => r.Type === 'AWS::Route53::RecordSet')
    .map((r) => r.Properties.Name);
  assert.deepEqual([...new Set(records)], ['www.builttospill.com.']);
  synth().hasOutput('DistributionDomainName', {});
});

test('the certificate covers www and the bare domain, validated through DNS', () => {
  const app = new cdk.App();
  const stack = new CertificateStack(app, 'Cert', {
    env: { account: env.account, region: 'us-east-1' },
    domain: 'www.builttospill.com',
    alternativeNames: ['builttospill.com'],
    zoneName: 'builttospill.com',
  });
  const template = Template.fromStack(stack);
  template.hasResourceProperties('AWS::CertificateManager::Certificate', {
    DomainName: 'www.builttospill.com',
    SubjectAlternativeNames: ['builttospill.com'],
    ValidationMethod: 'DNS',
  });
  template.hasOutput('CertificateArn', {});
});

test('the deploy role trusts only main on this repository', () => {
  const app = new cdk.App();
  const stack = new DeployRoleStack(app, 'Role', {
    env,
    repo: 'philmerrell/builttospill.com',
    bucketName: 'www.builttospill.com',
    siteStackName: 'InfrastructureStack',
    certificateStackName: 'BuiltToSpillCertificate',
    bareDomain: 'builttospill.com',
  });
  const template = Template.fromStack(stack);
  template.hasResourceProperties('AWS::IAM::Role', {
    AssumeRolePolicyDocument: Match.objectLike({
      Statement: [
        Match.objectLike({
          Action: 'sts:AssumeRoleWithWebIdentity',
          Condition: {
            StringEquals: { 'token.actions.githubusercontent.com:aud': 'sts.amazonaws.com' },
            StringLike: { 'token.actions.githubusercontent.com:sub': 'repo:philmerrell/builttospill.com:ref:refs/heads/main' },
          },
        }),
      ],
    }),
  });
});

/* ---------- the CloudFront Function ---------- */

const source = readFileSync(path.join(__dirname, '..', 'functions', 'viewer-request.js'), 'utf8');
// CloudFront Functions are a bare script with a global `handler`; load it the same way.
const handler = new Function(`${source}; return handler;`)() as (event: unknown) => any;
const request = (uri: string, querystring: Record<string, unknown> = {}, host = 'www.builttospill.com') => ({
  request: { uri, querystring, headers: { host: { value: host } } },
});

test('viewer-request: directories resolve to their index.html', () => {
  assert.equal(handler(request('/')).uri, '/index.html');
  assert.equal(handler(request('/music/')).uri, '/music/index.html');
  assert.equal(handler(request('/lyrics/keep-it-like-a-secret/carry-the-zero/')).uri, '/lyrics/keep-it-like-a-secret/carry-the-zero/index.html');
});

test('viewer-request: files pass through untouched', () => {
  for (const uri of ['/llms.txt', '/music/keep-it-like-a-secret.md', '/_astro/a.B1c2.css', '/data/shows.json', '/favicon.svg']) {
    assert.equal(handler(request(uri)).uri, uri);
  }
});

test('viewer-request: extensionless paths redirect to the trailing-slash URL', () => {
  const res = handler(request('/music/keep-it-like-a-secret'));
  assert.equal(res.statusCode, 301);
  assert.equal(res.headers.location.value, '/music/keep-it-like-a-secret/');

  const withQuery = handler(request('/shows', { utm_source: { value: 'ig' }, x: { value: '' } }));
  assert.equal(withQuery.headers.location.value, '/shows/?utm_source=ig&x');
});

test('viewer-request: the old app’s /home goes to /', () => {
  for (const uri of ['/home', '/home/']) {
    const res = handler(request(uri));
    assert.equal(res.statusCode, 301);
    assert.equal(res.headers.location.value, '/');
  }
});

test('viewer-request: the bare domain redirects to www in one hop', () => {
  const bare = (uri: string, qs: Record<string, unknown> = {}) => handler(request(uri, qs, 'builttospill.com'));

  assert.equal(bare('/').statusCode, 301);
  assert.equal(bare('/').headers.location.value, 'https://www.builttospill.com/');
  assert.equal(bare('/music/').headers.location.value, 'https://www.builttospill.com/music/');
  // a path that also needs its trailing slash, or is the old /home, still takes one redirect
  assert.equal(bare('/music/keep-it-like-a-secret').headers.location.value, 'https://www.builttospill.com/music/keep-it-like-a-secret/');
  assert.equal(bare('/home').headers.location.value, 'https://www.builttospill.com/');
  assert.equal(bare('/llms.txt').headers.location.value, 'https://www.builttospill.com/llms.txt');
  assert.equal(bare('/shows', { utm_source: { value: 'ig' } }).headers.location.value, 'https://www.builttospill.com/shows/?utm_source=ig');
  assert.equal(handler(request('/', {}, 'BuiltToSpill.com')).statusCode, 301);
});

test('viewer-request: www and unknown hosts are served, not redirected', () => {
  assert.equal(handler(request('/music/')).uri, '/music/index.html');
  assert.equal(handler(request('/', {}, 'd111111abcdef8.cloudfront.net')).uri, '/index.html');
  assert.equal(handler({ request: { uri: '/', querystring: {}, headers: {} } }).uri, '/index.html');
});
