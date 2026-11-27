import * as cdk from 'aws-cdk-lib';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as route53 from 'aws-cdk-lib/aws-route53';
import { Construct } from 'constructs';

export interface CertificateStackProps extends cdk.StackProps {
  /** The name the site is served from. */
  domain: string;
  /** Other names the certificate must also cover (the bare domain). */
  alternativeNames: string[];
  /** Route 53 hosted zone that owns all of them; used to prove ownership. */
  zoneName: string;
}

/**
 * The TLS certificate for the site.
 *
 * CloudFront only accepts certificates from us-east-1, so this is its own stack
 * in that region. The deploy workflow reads the ARN from this stack's output
 * and hands it to InfrastructureStack.
 *
 * It covers the bare domain as well as www. Without that, CloudFront cannot
 * answer https://builttospill.com at all and browsers, which try HTTPS first,
 * sit on a timeout.
 */
export class CertificateStack extends cdk.Stack {
  public readonly certificate: acm.Certificate;

  constructor(scope: Construct, id: string, props: CertificateStackProps) {
    super(scope, id, props);

    const zone = route53.HostedZone.fromLookup(this, 'Zone', { domainName: props.zoneName });

    this.certificate = new acm.Certificate(this, 'Certificate', {
      domainName: props.domain,
      subjectAlternativeNames: props.alternativeNames,
      // ACM writes the validation records into the zone itself and renews automatically.
      validation: acm.CertificateValidation.fromDns(zone),
    });

    new cdk.CfnOutput(this, 'CertificateArn', { value: this.certificate.certificateArn });
  }
}
