#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { DeployRoleStack } from '../lib/deploy-role-stack';
import { InfrastructureStack } from '../lib/infrastructure-stack';

const DOMAIN = 'www.builttospill.com';

const app = new cdk.App();
const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

// The site itself. Needs the ACM certificate (us-east-1) for the domain.
const certificateArn = process.env.SSL_CERT_ARN;
if (certificateArn) {
  new InfrastructureStack(app, 'InfrastructureStack', {
    env,
    domain: DOMAIN,
    zoneName: 'builttospill.com',
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
  existingProviderArn: app.node.tryGetContext('githubOidcProviderArn'),
});
