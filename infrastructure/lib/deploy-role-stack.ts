import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export interface DeployRoleStackProps extends cdk.StackProps {
  /** GitHub repository allowed to assume the role, as `owner/name`. */
  repo: string;
  /** The site's content bucket. */
  bucketName: string;
  /** Name of the site stack, so the workflow can read its outputs. */
  siteStackName: string;
  /**
   * ARN of the account's GitHub OIDC provider if one already exists. An account
   * can only have one per issuer, so pass `-c githubOidcProviderArn=...` rather
   * than letting this stack try to create a second.
   */
  existingProviderArn?: string;
}

/**
 * A role GitHub Actions can assume with a short-lived OIDC token, so the
 * repository no longer needs a long-lived AWS access key in its secrets.
 *
 * It is limited to pushes on `main` of one repository, and to exactly what a
 * deploy does: write the site bucket, invalidate the CDN, and hand off to the
 * CDK bootstrap roles for infrastructure changes.
 */
export class DeployRoleStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: DeployRoleStackProps) {
    super(scope, id, props);
    const { repo, bucketName, siteStackName, existingProviderArn } = props;

    const providerArn =
      existingProviderArn ??
      new iam.OpenIdConnectProvider(this, 'GitHub', {
        url: 'https://token.actions.githubusercontent.com',
        clientIds: ['sts.amazonaws.com'],
      }).openIdConnectProviderArn;

    const role = new iam.Role(this, 'Role', {
      roleName: 'builttospill-site-deploy',
      description: `Deploys ${bucketName} from GitHub Actions (${repo}, main only)`,
      maxSessionDuration: cdk.Duration.hours(1),
      assumedBy: new iam.WebIdentityPrincipal(providerArn, {
        StringEquals: { 'token.actions.githubusercontent.com:aud': 'sts.amazonaws.com' },
        StringLike: { 'token.actions.githubusercontent.com:sub': `repo:${repo}:ref:refs/heads/main` },
      }),
    });

    role.addToPolicy(
      new iam.PolicyStatement({
        sid: 'SiteBucketList',
        actions: ['s3:ListBucket', 's3:GetBucketLocation'],
        resources: [`arn:aws:s3:::${bucketName}`],
      }),
    );
    role.addToPolicy(
      new iam.PolicyStatement({
        sid: 'SiteBucketObjects',
        actions: ['s3:GetObject', 's3:PutObject', 's3:DeleteObject'],
        resources: [`arn:aws:s3:::${bucketName}/*`],
      }),
    );
    role.addToPolicy(
      new iam.PolicyStatement({
        sid: 'InvalidateCdn',
        actions: ['cloudfront:CreateInvalidation', 'cloudfront:GetInvalidation'],
        resources: [`arn:aws:cloudfront::${this.account}:distribution/*`],
      }),
    );
    role.addToPolicy(
      new iam.PolicyStatement({
        sid: 'ReadSiteStackOutputs',
        actions: ['cloudformation:DescribeStacks'],
        resources: [`arn:aws:cloudformation:${this.region}:${this.account}:stack/${siteStackName}/*`],
      }),
    );
    role.addToPolicy(
      new iam.PolicyStatement({
        sid: 'CdkDeployViaBootstrapRoles',
        actions: ['sts:AssumeRole'],
        resources: [`arn:aws:iam::${this.account}:role/cdk-*`],
      }),
    );

    new cdk.CfnOutput(this, 'RoleArn', {
      value: role.roleArn,
      description: 'Set this as the AWS_DEPLOY_ROLE_ARN repository variable',
    });
  }
}
