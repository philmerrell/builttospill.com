import { albumHref, albumRuntime, albums, isoDuration, lyricsHref, youtubeUrl } from '../../data';
import { site } from '../../data/site';
import { abs } from '../../lib/schema';

export const GET = () =>
  Response.json({
    artist: site.name,
    source: abs('/music/'),
    albums: albums.map((a) => ({
      id: a.id,
      title: a.title,
      releaseDate: a.releaseDate,
      url: abs(albumHref(a)),
      markdown: abs(`/music/${a.id}.md`),
      runtime: albumRuntime(a),
      links: a.links,
      tracks: a.tracks.map((t, i) => ({
        position: i + 1,
        title: t.title,
        duration: t.duration,
        durationIso: isoDuration(t.duration),
        listen: youtubeUrl(t.youtubeId),
        ...(t.lyricsSheet ? { handwrittenLyrics: abs(lyricsHref(a, t)) } : {}),
      })),
    })),
  });
