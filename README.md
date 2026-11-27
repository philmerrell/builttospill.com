# builttospill.com

The official Built to Spill website: tour dates, every record with playable
tracklists, videos, Doug Martsch's handwritten lyrics, and merch.

A static site built with [Astro](https://astro.build), served from S3 behind
CloudFront, deployed by GitHub Actions.

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # writes ./dist
npm run verify     # checks ./dist (links, metadata, structured data, size budgets)
npm test           # type-check + build + verify, what CI runs
```

Node 24 (see `.nvmrc`).

## What's where

```
src/
  data/
    albums.json        every release: tracks, YouTube ids, durations, links, lyric sheets
    videos.json        the videos page; `"featured": true` puts one on the home page
    site.ts            nav, store and social links, the live theme, facts for structured data
    snapshots/         last-known tour dates and merch, used only if an API is down
  assets/
    albums/            cover art (any size; resized and re-encoded at build time)
    lyrics/<album>/    the handwritten lyric sheets
    art/               logo, cloud, the rider, Doug's line drawings
  pages/               one file per URL, plus the .md / .txt / .json endpoints
  components/          Header, Footer, Player, TrackList, ShowList, ...
  scripts/
    player.ts          the persistent player
    router.ts          page navigation that leaves the player alone
    shows.ts           live refresh of tour dates in the browser
  lib/                 data loading, colour extraction, schema.org, Markdown output
  styles/global.css    the design system and the base look
  styles/themes/       the other looks, including the live one (see Themes)
infrastructure/        AWS CDK app (S3, CloudFront, Route 53, optional deploy role)
scripts/               deploy.sh, verify-build.mjs, snapshot.mjs, make-icons.mjs, make-art.mjs
.github/workflows/     ci.yml (pull requests) and deploy.yml (main, schedule, manual)
```

## Changing content

**A new record.** Add an object to the top of `src/data/albums.json` (newest
first) and drop the cover into `src/assets/albums/`. The first album in the file
is "the latest record" on the home page and what the player has cued up on a
first visit. Its page colours are derived from the cover automatically (see
`src/lib/theme.ts`; hand-set a palette there if the maths gets one wrong).

**A lyric sheet.** Save the scan as `src/assets/lyrics/<album-id>/<song>.png` and
add `"lyricsSheet": "<album-id>/<song>.png"` to the track. It gets its own page
at `/lyrics/<album-id>/<song>/` and a "lyrics" link in the tracklist.

**A video.** Add it to `src/data/videos.json`.

**Tour dates and merch** are not edited here. Shows come from Bandsintown and
merch from Big Cartel, fetched at build time. The site rebuilds every six hours,
and the browser also re-checks Bandsintown whenever a show list is on screen, so
a new date appears without anyone touching the repo.

## How it works

**The player never stops.** The player bar and its YouTube frame live outside
`<main>`. `src/scripts/router.ts` hooks Astro's client router so a navigation
swaps only `<main>` and the document head; the frame is never moved or reloaded,
so audio and video carry on across pages, in the bar, picture-in-picture or
theatre size. Any element with `data-play data-yt="…"` is a play button, and its
siblings inside the nearest `[data-playlist]` become the queue. No YouTube code
is requested until someone presses play.

**Fast by construction.** Every page is prerendered HTML. First load is about
12 kB of JavaScript and 37 kB of CSS, self-hosted fonts, and images
resized to WebP/AVIF at build time. Third-party requests on first paint: none on
most pages, Big Cartel product thumbnails on the home page.

**Readable by search engines and AI agents.**

- schema.org JSON-LD on every page: `MusicGroup`, `MusicAlbum` with every
  `MusicRecording`, `MusicEvent` per show, `VideoObject`, breadcrumbs.
- [`/llms.txt`](https://llmstxt.org) indexes the site; `/llms-full.txt` is all of it
  in one file.
- Every page has a Markdown twin at the same URL plus `.md`
  (`/shows.md`, `/music/keep-it-like-a-secret.md`), advertised with
  `<link rel="alternate" type="text/markdown">`.
- JSON feeds: `/data/shows.json`, `/data/discography.json`, `/data/videos.json`.
- `robots.txt` welcomes AI crawlers by name; `sitemap-index.xml` lists every page.
- Works without JavaScript: all content and links are in the HTML.

Lyrics are published only as images of the handwritten sheets; they are not
transcribed anywhere on the site.

## Deployment

Pushing to `main` deploys. `.github/workflows/deploy.yml`:

1. builds and verifies the site;
2. if anything under `infrastructure/` changed: deploys the certificate stack,
   then `InfrastructureStack`, then points the bare domain's DNS at CloudFront;
3. syncs `dist/` to the `www.builttospill.com` bucket (`scripts/deploy.sh`):
   fingerprinted `/_astro/*` files cached for a year, pages for a minute in the
   browser and a day at the edge;
4. invalidates CloudFront.

It also runs every six hours and can be run by hand from the Actions tab (tick
"Also deploy the AWS infrastructure" to force step 2).

Pull requests run `.github/workflows/ci.yml`: type-check, build, verify, and the
infrastructure tests.

### Repository settings it uses

| Name | Kind | Needed for |
| --- | --- | --- |
| `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` | secret | AWS access (until the OIDC role below is set up) |
| `AWS_ACCOUNT_ID` | secret | infrastructure deploys with access keys: `cdk bootstrap` |
| `AWS_DEPLOY_ROLE_ARN` | variable | optional: deploy with OIDC instead of access keys |

These are the same secrets the previous workflow used. `SSL_CERT_ARN` is no
longer read: the certificate is now created by the `BuiltToSpillCertificate`
stack and its ARN passed along by the workflow. The secret, and the old
www-only certificate it names, can be deleted.

### The bare domain

`builttospill.com` (no `www`) is an alias on the same CloudFront distribution and
only ever redirects to `https://www.builttospill.com/…`, in one hop, keeping the
path and query string (`infrastructure/functions/viewer-request.js`). The
certificate covers both names.

Its two DNS records (A and AAAA) are set by `scripts/point-bare-domain.sh`, which
the workflow runs after each infrastructure deploy, rather than by
CloudFormation. They existed before the stack did, pointing at an S3 redirect
bucket that could not serve HTTPS, and CloudFormation can only adopt an existing
record by deleting it first. The script replaces them in one atomic change and
refuses to run unless the distribution already lists the bare domain.

The old S3 bucket named `builttospill.com` is no longer used and can be deleted.

### The first deploy of this version

The infrastructure change and the new site go out in the same run, in that order,
and are designed to be safe on the live distribution:

- The S3 bucket, bucket policy, CloudFront distribution and DNS record keep their
  CloudFormation logical ids, so they are **updated in place, not replaced**
  (`infrastructure/test/stack.test.ts` enforces this).
- CloudFront moves from reading a public bucket to signed Origin Access Control
  requests. The bucket policy is only tightened after the distribution has
  finished switching, so there is no window where CloudFront is locked out.
- The old Lambda-based uploader is removed from the stack. It was created with
  `retainOnDelete` (the default), so removing it leaves the bucket's contents alone.
- Between the distribution update and the upload finishing (about a minute) deep
  links may briefly 404. The home page keeps working throughout.

Afterwards:

1. **Block public access on the bucket.** Done: `"lockBucket": true` in
   `infrastructure/cdk.json`. The bucket was already private by policy once the
   first deploy finished; this adds S3's own guard on top. It had to wait for a
   second deploy because turning it on in the same change as the move to Origin
   Access Control would briefly have cut CloudFront off.
2. **Stop storing AWS keys in GitHub** (still to do). With admin credentials, once:

   ```bash
   cd infrastructure && npm ci
   npx cdk deploy BuiltToSpillDeployRole
   ```

   Put the printed `RoleArn` in a repository **variable** named
   `AWS_DEPLOY_ROLE_ARN`, confirm a deploy works, then delete the two access-key
   secrets and the IAM user behind them. If the account already has a GitHub OIDC
   provider, add `-c githubOidcProviderArn=arn:aws:iam::<account>:oidc-provider/token.actions.githubusercontent.com`.

### Deploying by hand

```bash
npm run build && npm run verify
SITE_BUCKET=www.builttospill.com DISTRIBUTION_ID=<id> scripts/deploy.sh
```

## Themes

Four complete looks are kept in the repo. Visitors get one; the rest are there
to come back to.

| Look | Background | Type | Taken from |
| --- | --- | --- | --- |
| **Cut paper** (live) | *Keep It Like a Secret* blue, with Doug's painting of his record shelf printed across the top | Barrio on pasted white labels, Cabin, Bodoni Moda italic | the label on the *Keep It Like a Secret* sleeve |
| Sleeve | pale yellow paper and the cloud | Archivo Expanded, Bodoni Moda italic | *There's Nothing Wrong With Love* |
| Storm | the *Wind* painting, dark | Londrina Solid, Fraunces, Hanken Grotesk | the lettering on *When the Wind Forgets Your Name* |
| Photocopy | speckled white with Doug's gear drawing | Special Elite, Courier Prime | a xeroxed show flyer |

Cut paper also has alternative backgrounds: clouds, a flat-shape collage, Doug's
guitar drawing, his gear drawing, and a halftone sky.

**How it is put together.** `src/styles/global.css` is the base look (Sleeve).
Each file in `src/styles/themes/` restyles the same markup under
`html[data-look='…']`. The live look is named in `src/data/site.ts` (`theme`)
and written onto `<html>` when the site is built, so it is in the HTML itself:
no script, no flash. On album and lyric pages each record's own colours, taken
from its cover, replace the theme's paper and accent.

**The picker is not for visitors.** On the dev server a small bar lets you flip
between every look on any page (keys 1-4, `[` and `]` for Cut paper's
backgrounds, or a link like `/music/?look=storm`). A normal production build
contains neither the bar nor the other looks' stylesheets and fonts, and
`npm run verify` fails the build if the picker turns up in it. To put the picker
in a build on purpose, for a private preview say:

```bash
PUBLIC_THEME_PICKER=true npm run build
```

**Changing the live look.** Set `theme` in `src/data/site.ts`, and in
`src/layouts/Base.astro` import that look's stylesheet and fonts in place of
Cut paper's. Then `npm run icons` if the favicon and link-preview image should
follow.

## Design notes

The looks are taken from the band's own artwork rather than invented:

- the hand-lettered label on *Keep It Like a Secret*: black letters on white
  strips, pasted at an angle on flat sky blue, with one hot orange;
- Doug's painting of his record shelf, printed in one colour behind the title of
  each page (`npm run art` regenerates the print from the painting);
- the paint of Alex Graham's *When the Wind Forgets Your Name* cover for the loud
  moments, with its rider flying out of the record;
- Doug's handwriting, shown as ink on the page rather than as a picture of paper;
- Doug's line drawing of the gear, behind the footer;
- hard, flat, offset shadows: screen-print, not gloss.

Each record's page is recoloured from its cover.
