#!/usr/bin/env node
/**
 * Checks the finished build in ./dist before it is allowed anywhere near production.
 *
 *   · every page has a title, description, canonical URL, one <h1> and valid JSON-LD
 *   · every internal link, image and srcset entry points at a file that exists
 *   · the machine-readable layer is present and parses (llms.txt, Markdown twins, JSON, sitemap)
 *   · the first-load JS and CSS stay inside their budgets
 *   · the theme picker has not leaked into a build meant for visitors
 *
 * Exits non-zero on any error. No dependencies: it reads the HTML as text.
 */
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;
const BUDGET = { js: 45_000, css: 60_000, html: 150_000 };

const errors = [];
const warnings = [];
const fail = (where, msg) => errors.push(`${where}: ${msg}`);
const warn = (where, msg) => warnings.push(`${where}: ${msg}`);

if (!existsSync(join(DIST, 'index.html'))) {
  console.error('dist/index.html is missing. Run `npm run build` first.');
  process.exit(1);
}

const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]));
const files = walk(DIST);
const rel = (f) => '/' + relative(DIST, f);
const pages = files.filter((f) => f.endsWith('.html'));

/** Does a root-relative URL resolve to something in dist? */
function resolves(url) {
  const path = decodeURIComponent(url.split('#')[0].split('?')[0]);
  if (!path) return true;
  const target = join(DIST, path);
  if (path.endsWith('/')) return existsSync(join(target, 'index.html'));
  return existsSync(target) && statSync(target).isFile();
}

const attr = (html, re) => [...html.matchAll(re)].map((m) => m[1]);
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&#38;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'");

let linkCount = 0;
let ldCount = 0;
const titles = new Map();

for (const file of pages) {
  const where = rel(file);
  const html = readFileSync(file, 'utf8');
  const isRedirect = /http-equiv="refresh"/i.test(html);

  if (!isRedirect) {
    const title = (html.match(/<title>([^<]*)<\/title>/) ?? [])[1];
    if (!title) fail(where, 'missing <title>');
    else if (titles.has(title)) fail(where, `duplicate <title> (also ${titles.get(title)})`);
    else titles.set(title, where);

    const description = (html.match(/<meta name="description" content="([^"]*)"/) ?? [])[1];
    if (!description) fail(where, 'missing meta description');
    else if (description.length > 200) warn(where, `meta description is ${description.length} characters`);

    if (!/<link rel="canonical" href="https:\/\/www\.builttospill\.com\//.test(html)) fail(where, 'missing canonical URL');
    if (!/<html[^>]*\slang="en"/.test(html)) fail(where, 'missing lang attribute');
    if (!/property="og:image" content="https:\/\//.test(html)) fail(where, 'missing absolute og:image');

    const h1 = (html.match(/<h1[\s>]/g) ?? []).length;
    if (h1 !== 1 && where !== '/404.html') fail(where, `expected exactly one <h1>, found ${h1}`);

    const blocks = attr(html, /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g);
    if (!blocks.length && where !== '/404.html') fail(where, 'no JSON-LD');
    for (const block of blocks) {
      try {
        const data = JSON.parse(block);
        if (data['@context'] !== 'https://schema.org' || !Array.isArray(data['@graph'])) fail(where, 'JSON-LD is not a schema.org @graph');
        ldCount += data['@graph'].length;
      } catch (e) {
        fail(where, `JSON-LD does not parse: ${e.message}`);
      }
    }

    for (const img of html.match(/<img\b[^>]*>/g) ?? []) {
      if (!/\salt[\s=>]/.test(img)) fail(where, `image without alt: ${img.slice(0, 80)}`);
      if (!/\swidth=/.test(img) || !/\sheight=/.test(img)) fail(where, `image without dimensions (layout shift): ${img.slice(0, 80)}`);
    }

    // The theme picker is a tool for the people making the site. Visitors never get it
    // unless the build was explicitly made with PUBLIC_THEME_PICKER=true.
    if (/id="looks"/.test(html) && process.env.PUBLIC_THEME_PICKER !== 'true') fail(where, 'the theme picker is in a build meant for visitors');
    if (!/<html[^>]*\sdata-look="/.test(html) && where !== '/assets/store/index.html') warn(where, 'no data-look on <html>: the base look is being served');

    if (Buffer.byteLength(html) > BUDGET.html) fail(where, `HTML is ${Buffer.byteLength(html)} bytes (budget ${BUDGET.html})`);
  }

  const urls = [
    ...attr(html, /\shref="([^"]+)"/g),
    ...attr(html, /\ssrc="([^"]+)"/g),
    ...attr(html, /\ssrcset="([^"]+)"/g).flatMap((s) => s.split(',').map((p) => p.trim().split(/\s+/)[0])),
    ...attr(html, /\sdata-cover="([^"]+)"/g),
    ...attr(html, /\sdata-href="([^"]+)"/g),
  ].map(decode);

  for (const url of urls) {
    if (!url.startsWith('/') || url.startsWith('//')) continue;
    linkCount++;
    if (!resolves(url)) fail(where, `broken internal reference ${url}`);
    // One canonical URL per page: page links carry their trailing slash.
    const path = url.split('#')[0].split('?')[0];
    if (!path.endsWith('/') && !/\.[a-z0-9]+$/i.test(path)) fail(where, `page link without trailing slash ${url}`);
  }
}

