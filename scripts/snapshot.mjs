#!/usr/bin/env node
/**
 * Refresh the committed fallbacks in src/data/snapshots.
 *
 * Builds always try the live Bandsintown and Big Cartel APIs first; these files
 * are only used when one of them is unreachable. Run `npm run snapshot` now and
 * then (the scheduled workflow does not commit them) so the fallback stays sane.
 */
import { writeFile } from 'node:fs/promises';

const SHOWS = 'https://rest.bandsintown.com/artists/built%20to%20spill/events?app_id=js_www.builttospill.com';
const MERCH = 'https://api.bigcartel.com/builttospill/products.json';
const out = new URL('../src/data/snapshots/', import.meta.url);

const get = async (url) => {
  const res = await fetch(url, { headers: { accept: 'application/json' }, signal: AbortSignal.timeout(20_000) });
  if (!res.ok) throw new Error(`${url} -> ${res.status}`);
  return res.json();
};

const shows = (await get(SHOWS)).map(({ artist, ...event }) => event);
await writeFile(new URL('shows.json', out), JSON.stringify(shows, null, 2) + '\n');

// Keep only what the site renders; the full payload carries per-country shipping tables.
const merch = (await get(MERCH)).map((p) => ({
  id: p.id,
  name: p.name,
  position: p.position,
  price: p.price,
  default_price: p.default_price,
  on_sale: p.on_sale,
  url: p.url,
  status: p.status,
  images: (p.images ?? []).slice(0, 1).map(({ secure_url, width, height }) => ({ secure_url, width, height })),
  categories: (p.categories ?? []).slice(0, 1).map(({ name }) => ({ name })),
}));
await writeFile(new URL('merch.json', out), JSON.stringify(merch, null, 2) + '\n');

console.log(`snapshot: ${shows.length} shows, ${merch.length} products`);
