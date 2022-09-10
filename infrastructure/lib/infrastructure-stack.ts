import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as s3Deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as targets from 'aws-cdk-lib/aws-route53-targets';
import * as cdk from 'aws-cdk-lib';

export class InfrastructureStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const domain = 'www.builttospill.com';
    const sslCertArn = process.env.SSL_CERT_ARN;

    // this should use the accountID to perform the lookup so it gets the sand zoneID and not the prod
    const zone = route53.HostedZone.fromLookup(this, 'GetHostedZone', {
      domainName: 'builttospill.com',
    });

    // creates the site link as a output after the cf template runs
    new cdk.CfnOutput(this, 'Site', {
      value: 'https://' + domain
    });

    // Content bucket for the site - empty
    const siteBucket = new s3.Bucket(this, 'SiteBucket', {
      bucketName: domain,
      websiteIndexDocument: 'index.html',
      publicReadAccess: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // NOT recommended for production code
    });
    new cdk.CfnOutput(this, 'Bucket', { value: siteBucket.bucketName });

    // CloudFront distribution that provides HTTPS
    const distribution = new cloudfront.CloudFrontWebDistribution(this, 'SiteDistribution', {
      defaultRootObject: 'index.html',
      priceClass: cloudfront.PriceClass.PRICE_CLASS_100,
      viewerCertificate: {
        aliases: [domain],
        props: {
          acmCertificateArn: sslCertArn,
          sslSupportMethod: 'sni-only',
          minimumProtocolVersion: 'TLSv1.2_2021'
        }
      },
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: siteBucket
          },
          behaviors: [{ isDefaultBehavior: true }],
        }
      ],
      errorConfigurations: [
        {
          errorCode: 404,
          errorCachingMinTtl: 300,
          responseCode: 200,
          responsePagePath: '/index.html'
        },
        {
          errorCode: 403,
          errorCachingMinTtl: 300,
          responseCode: 200,
          responsePagePath: '/index.html'
        }
      ]
    });

    new cdk.CfnOutput(this, 'DistributionId', { value: distribution.distributionId });

    // Route53 alias record for the CloudFront distribution
    new route53.ARecord(this, 'SiteAliasRecord', {
      recordName: domain,
      target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(distribution)),
      zone
    });

    // Deploy site contents to S3 bucket
    new s3Deploy.BucketDeployment(this, 'DeployWithInvalidation', {
      sources: [s3Deploy.Source.asset('../client/www')],
      destinationBucket: siteBucket,
      distribution,
      memoryLimit: 512,
      distributionPaths: ['/*'],
    });
  }
}
