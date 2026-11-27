# Infrastructure

AWS CDK app for www.builttospill.com. See the Deployment section of the
[main README](../README.md) for how it is deployed and what the first deploy does.

| Stack | What it is |
| --- | --- |
| `BuiltToSpillCertificate` | The TLS certificate for `www.builttospill.com` and `builttospill.com`, in us-east-1 (CloudFront requires that region). Deployed by the workflow just before the site stack. |
| `InfrastructureStack` | The site: private S3 bucket, CloudFront distribution (Origin Access Control, URL-rewrite function, security headers, HTTP/3), Route 53 records. Deployed by the workflow when this folder changes. |
| `BuiltToSpillDeployRole` | Optional. An IAM role GitHub Actions assumes over OIDC, so the repository needs no stored AWS keys. Deployed by hand, once. |

```bash
npm ci
npm test         # synthesises the stacks and tests the CloudFront function; no AWS access needed
npm run diff     # compare with what is deployed (needs AWS credentials and SSL_CERT_ARN)
```

`functions/viewer-request.js` is the CloudFront Function that turns `/music/` into
`/music/index.html`, redirects `/music` to `/music/`, and sends the bare domain to `www`.

The logical ids pinned in `lib/infrastructure-stack.ts` belong to resources that
are live. Do not rename them: CloudFormation would try to replace the
distribution and the bucket.
