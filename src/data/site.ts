/** Site-wide facts and links. Everything the pages and the machine-readable feeds share. */
export const site = {
  name: 'Built to Spill',
  url: 'https://www.builttospill.com',
  description:
    'The official Built to Spill site: tour dates and tickets, every album with full tracklists you can play, music videos, Doug Martsch’s handwritten lyrics, and merch.',
  /** Kept deliberately short and factual. */
  about:
    'Built to Spill is an indie rock band from Boise, Idaho, formed in 1992 by singer and guitarist Doug Martsch.',
  origin: { city: 'Boise', region: 'Idaho', country: 'US' },
  founded: '1992',
  founder: 'Doug Martsch',
  genre: ['Indie rock'],
  /** MusicBrainz artist id. */
  mbid: '3ac482b8-1494-4071-a0e9-f192f9d2c2b0',
} as const;

/**
 * The design the site is built with. Every look in src/styles/themes is kept;
 * this picks which one visitors get. It is written onto <html> at build time.
 *
 *   look        'sleeve' | 'storm' | 'photocopy' | 'cutpaper'
 *   background  for Cut paper: 'shelf' | 'clouds' | 'collage' | 'guitars' | 'gear' | 'halftone'
 *
 * Changing `look` also means changing which theme stylesheet and fonts
 * src/layouts/Base.astro imports (only the live look is shipped by default).
 * To try the others, use the picker on the dev server.
 */
export type Look = 'sleeve' | 'storm' | 'photocopy' | 'cutpaper';
export type Background = 'shelf' | 'clouds' | 'collage' | 'guitars' | 'gear' | 'halftone';

export const theme: { look: Look; background: Background; color: string } = {
  look: 'cutpaper',
  background: 'shelf',
  /** Browser chrome / manifest colour for this look. */
  color: '#a6d6d8',
};

export const nav = [
  { href: '/shows/', label: 'Shows' },
  { href: '/music/', label: 'Music' },
  { href: '/videos/', label: 'Videos' },
  { href: '/lyrics/', label: 'Lyrics' },
] as const;

export const stores = [
  { href: 'https://builttospill.bigcartel.com', label: 'Merch', note: 'US store' },
  { href: 'https://shop.bingomerch.com/collections/built-to-spill', label: 'Euro Merch', note: 'EU / UK store' },
] as const;

export const socials = [
  { href: 'https://www.instagram.com/builttospill/', label: 'Instagram' },
  { href: 'https://twitter.com/built_2_spill', label: 'Twitter' },
  { href: 'https://www.facebook.com/builttospill/', label: 'Facebook' },
] as const;

/** Profiles that identify the band elsewhere; used for schema.org `sameAs`. */
export const sameAs = [
  ...socials.map((s) => s.href),
  'https://www.youtube.com/channel/UCHx9idqEfLZjA2jxaXojccg',
  'https://open.spotify.com/artist/3kbBWco9PZ5eSQsNScwG6U',
  'https://music.apple.com/artist/161731',
  'https://built-to-spill.bandcamp.com',
  'https://www.subpop.com/artists/built_to_spill',
  'https://www.bandsintown.com/a/1287',
  `https://musicbrainz.org/artist/${site.mbid}`,
  'https://en.wikipedia.org/wiki/Built_to_Spill',
] as const;

export const BANDSINTOWN_EVENTS_URL =
  'https://rest.bandsintown.com/artists/built%20to%20spill/events?app_id=js_www.builttospill.com';
export const BIGCARTEL_PRODUCTS_URL = 'https://api.bigcartel.com/builttospill/products.json';
export const BIGCARTEL_STORE_URL = 'https://builttospill.bigcartel.com';
