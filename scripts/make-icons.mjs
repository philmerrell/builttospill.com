#!/usr/bin/env node
/**
 * Regenerates the raster icons and the default link-preview image in /public
 * from the favicon SVG and the band's logo. Only needs re-running if either changes.
 */
import sharp from 'sharp';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const svg = await readFile(new URL('public/favicon.svg', root));
const out = (name) => new URL(`public/${name}`, root).pathname;

for (const [name, size] of [['favicon.png', 48], ['apple-touch-icon.png', 180], ['icon-192.png', 192], ['icon-512.png', 512]]) {
  await sharp(svg, { density: 600 }).resize(size, size).png().toFile(out(name));
}

// 1200x630 link-preview card, in the Cut paper look: the band's logo pasted as a
// label onto the blue, with the record-shelf print behind it.
const W = 1200;
const H = 630;
const paper = { r: 166, g: 214, b: 216, alpha: 1 };
const clear = { r: 0, g: 0, b: 0, alpha: 0 };

const shelf = await sharp(new URL('src/assets/art/record-shelf-print-1600.webp', root).pathname)
  .resize(W, H, { fit: 'cover', position: 'centre' })
  .ensureAlpha(0.5)
  .toBuffer();

const label = await sharp(new URL('src/assets/art/logo-yellow.png', root).pathname)
  .resize({ height: 430 })
  .flatten({ background: '#f5f9cc' })
  .extend({ top: 14, bottom: 14, left: 14, right: 14, background: '#fbf8ef' })
  .toBuffer();
const { width: lw, height: lh } = await sharp(label).metadata();
const shadow = await sharp({ create: { width: lw, height: lh, channels: 4, background: { r: 27, g: 25, b: 23, alpha: 0.3 } } })
  .png()
  .toBuffer();
const tilt = (buf) => sharp(buf).rotate(-2.5, { background: clear }).png().toBuffer();
const [labelTilted, shadowTilted] = await Promise.all([tilt(label), tilt(shadow)]);
const { width: tw, height: th } = await sharp(labelTilted).metadata();
const left = Math.round((W - tw) / 2);
const top = Math.round((H - th) / 2);

await sharp({ create: { width: W, height: H, channels: 4, background: paper } })
  .composite([
    { input: shelf, blend: 'multiply' },
    { input: shadowTilted, left: left + 16, top: top + 18 },
    { input: labelTilted, left, top },
  ])
  .flatten({ background: paper })
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile(out('og.jpg'));

console.log('icons + og.jpg written to public/');
