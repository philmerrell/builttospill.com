import type { ImageMetadata } from 'astro';
import albumsJson from './albums.json';
import videosJson from './videos.json';

export interface Track {
  title: string;
  slug: string;
  youtubeId: string;
  /** m:ss */
  duration: string;
  /** Path under src/assets/lyrics of Doug's handwritten sheet, when there is one. */
  lyricsSheet?: string;
}

export interface AlbumLinks {
  vinyl?: string;
  cd?: string;
  cassette?: string;
  spotify?: string;
  appleMusic?: string;
}

export interface Album {
  id: string;
  title: string;
  /** ISO date */
  releaseDate: string;
  /** File name under src/assets/albums */
  cover: string;
  links: AlbumLinks;
  tracks: Track[];
}

export interface Video {
  youtubeId: string;
  title: string;
  from: string;
  type: 'Music Video' | 'Live' | 'Covers' | 'Other';
  featured?: boolean;
}

/** Newest first, exactly as the band ordered them. */
export const albums = albumsJson as Album[];
export const videos = videosJson as Video[];
export const latestAlbum = albums[0];

export const getAlbum = (id: string) => albums.find((a) => a.id === id);
export const albumYear = (a: Album) => a.releaseDate.slice(0, 4);

export const LINK_LABELS: Record<keyof AlbumLinks, string> = {
  vinyl: 'Vinyl',
  cd: 'CD',
  cassette: 'Cassette',
  spotify: 'Spotify',
  appleMusic: 'Apple Music',
};

/* ---------- durations ---------- */

export function durationSeconds(d: string): number {
  return d.split(':').reduce((acc, part) => acc * 60 + Number(part), 0);
}

/** "5:44" -> "PT5M44S" */
export function isoDuration(d: string): string {
  const s = durationSeconds(d);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  return `PT${h ? `${h}H` : ''}${m}M${s % 60}S`;
}

export function albumRuntime(a: Album): string {
  const total = a.tracks.reduce((acc, t) => acc + durationSeconds(t.duration), 0);
  return `${Math.round(total / 60)} min`;
}

export function albumIsoRuntime(a: Album): string {
  const total = a.tracks.reduce((acc, t) => acc + durationSeconds(t.duration), 0);
  return `PT${Math.floor(total / 60)}M${total % 60}S`;
}

/* ---------- images ---------- */

const coverModules = import.meta.glob<{ default: ImageMetadata }>('../assets/albums/*', { eager: true });
const lyricModules = import.meta.glob<{ default: ImageMetadata }>('../assets/lyrics/*/*', { eager: true });

export function coverImage(a: Album): ImageMetadata {
  const mod = coverModules[`../assets/albums/${a.cover}`];
  if (!mod) throw new Error(`Missing cover for ${a.id}: src/assets/albums/${a.cover}`);
  return mod.default;
}

export function lyricsImage(t: Track): ImageMetadata | undefined {
  if (!t.lyricsSheet) return undefined;
  const mod = lyricModules[`../assets/lyrics/${t.lyricsSheet}`];
  if (!mod) throw new Error(`Missing lyrics sheet: src/assets/lyrics/${t.lyricsSheet}`);
  return mod.default;
}

/* ---------- lyrics ---------- */

export interface LyricEntry {
  album: Album;
  track: Track;
  href: string;
}

export const lyricsHref = (a: Album, t: Track) => `/lyrics/${a.id}/${t.slug}/`;

export const lyricEntries: LyricEntry[] = albums.flatMap((album) =>
  album.tracks.filter((t) => t.lyricsSheet).map((track) => ({ album, track, href: lyricsHref(album, track) })),
);

export const albumsWithLyrics = albums.filter((a) => a.tracks.some((t) => t.lyricsSheet));

/* ---------- urls ---------- */

export const albumHref = (a: Album) => `/music/${a.id}/`;
export const youtubeUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`;
export const youtubeEmbedUrl = (id: string) => `https://www.youtube-nocookie.com/embed/${id}`;
export const youtubeThumb = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
