import * as path from 'node:path';
import * as cdk from 'aws-cdk-lib';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as targets from 'aws-cdk-lib/aws-route53-targets';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export interface InfrastructureStackProps extends cdk.StackProps {
  /** Host the site is served from, and the name of the content bucket. */
  domain: string;
  /** Route 53 hosted zone that owns `domain`. */
  zoneName: string;
  /** ACM certificate for `domain`, in us-east-1. */
  certificateArn: string;
  /**
   * Turn on S3 Block Public Access for the content bucket.
   *
   * Leave false for the deploy that migrates the old public bucket: CloudFormation
   * updates the bucket before the distribution, so blocking public access in that
   * same deploy would cut CloudFront off for the few minutes the distribution takes
   * to switch to signed (OAC) requests. Once that deploy has finished the bucket
   * policy no longer allows public reads at all, and this can be set to true as
   * belt and braces.
   */
  lockBucket?: boolean;
}

/**
 * The live distribution was created in 2022 by the deprecated
 * `CloudFrontWebDistribution` construct. Moving to `Distribution` would normally
 * change the resource's logical id, and CloudFormation would try to create a second
 * distribution with the same alias (which fails) before deleting the first.
 * Pinning the original id turns the change into an ordinary in-place update.
 * `test/stack.test.ts` fails if any of these ever drift.
 */
export const LOGICAL_IDS = {
  bucket: 'SiteBucket397A1860',
  bucketPolicy: 'SiteBucketPolicy3AC1D0F8',
  distribution: 'SiteDistributionCFDistribution209CF7F5',
  aliasRecord: 'SiteAliasRecord3C0AF5BF',
} as const;

export class InfrastructureStack extends cdk.Stack {
  public readonly bucket: s3.Bucket;
  public readonly distribution: cloudfront.Distribution;

  constructor(scope: Construct, id: string, props: InfrastructureStackProps) {
    super(scope, id, props);
    const { domain, zoneName, certificateArn, lockBucket = false } = props;

    /* ---------- content bucket: private, only CloudFront may read ---------- */

    this.bucket = new s3.Bucket(this, 'SiteBucket', {
      bucketName: domain,
      encryption: s3.BucketEncryption.S3_MANAGED,
      enforceSSL: true,
      blockPublicAccess: lockBucket ? s3.BlockPublicAccess.BLOCK_ALL : undefined,
      // The bucket holds the live site. Never let a stack change delete it.
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    });

    /* ---------- edge behaviour ---------- */

    const viewerRequest = new cloudfront.Function(this, 'ViewerRequest', {
      comment: 'builttospill.com: directory indexes and canonical trailing slashes',
      runtime: cloudfront.FunctionRuntime.JS_2_0,
      code: cloudfront.FunctionCode.fromFile({
        filePath: path.join(__dirname, '..', 'functions', 'viewer-request.js'),
      }),
    });

    const headers = new cloudfront.ResponseHeadersPolicy(this, 'SecurityHeaders', {
      comment: 'builttospill.com security headers',
      securityHeadersBehavior: {
        contentTypeOptions: { override: true },
        frameOptions: { frameOption: cloudfront.HeadersFrameOption.SAMEORIGIN, override: true },
        referrerPolicy: {
          referrerPolicy: cloudfront.HeadersReferrerPolicy.STRICT_ORIGIN_WHEN_CROSS_ORIGIN,
          override: true,
        },
        strictTransportSecurity: {
          accessControlMaxAge: cdk.Duration.days(365),
          includeSubdomains: false,
          override: true,
        },
      },
    });

    this.distribution = new cloudfront.Distribution(this, 'SiteDistribution', {
      comment: domain,
      domainNames: [domain],
      certificate: acm.Certificate.fromCertificateArn(this, 'Certificate', certificateArn),
      minimumProtocolVersion: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
      sslSupportMethod: cloudfront.SSLMethod.SNI,
      httpVersion: cloudfront.HttpVersion.HTTP2_AND_3,
      priceClass: cloudfront.PriceClass.PRICE_CLASS_100,
      defaultRootObject: 'index.html',
      defaultBehavior: {
        origin: origins.S3BucketOrigin.withOriginAccessControl(this.bucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD,
        compress: true,
        // Honours the Cache-Control each object was uploaded with (see scripts/deploy.sh).
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
        responseHeadersPolicy: headers,
        functionAssociations: [
          { function: viewerRequest, eventType: cloudfront.FunctionEventType.VIEWER_REQUEST },
        ],
      },
      // A private bucket answers 403 for a missing key; both mean "not found" here.
      errorResponses: [403, 404].map((httpStatus) => ({
        httpStatus,
        responseHttpStatus: 404,
        responsePagePath: '/404.html',
        ttl: cdk.Duration.minutes(1),
      })),
    });

    /* ---------- DNS ---------- */

    const zone = route53.HostedZone.fromLookup(this, 'GetHostedZone', { domainName: zoneName });
    const target = route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(this.distribution));
    const aliasRecord = new route53.ARecord(this, 'SiteAliasRecord', { recordName: domain, target, zone });
    new route53.AaaaRecord(this, 'SiteAliasRecordV6', { recordName: domain, target, zone });

    /* ---------- keep the existing resources' identities ---------- */

    const pin = (construct: Construct | undefined, logicalId: string) => {
      if (!construct) throw new Error(`Nothing to pin to ${logicalId}`);
      (construct.node.defaultChild as cdk.CfnResource).overrideLogicalId(logicalId);
    };
    pin(this.bucket, LOGICAL_IDS.bucket);
    pin(this.bucket.policy, LOGICAL_IDS.bucketPolicy);
    pin(this.distribution, LOGICAL_IDS.distribution);
    pin(aliasRecord, LOGICAL_IDS.aliasRecord);

    /* ---------- outputs (read by the deploy workflow) ---------- */

    new cdk.CfnOutput(this, 'Site', { value: `https://${domain}` });
    new cdk.CfnOutput(this, 'Bucket', { value: this.bucket.bucketName });
    new cdk.CfnOutput(this, 'DistributionId', { value: this.distribution.distributionId });
  }
}
