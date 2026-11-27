import { getImage } from 'astro:assets';
import { albums, coverImage, type Album } from '../data';

/** Small square cover used by the player bar. */
const thumbCache = new Map<string, Promise<string>>();
export function coverThumb(album: Album): Promise<string> {
  let p = thumbCache.get(album.id);
  if (!p) {
    p = getImage({ src: coverImage(album), width: 192, height: 192, fit: 'cover', format: 'webp', quality: 72 }).then((i) => i.src);
    thumbCache.set(album.id, p);
  }
  return p;
}

/** 1200px JPEG of a cover: link previews and schema.org `image`. */
const largeCache = new Map<string, Promise<string>>();
export function coverLarge(album: Album): Promise<string> {
  let p = largeCache.get(album.id);
  if (!p) {
    p = getImage({ src: coverImage(album), width: 1200, height: 1200, fit: 'cover', format: 'jpg', quality: 82 }).then((i) => i.src);
    largeCache.set(album.id, p);
  }
  return p;
}

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');

/** Videos name the record they come from loosely ("There Is No Enemy" / "There is No Enemy"). */
export function albumByLooseTitle(title: string): Album | undefined {
  return albums.find((a) => norm(a.title) === norm(title));
}

/**
 * Best still YouTube has for a video. `maxresdefault` only exists for HD uploads,
 * so probe for it and step down. Returns undefined when the network is unavailable,
 * in which case the caller hot-links the always-present hqdefault instead.
 */
const stillCache = new Map<string, Promise<string | undefined>>();
export function videoStill(id: string): Promise<string | undefined> {
  let p = stillCache.get(id);
  if (!p) {
    p = (async () => {
      if (process.env.SITE_OFFLINE === '1') return undefined;
      for (const name of ['maxresdefault', 'sddefault', 'hqdefault']) {
        const url = `https://i.ytimg.com/vi/${id}/${name}.jpg`;
        try {
          const res = await fetch(url, { method: 'HEAD', signal: AbortSignal.timeout(10_000) });
          if (res.ok) return url;
        } catch {
          return undefined;
        }
      }
      return undefined;
    })();
    stillCache.set(id, p);
  }
  return p;
}
