/**
 * Plain-Markdown renderings of the site for AI agents and other non-browser readers.
 *
 * Every page has a Markdown twin at the same path with `.md` (`/music/keep-it-like-a-secret.md`),
 * `/llms.txt` indexes them, and `/llms-full.txt` is the whole site in one file.
 */
import {
  albumHref,
  albumRuntime,
  albums,
  albumYear,
  albumsWithLyrics,
  LINK_LABELS,
  lyricsHref,
  videos,
  youtubeUrl,
  type Album,
  type AlbumLinks,
} from '../data';
import { site, socials, stores } from '../data/site';
import { formatPrice, type Product } from './remote';
import { abs } from './schema';
import { showDateLabel, type Show } from './shows-shared';

export const mdResponse = (body: string) =>
  new Response(body.trim() + '\n', { headers: { 'content-type': 'text/markdown; charset=utf-8' } });

export const textResponse = (body: string) =>
  new Response(body.trim() + '\n', { headers: { 'content-type': 'text/plain; charset=utf-8' } });

const longDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });

const mdPath = (path: string) => abs(path === '/' ? '/index.md' : path.replace(/\/$/, '.md'));

export function linksLine(links: AlbumLinks): string {
  const parts = (Object.keys(LINK_LABELS) as (keyof AlbumLinks)[])
    .filter((k) => links[k])
    .map((k) => `[${LINK_LABELS[k]}](${links[k]})`);
  return parts.join(' · ');
}

/* ---------- sections ---------- */

export function albumMarkdown(a: Album, level = 1): string {
  const h = '#'.repeat(level);
  const lines = [
    `${h} ${a.title}`,
    '',
    `- Artist: ${site.name}`,
    `- Released: ${longDate(a.releaseDate)}`,
    `- Tracks: ${a.tracks.length} (${albumRuntime(a)})`,
    `- Page: ${abs(albumHref(a))}`,
  ];
  const links = linksLine(a.links);
  if (links) lines.push(`- Buy / stream: ${links}`);
  lines.push('', `${h}# Tracklist`, '');
  a.tracks.forEach((t, i) => {
    const lyric = t.lyricsSheet ? ` · [handwritten lyrics](${abs(lyricsHref(a, t))})` : '';
    lines.push(`${i + 1}. ${t.title} (${t.duration}) · [listen](${youtubeUrl(t.youtubeId)})${lyric}`);
  });
  return lines.join('\n');
}

export function discographyMarkdown(level = 1): string {
  const h = '#'.repeat(level);
  const lines = [`${h} ${site.name} discography`, '', `${albums.length} releases, newest first.`, ''];
  for (const a of albums) {
    lines.push(`- [${a.title}](${mdPath(albumHref(a))}) (${albumYear(a)}) · ${a.tracks.length} tracks, ${albumRuntime(a)}`);
  }
  return lines.join('\n');
}

export function showsMarkdown(shows: Show[], level = 1): string {
  const h = '#'.repeat(level);
  const lines = [`${h} ${site.name} tour dates`, ''];
  if (!shows.length) {
    lines.push('No shows are currently scheduled. Check back soon.');
  } else {
    lines.push(`${shows.length} upcoming ${shows.length === 1 ? 'show' : 'shows'}. Times are local to the venue.`, '');
    for (const s of shows) {
      const status = s.soldOut ? 'sold out' : s.ticketUrl ? `[tickets](${s.ticketUrl})` : 'no ticket link yet';
      lines.push(`- **${showDateLabel(s)}** · ${s.venue}, ${s.place} · ${status}`);
    }
  }
  lines.push('', `Live source: Bandsintown. Always-current page: ${abs('/shows/')} · JSON: ${abs('/data/shows.json')}`);
  return lines.join('\n');
}

export function videosMarkdown(level = 1): string {
  const h = '#'.repeat(level);
  const lines = [`${h} ${site.name} videos`, ''];
  const types = [...new Set(videos.map((v) => v.type))];
  for (const type of types) {
    lines.push(`${h}# ${type === 'Other' ? 'Other' : type === 'Covers' ? 'Covers' : `${type}s`.replace('Lives', 'Live')}`, '');
    for (const v of videos.filter((x) => x.type === type)) {
      lines.push(`- [${v.title}](${youtubeUrl(v.youtubeId)}) · ${v.from}`);
    }
    lines.push('');
  }
  return lines.join('\n').trim();
}

export function lyricsMarkdown(level = 1): string {
  const h = '#'.repeat(level);
  const lines = [
    `${h} ${site.name} lyrics`,
    '',
    'Lyrics are published as scans of Doug Martsch’s handwritten lyric sheets, one page per song. The pages below hold the images; they are not transcribed.',
    '',
  ];
  for (const a of albumsWithLyrics) {
    lines.push(`${h}# ${a.title} (${albumYear(a)})`, '');
    for (const t of a.tracks.filter((x) => x.lyricsSheet)) {
      lines.push(`- [${t.title}](${abs(lyricsHref(a, t))})`);
    }
    lines.push('');
  }
  return lines.join('\n').trim();
}

