#!/usr/bin/env bash
#
# Point the bare domain (builttospill.com) at the CloudFront distribution, which
# redirects it to www over HTTPS.
#
#   BARE_DOMAIN=builttospill.com STACK_NAME=InfrastructureStack scripts/point-bare-domain.sh
#
# Why a script and not CloudFormation: these records already exist (they used to
# alias an S3 redirect bucket, which cannot serve HTTPS). CloudFormation can only
# adopt an existing record by deleting it first. UPSERT replaces a record in one
# atomic change, so there is never a moment without one, and a failure leaves
# things exactly as they were. Safe to run repeatedly.
set -euo pipefail

: "${BARE_DOMAIN:?Set BARE_DOMAIN, e.g. builttospill.com}"
: "${STACK_NAME:?Set STACK_NAME to the CloudFormation stack of the site}"
CLOUDFRONT_ZONE_ID="Z2FDTNDATAQYW2" # the fixed hosted zone id of every CloudFront alias target

output() {
  aws cloudformation describe-stacks --stack-name "$STACK_NAME" \
    --query "Stacks[0].Outputs[?OutputKey=='$1'].OutputValue" --output text
}
TARGET=$(output DistributionDomainName)
DISTRIBUTION_ID=$(output DistributionId)
[ -n "$TARGET" ] && [ "$TARGET" != "None" ] || { echo "No DistributionDomainName output on $STACK_NAME" >&2; exit 1; }

# Never point DNS at a distribution that would refuse the name.
ALIASES=$(aws cloudfront get-distribution --id "$DISTRIBUTION_ID" \
  --query "Distribution.DistributionConfig.Aliases.Items" --output text | tr '\t\n' '  ')
if ! printf ' %s ' "$ALIASES" | grep -q -F " $BARE_DOMAIN "; then
  echo "$DISTRIBUTION_ID does not list $BARE_DOMAIN as an alias: $ALIASES. Leaving DNS alone." >&2
  exit 1
fi

ZONE_ID=$(aws route53 list-hosted-zones-by-name --dns-name "$BARE_DOMAIN." --max-items 1 \
  --query "HostedZones[?Name=='$BARE_DOMAIN.'] | [0].Id" --output text)
[ -n "$ZONE_ID" ] && [ "$ZONE_ID" != "None" ] || { echo "No hosted zone for $BARE_DOMAIN" >&2; exit 1; }

record() { # <type>
  printf '{"Action":"UPSERT","ResourceRecordSet":{"Name":"%s.","Type":"%s","AliasTarget":{"HostedZoneId":"%s","DNSName":"%s.","EvaluateTargetHealth":false}}}' \
    "$BARE_DOMAIN" "$1" "$CLOUDFRONT_ZONE_ID" "$TARGET"
}

echo "› $BARE_DOMAIN A and AAAA -> $TARGET"
aws route53 change-resource-record-sets --hosted-zone-id "$ZONE_ID" \
  --change-batch "{\"Comment\":\"Bare domain to CloudFront\",\"Changes\":[$(record A),$(record AAAA)]}" \
  --query "ChangeInfo.[Id,Status]" --output text
