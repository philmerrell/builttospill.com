import { site } from '../../data/site';
import { getShows } from '../../lib/remote';
import { abs } from '../../lib/schema';
import { showDateLabel } from '../../lib/shows-shared';

export const GET = async () => {
  const shows = await getShows();
  return Response.json({
    artist: site.name,
    source: abs('/shows/'),
    generated: new Date().toISOString(),
    note: 'Start times are local to the venue. Rebuilt from Bandsintown at least daily.',
    count: shows.length,
    shows: shows.map((s) => ({
      id: s.id,
      date: s.datetime.slice(0, 10),
      endDate: s.endDate,
      startsAtLocal: s.datetime,
      label: showDateLabel(s),
      venue: s.venue,
      city: s.city,
      region: s.region || undefined,
      country: s.country,
      soldOut: s.soldOut,
      tickets: s.ticketUrl,
      lineup: s.lineup,
    })),
  });
};
