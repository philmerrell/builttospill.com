/**
 * Build-time data from the two live sources the site depends on:
 * Bandsintown (tour dates) and Big Cartel (merch).
 *
 * Each is fetched once per build. If the network call fails the build falls back
 * to the last committed snapshot in src/data/snapshots, so a third-party outage
 * can never take the site down or block a deploy. Refresh snapshots with
 * `npm run snapshot`.
 */
import { BANDSINTOWN_EVENTS_URL, BIGCARTEL_PRODUCTS_URL, BIGCARTEL_STORE_URL } from '../data/site';
import showsSnapshot from '../data/snapshots/shows.json';
import merchSnapshot from '../data/snapshots/merch.json';
import { normalizeShows, type Show } from './shows-shared';

export interface Product {
  id: number;
  name: string;
  price: number;
  url: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  soldOut: boolean;
  onSale: boolean;
  category?: string;
}

async function fetchJson(url: string): Promise<unknown> {
  const res = await fetch(url, {
    headers: { accept: 'application/json', 'user-agent': 'builttospill.com site build' },
    signal: AbortSignal.timeout(15_000),
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}

async function liveOrSnapshot(name: string, url: string, snapshot: unknown): Promise<{ data: unknown; live: boolean }> {
  if (process.env.SITE_OFFLINE === '1') return { data: snapshot, live: false };
  try {
    return { data: await fetchJson(url), live: true };
  } catch (err) {
    console.warn(`[remote] ${name}: live fetch failed (${(err as Error).message}); using committed snapshot.`);
    return { data: snapshot, live: false };
  }
}

/* ---------- shows ---------- */

let showsPromise: Promise<Show[]> | undefined;

export function getShows(): Promise<Show[]> {
  showsPromise ??= liveOrSnapshot('shows', BANDSINTOWN_EVENTS_URL, showsSnapshot).then(({ data }) => {
    const today = new Date().toISOString().slice(0, 10);
    // A stale snapshot may hold dates that have passed; never list those.
    return normalizeShows(data).filter((s) => (s.endDate ?? s.datetime.slice(0, 10)) >= today);
  });
  return showsPromise;
}

/* ---------- merch ---------- */

/* eslint-disable @typescript-eslint/no-explicit-any */
export function normalizeProducts(list: unknown): Product[] {
  if (!Array.isArray(list)) return [];
  return list
    .filter((p: any) => p && p.name && p.url && p.status !== 'hidden')
    .sort((a: any, b: any) => (a.position ?? 0) - (b.position ?? 0))
    .map((p: any) => {
      const img = p.images?.[0];
      return {
        id: Number(p.id),
        name: String(p.name),
        price: Number(p.price ?? p.default_price ?? 0),
        url: BIGCARTEL_STORE_URL + String(p.url),
        image: img?.secure_url ?? img?.url,
        imageWidth: img?.width,
        imageHeight: img?.height,
        soldOut: p.status === 'sold-out',
        onSale: Boolean(p.on_sale),
        category: p.categories?.[0]?.name,
      } satisfies Product;
    });
}

let merchPromise: Promise<Product[]> | undefined;

export function getProducts(): Promise<Product[]> {
  merchPromise ??= liveOrSnapshot('merch', BIGCARTEL_PRODUCTS_URL, merchSnapshot).then(({ data }) =>
    normalizeProducts(data),
  );
  return merchPromise;
}

/** Big Cartel serves product images through imgix, so widths can be requested on the fly. */
export function productImage(src: string, width: number): string {
  const u = new URL(src);
  u.search = `?auto=format&fit=max&w=${width}`;
  return u.toString();
}

export const formatPrice = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: n % 1 ? 2 : 0 }).format(n);