export function merchMarkdown(products: Product[], level = 2): string {
  const h = '#'.repeat(level);
  const lines = [`${h} Merch`, ''];
  for (const s of stores) lines.push(`- [${s.label}](${s.href}) (${s.note})`);
  if (products.length) {
    lines.push('', `Currently in the US store:`, '');
    for (const p of products) {
      lines.push(`- [${p.name}](${p.url}) · ${formatPrice(p.price)}${p.soldOut ? ' · sold out' : ''}`);
    }
  }
  return lines.join('\n');
}

export function linksMarkdown(level = 2): string {
  const h = '#'.repeat(level);
  return [`${h} Elsewhere`, '', ...socials.map((s) => `- [${s.label}](${s.href})`)].join('\n');
}

/* ---------- documents ---------- */

export function homeMarkdown(shows: Show[], products: Product[]): string {
  const next = shows.slice(0, 4);
  return [
    `# ${site.name}`,
    '',
    `> ${site.about}`,
    '',
    `Official site: ${abs('/')}`,
    '',
    '## Latest release',
    '',
    albumMarkdown(albums[0], 3),
    '',
    '## Next shows',
    '',
    next.length
      ? next.map((s) => `- **${showDateLabel(s)}** · ${s.venue}, ${s.place}${s.ticketUrl ? ` · [tickets](${s.ticketUrl})` : ''}`).join('\n')
      : 'No shows are currently scheduled. Check back soon.',
    '',
    `All dates: ${mdPath('/shows/')}`,
    '',
    '## More',
    '',
    `- [Discography](${mdPath('/music/')})`,
    `- [Videos](${mdPath('/videos/')})`,
    `- [Lyrics](${mdPath('/lyrics/')})`,
    '',
    merchMarkdown(products.slice(0, 8)),
    '',
    linksMarkdown(),
  ].join('\n');
}

export function llmsTxt(): string {
  return [
    `# ${site.name}`,
    '',
    `> ${site.about} This is the band’s official website: tour dates and tickets, the full discography with playable tracklists, music videos, handwritten lyric sheets, and merch.`,
    '',
    'Every page on this site has a Markdown version at the same URL ending in `.md`, and the whole site is available as one file at `/llms-full.txt`. Tour dates change often: prefer `/shows.md` or `/data/shows.json`, which are rebuilt from Bandsintown at least daily, over anything remembered.',
    '',
    '## Pages',
    '',
    `- [Home](${mdPath('/')}): latest release, next shows, featured videos and merch`,
    `- [Shows](${mdPath('/shows/')}): every upcoming tour date with venue, city and ticket link`,
    `- [Music](${mdPath('/music/')}): discography, ${albums.length} releases from ${albumYear(albums[albums.length - 1])} to ${albumYear(albums[0])}`,
    `- [Videos](${mdPath('/videos/')}): music videos, live sessions and covers`,
    `- [Lyrics](${mdPath('/lyrics/')}): index of Doug Martsch’s handwritten lyric sheets`,
    '',
    '## Discography',
    '',
    ...albums.map((a) => `- [${a.title}](${mdPath(albumHref(a))}): ${albumYear(a)}, ${a.tracks.length} tracks, ${albumRuntime(a)}`),
    '',
    '## Data',
    '',
    `- [Shows JSON](${abs('/data/shows.json')}): upcoming shows as structured data`,
    `- [Discography JSON](${abs('/data/discography.json')}): every release with tracks, durations and links`,
    `- [Videos JSON](${abs('/data/videos.json')}): every video with its YouTube URL`,
    `- [Sitemap](${abs('/sitemap-index.xml')})`,
    '',
    '## Optional',
    '',
    `- [Everything in one file](${abs('/llms-full.txt')})`,
    ...stores.map((s) => `- [${s.label}](${s.href}): ${s.note}`),
    ...socials.map((s) => `- [${s.label}](${s.href})`),
  ].join('\n');
}

export function llmsFullTxt(shows: Show[], products: Product[]): string {
  return [
    `# ${site.name}`,
    '',
    `> ${site.about}`,
    '',
    `Official site: ${abs('/')}`,
    `Generated: ${new Date().toISOString().slice(0, 10)}`,
    '',
    showsMarkdown(shows, 2),
    '',
    '## Discography',
    '',
    ...albums.map((a) => albumMarkdown(a, 3) + '\n'),
    videosMarkdown(2),
    '',
    lyricsMarkdown(2),
    '',
    merchMarkdown(products),
    '',
    linksMarkdown(),
  ].join('\n');
}
