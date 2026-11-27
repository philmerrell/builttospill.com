/**
 * Every record gets its own page colours, pulled from its cover at build time.
 *
 * We look at the artwork in OKLCH, find the hue that dominates it and the hue
 * that is most vivid, then rebuild both at fixed lightness so text contrast is
 * guaranteed no matter what the painting looks like:
 *
 *   --paper   very light tint of the dominant hue (page background)
 *   --ink     near-black shade of the same hue (text)
 *   --accent  the cover's most vivid hue, mid-lightness (bands, buttons)
 */
import sharp from 'sharp';
import path from 'node:path';
import { albums, type Album } from '../data';

// Read the originals from the project, not from wherever the bundler put this module.
const ASSETS = path.join(process.cwd(), 'src', 'assets');

export interface AlbumTheme {
  paper: string;
  paper2: string;
  ink: string;
  slate: string;
  accent: string;
  accentInk: string;
  /** The accent, darkened until it passes as body-size text on `paper`. */
  accentText: string;
}

/**
 * Hand-set palettes, for sleeves where the maths picks something the eye wouldn't.
 * "There's Nothing Wrong With Love" is where the whole site's look comes from, so
 * its page is simply the sleeve: that yellow, that slate.
 */
const FIXED: Record<string, AlbumTheme> = {
  'theres-nothing-wrong-with-love': {
    paper: '#f6face',
    paper2: '#ebf0b4',
    ink: '#2a2c38',
    slate: '#60606c',
    accent: '#60606c',
    accentInk: '#f6face',
    accentText: '#cf1a5c',
  },
};

const srgbToLinear = (c: number) => {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
};

function rgbToOklch(r: number, g: number, b: number): [number, number, number] {
  const lr = srgbToLinear(r);
  const lg = srgbToLinear(g);
  const lb = srgbToLinear(b);
  const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
  const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
  const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  const C = Math.hypot(A, B);
  let H = (Math.atan2(B, A) * 180) / Math.PI;
  if (H < 0) H += 360;
  return [L, C, H];
}

const BUCKETS = 24; // 15° of hue each

async function analyse(file: string) {
  const { data, info } = await sharp(file).resize(48, 48, { fit: 'cover' }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const weight = new Float64Array(BUCKETS); // how much of the picture
  const vivid = new Float64Array(BUCKETS); // how loud it is
  const sin = new Float64Array(BUCKETS);
  const cos = new Float64Array(BUCKETS);
  const chroma = new Float64Array(BUCKETS);
  let totalChroma = 0;
  const px = data.length / info.channels;
  for (let i = 0; i < data.length; i += info.channels) {
    const [L, C, H] = rgbToOklch(data[i], data[i + 1], data[i + 2]);
    totalChroma += C;
    if (C < 0.025) continue; // greys carry no hue
    const b = Math.floor(H / (360 / BUCKETS)) % BUCKETS;
    const rad = (H * Math.PI) / 180;
    weight[b] += C;
    // favour colours that are both saturated and neither blown out nor crushed
    const mid = 1 - Math.min(1, Math.abs(L - 0.62) / 0.5);
    vivid[b] += C * C * mid;
    sin[b] += Math.sin(rad) * C;
    cos[b] += Math.cos(rad) * C;
    chroma[b] += C * C;
  }
  const pick = (arr: Float64Array, avoid = -1) => {
    let best = -1;
    for (let i = 0; i < BUCKETS; i++) {
      if (avoid >= 0) {
        const d = Math.min(Math.abs(i - avoid), BUCKETS - Math.abs(i - avoid));
        if (d < 3) continue; // at least 45° away from the dominant hue
      }
      if (best < 0 || arr[i] > arr[best]) best = i;
    }
    return best;
  };
  const hueOf = (b: number) => {
    let h = (Math.atan2(sin[b], cos[b]) * 180) / Math.PI;
    if (h < 0) h += 360;
    return h;
  };
  const dom = pick(weight);
  const loudAny = pick(vivid);
  const loudOther = pick(vivid, dom);
  // Prefer a contrasting accent when the cover genuinely has a second colour.
  const loud = vivid[loudOther] > vivid[loudAny] * 0.35 ? loudOther : loudAny;
  return {
    hue: hueOf(dom),
    accentHue: hueOf(loud),
    // typical chroma of the dominant / accent colour
    chroma: weight[dom] ? chroma[dom] / weight[dom] : 0,
    accentChroma: weight[loud] ? chroma[loud] / weight[loud] : 0,
    colourfulness: totalChroma / px,
  };
}

const f = (n: number, d = 3) => Number(n.toFixed(d));
const oklch = (l: number, c: number, h: number) => `oklch(${f(l)} ${f(c)} ${f(h, 1)})`;

const cache = new Map<string, Promise<AlbumTheme>>();

export function albumTheme(album: Album): Promise<AlbumTheme> {
  let p = cache.get(album.id);
  if (!p) {
    p = (async () => {
      const file = path.join(ASSETS, 'albums', album.cover);
      if (FIXED[album.id]) return FIXED[album.id];
      const a = await analyse(file);
      // Nearly monochrome sleeves stay nearly neutral instead of inventing a colour.
      const mono = a.colourfulness < 0.02;
      const paperC = mono ? 0.012 : Math.min(0.062, 0.03 + a.chroma * 0.28);
      const accentC = mono ? 0.03 : Math.min(0.21, Math.max(0.13, a.accentChroma * 1.05));
      // Yellow only reads as yellow when it is light; darkened it turns to mud.
      // So a yellow accent stays bright and carries dark type instead of light.
      const yellow = !mono && a.accentHue > 78 && a.accentHue < 118;
      return {
        paper: oklch(0.945, paperC, a.hue),
        paper2: oklch(0.905, paperC * 1.25, a.hue),
        ink: oklch(0.25, 0.04, a.hue),
        slate: oklch(0.44, 0.045, a.hue),
        accent: yellow ? oklch(0.87, Math.max(0.15, accentC), a.accentHue) : oklch(mono ? 0.4 : 0.58, accentC, a.accentHue),
        accentInk: yellow ? oklch(0.22, 0.04, a.accentHue) : oklch(0.985, 0.02, a.accentHue),
        accentText: yellow ? oklch(0.44, 0.09, a.accentHue) : oklch(mono ? 0.36 : 0.47, accentC, a.accentHue),
      };
    })();
    cache.set(album.id, p);
  }
  return p;
}

export function themeStyle(t: AlbumTheme): string {
  return `--paper:${t.paper};--paper-2:${t.paper2};--ink:${t.ink};--slate:${t.slate};--accent:${t.accent};--accent-ink:${t.accentInk};--accent-text:${t.accentText}`;
}

export const allAlbumThemes = () => Promise.all(albums.map(async (a) => [a.id, await albumTheme(a)] as const));

/** Is this lyric sheet a photo of a dark sleeve (white ink) rather than ink on white paper? */
const darkCache = new Map<string, Promise<boolean>>();
export function isDarkSheet(sheet: string): Promise<boolean> {
  let p = darkCache.get(sheet);
  if (!p) {
    p = (async () => {
      const file = path.join(ASSETS, 'lyrics', sheet);
      const { channels } = await sharp(file).resize(64, 64, { fit: 'fill' }).removeAlpha().stats();
      const mean = (channels[0].mean + channels[1].mean + channels[2].mean) / 3;
      return mean < 128;
    })();
    darkCache.set(sheet, p);
  }
  return p;
}