/* ---------- machine-readable layer ---------- */

const mustExist = [
  '/robots.txt',
  '/llms.txt',
  '/llms-full.txt',
  '/sitemap-index.xml',
  '/404.html',
  '/index.md',
  '/shows.md',
  '/music.md',
  '/videos.md',
  '/lyrics.md',
  '/favicon.svg',
  '/og.jpg',
];
for (const f of mustExist) if (!existsSync(join(DIST, f))) fail(f, 'missing from the build');

for (const f of ['/data/shows.json', '/data/discography.json', '/data/videos.json']) {
  try {
    JSON.parse(readFileSync(join(DIST, f), 'utf8'));
  } catch (e) {
    fail(f, `does not parse: ${e.message}`);
  }
}

// Every album page has a Markdown twin, and llms.txt only points at things that exist.
const discography = existsSync(join(DIST, 'data/discography.json')) ? JSON.parse(readFileSync(join(DIST, 'data/discography.json'), 'utf8')) : { albums: [] };
for (const album of discography.albums) {
  if (!existsSync(join(DIST, 'music', `${album.id}.md`))) fail(`/music/${album.id}.md`, 'missing Markdown twin');
  if (!existsSync(join(DIST, 'music', album.id, 'index.html'))) fail(`/music/${album.id}/`, 'missing album page');
}
for (const f of ['/llms.txt', '/llms-full.txt', '/index.md', '/music.md', '/lyrics.md']) {
  if (!existsSync(join(DIST, f))) continue;
  const text = readFileSync(join(DIST, f), 'utf8');
  for (const url of attr(text, /\]\((https:\/\/www\.builttospill\.com[^)\s]*)\)/g)) {
    linkCount++;
    if (!resolves(new URL(url).pathname)) fail(f, `links to a page that is not in the build: ${url}`);
  }
}

if (existsSync(join(DIST, 'sitemap-0.xml'))) {
  const locs = attr(readFileSync(join(DIST, 'sitemap-0.xml'), 'utf8'), /<loc>([^<]+)<\/loc>/g);
  for (const loc of locs) if (!resolves(new URL(loc).pathname)) fail('/sitemap-0.xml', `lists a missing page: ${loc}`);
  if (locs.length < 100) fail('/sitemap-0.xml', `only ${locs.length} URLs; expected every page`);
}

const robots = existsSync(join(DIST, 'robots.txt')) ? readFileSync(join(DIST, 'robots.txt'), 'utf8') : '';
if (/^Disallow:\s*\/\s*$/m.test(robots)) fail('/robots.txt', 'blocks the whole site');
if (!/^Sitemap: https:\/\//m.test(robots)) fail('/robots.txt', 'does not point at the sitemap');

/* ---------- weight ---------- */

const home = readFileSync(join(DIST, 'index.html'), 'utf8');
const size = (urls) => urls.filter((u) => u.startsWith('/')).reduce((n, u) => n + (existsSync(join(DIST, u)) ? statSync(join(DIST, u)).size : 0), 0);
const js = size(attr(home, /<script[^>]*\ssrc="([^"]+)"/g)) + attr(home, /<script type="module">([\s\S]*?)<\/script>/g).reduce((n, s) => n + Buffer.byteLength(s), 0);
const css = size(attr(home, /<link rel="stylesheet" href="([^"]+)"/g)) + attr(home, /<style[^>]*>([\s\S]*?)<\/style>/g).reduce((n, s) => n + Buffer.byteLength(s), 0);
if (js > BUDGET.js) fail('/', `first-load JavaScript is ${js} bytes (budget ${BUDGET.js})`);
if (css > BUDGET.css) fail('/', `CSS is ${css} bytes (budget ${BUDGET.css})`);
if (/youtube\.com|ytimg\.com|googleapis\.com|gstatic\.com/.test(home.replace(/<script type="application\/(ld\+)?json"[\s\S]*?<\/script>/g, '').replace(/data-cover="[^"]*"/g, '')))
  fail('/', 'the home page references a third-party host before any interaction');

const heavy = files.filter((f) => /\.(webp|avif|jpe?g|png)$/.test(f) && statSync(f).size > 450_000);
for (const f of heavy) warn(rel(f), `${Math.round(statSync(f).size / 1024)} kB image`);

const total = files.reduce((n, f) => n + statSync(f).size, 0);

/* ---------- report ---------- */

for (const w of warnings) console.warn(`  warn  ${w}`);
for (const e of errors) console.error(`  FAIL  ${e}`);
console.log(
  `\n${pages.length} pages · ${linkCount} internal references · ${ldCount} JSON-LD nodes · home: ${(js / 1024).toFixed(1)} kB JS, ${(css / 1024).toFixed(1)} kB CSS · dist ${(total / 1e6).toFixed(1)} MB`,
);
if (errors.length) {
  console.error(`\n${errors.length} problem${errors.length === 1 ? '' : 's'} found.`);
  process.exit(1);
}
console.log('Build verified.');
