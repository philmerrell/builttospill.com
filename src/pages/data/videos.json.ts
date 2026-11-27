import { videos, youtubeUrl } from '../../data';
import { site } from '../../data/site';
import { abs } from '../../lib/schema';

export const GET = () =>
  Response.json({
    artist: site.name,
    source: abs('/videos/'),
    videos: videos.map((v) => ({ title: v.title, type: v.type, from: v.from, url: youtubeUrl(v.youtubeId) })),
  });
