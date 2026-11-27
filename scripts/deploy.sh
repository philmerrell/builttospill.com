#!/usr/bin/env bash
#
# Upload ./dist to the site bucket and refresh the CDN.
#
#   SITE_BUCKET=www.builttospill.com DISTRIBUTION_ID=E123... scripts/deploy.sh
#
# Order matters. Fingerprinted assets go up first, so the new pages never point at
# files that are not there yet, and the old ones are only pruned once the new
# pages are live.
set -euo pipefail

: "${SITE_BUCKET:?Set SITE_BUCKET to the S3 bucket name}"
: "${DISTRIBUTION_ID:?Set DISTRIBUTION_ID to the CloudFront distribution id}"
DIST="${DIST_DIR:-dist}"
[ -f "$DIST/index.html" ] || { echo "No build found in $DIST. Run npm run build first." >&2; exit 1; }

# /_astro/* file names contain a content hash: cache them forever.
IMMUTABLE="public,max-age=31536000,immutable"
# Pages and data: browsers re-check after a minute, CloudFront keeps them until the
# invalidation at the end of the next deploy.
PAGES="public,max-age=60,s-maxage=86400"

echo "› fingerprinted assets"
aws s3 sync "$DIST/_astro" "s3://$SITE_BUCKET/_astro" \
  --cache-control "$IMMUTABLE" --size-only --no-progress

echo "› pages and data"
aws s3 sync "$DIST" "s3://$SITE_BUCKET" \
  --exclude "_astro/*" --cache-control "$PAGES" --delete --no-progress

# S3 guesses a bare content type from the extension. Text that people and agents
# read directly needs its charset, or curly quotes and dashes turn to mojibake.
retype() { # <glob> <content-type>
  aws s3 cp "$DIST" "s3://$SITE_BUCKET" --recursive --exclude "*" --include "$1" --exclude "_astro/*" \
    --content-type "$2" --cache-control "$PAGES" --no-progress --only-show-errors
}
echo "› content types"
retype "*.html" "text/html; charset=utf-8"
retype "*.md" "text/markdown; charset=utf-8"
retype "*.txt" "text/plain; charset=utf-8"
retype "*.json" "application/json; charset=utf-8"
retype "*.xml" "application/xml; charset=utf-8"
retype "*.webmanifest" "application/manifest+json; charset=utf-8"

echo "› pruning assets from earlier builds"
aws s3 sync "$DIST/_astro" "s3://$SITE_BUCKET/_astro" \
  --cache-control "$IMMUTABLE" --size-only --delete --no-progress

echo "› invalidating the CDN"
aws cloudfront create-invalidation --distribution-id "$DISTRIBUTION_ID" --paths "/*" \
  --query "Invalidation.[Id,Status]" --output text

echo "✓ deployed to s3://$SITE_BUCKET"
