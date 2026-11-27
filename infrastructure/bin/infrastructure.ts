#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CertificateStack } from '../lib/certificate-stack';
import { DeployRoleStack } from '../lib/deploy-role-stack';
import { InfrastructureStack } from '../lib/infrastructure-stack';

const DOMAIN = 'www.builttospill.com';
const BARE_DOMAIN = 'builttospill.com';
const ZONE = 'builttospill.com';

const app = new cdk.App();
const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

// The certificate, for www and the bare domain. CloudFront requires us-east-1.
new CertificateStack(app, 'BuiltToSpillCertificate', {
  env: { account: env.account, region: 'us-east-1' },
  domain: DOMAIN,
  alternativeNames: [BARE_DOMAIN],
  zoneName: ZONE,
});

// The site itself. SSL_CERT_ARN is the certificate above; the deploy workflow
// reads it from that stack's output once it has been issued.
const certificateArn = process.env.SSL_CERT_ARN;
if (certificateArn) {
  new InfrastructureStack(app, 'InfrastructureStack', {
    env,
    domain: DOMAIN,
    redirectDomains: [BARE_DOMAIN],
    zoneName: ZONE,
    certificateArn,
    lockBucket: String(app.node.tryGetContext('lockBucket')) === 'true',
  });
} else {
  console.warn('SSL_CERT_ARN is not set: skipping InfrastructureStack.');
}

// Optional, deployed by hand once: lets GitHub Actions deploy without stored AWS keys.
new DeployRoleStack(app, 'BuiltToSpillDeployRole', {
  env,
  repo: app.node.tryGetContext('githubRepo') ?? 'philmerrell/builttospill.com',
  bucketName: DOMAIN,
  siteStackName: 'InfrastructureStack',
  certificateStackName: 'BuiltToSpillCertificate',
  bareDomain: BARE_DOMAIN,
  existingProviderArn: app.node.tryGetContext('githubOidcProviderArn'),
});
