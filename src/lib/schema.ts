/**
 * schema.org JSON-LD builders. Every page ships a small @graph so search engines
 * and AI agents get the band, records, tracks, shows and videos as structured
 * facts instead of having to infer them from markup.
 */
import { albumHref, albumIsoRuntime, isoDuration, youtubeEmbedUrl, youtubeThumb, youtubeUrl, type Album, type Video } from '../data';
import { sameAs, site } from '../data/site';
import type { Show } from './shows-shared';

type Node = Record<string, unknown>;

export const abs = (path: string) => new URL(path, site.url).href;

export const BAND_ID = `${site.url}/#band`;
export const SITE_ID = `${site.url}/#website`;

const bandRef = { '@id': BAND_ID };

export function bandNode(): Node {
  return {
    '@type': 'MusicGroup',
    '@id': BAND_ID,
    name: site.name,
    url: abs('/'),
    description: site.about,
    genre: site.genre,
    foundingDate: site.founded,
    foundingLocation: {
      '@type': 'Place',
      name: `${site.origin.city}, ${site.origin.region}`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: site.origin.city,
        addressRegion: site.origin.region,
        addressCountry: site.origin.country,
      },
    },
    founder: { '@type': 'Person', name: site.founder },
    image: abs('/og.jpg'),
    logo: abs('/icon-512.png'),
    sameAs: [...sameAs],
  };
}

export function websiteNode(): Node {
  return {
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: abs('/'),
    name: site.name,
    description: site.description,
    inLanguage: 'en',
    publisher: bandRef,
    about: bandRef,
  };
}

export function pageNode(opts: { path: string; title: string; description: string; type?: string; about?: Node }): Node {
  return {
    '@type': opts.type ?? 'WebPage',
    '@id': `${abs(opts.path)}#page`,
    url: abs(opts.path),
    name: opts.title,
    description: opts.description,
    inLanguage: 'en',
    isPartOf: { '@id': SITE_ID },
    about: opts.about ?? bandRef,
  };
}

export function breadcrumbNode(trail: { name: string; path: string }[]): Node {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: abs(t.path),
    })),
  };
}

export const albumNodeId = (a: Album) => `${abs(albumHref(a))}#album`;

export function albumNode(a: Album, coverUrl: string, opts: { withTracks?: boolean } = {}): Node {
  const node: Node = {
    '@type': 'MusicAlbum',
    '@id': albumNodeId(a),
    name: a.title,
    url: abs(albumHref(a)),
    image: abs(coverUrl),
    datePublished: a.releaseDate,
    byArtist: bandRef,
    numTracks: a.tracks.length,
    duration: albumIsoRuntime(a),
  };
  if (opts.withTracks) {
    node.track = {
      '@type': 'ItemList',
      numberOfItems: a.tracks.length,
      itemListElement: a.tracks.map((t, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'MusicRecording',
          '@id': `${abs(albumHref(a))}#${t.slug}`,
          name: t.title,
          duration: isoDuration(t.duration),
          url: youtubeUrl(t.youtubeId),
          byArtist: bandRef,
          inAlbum: { '@id': albumNodeId(a) },
        },
      })),
    };
    const listen = [a.links.spotify, a.links.appleMusic].filter(Boolean);
    if (listen.length) node.sameAs = listen;
    const buy = (['vinyl', 'cd', 'cassette'] as const).filter((k) => a.links[k]);
    if (buy.length) {
      node.offers = buy.map((k) => ({
        '@type': 'Offer',
        url: a.links[k],
        category: k === 'cd' ? 'CD' : k[0].toUpperCase() + k.slice(1),
      }));
    }
  }
  return node;
}

export function showNode(s: Show): Node {
  const address: Node = {
    '@type': 'PostalAddress',
    addressLocality: s.city,
    addressCountry: s.country,
  };
  if (s.region) address.addressRegion = s.region;
  if (s.streetAddress) address.streetAddress = s.streetAddress;
  if (s.postalCode) address.postalCode = s.postalCode;

  const place: Node = { '@type': 'Place', name: s.venue, address };
  if (s.latitude && s.longitude) {
    place.geo = { '@type': 'GeoCoordinates', latitude: Number(s.latitude), longitude: Number(s.longitude) };
  }

  const node: Node = {
    '@type': 'MusicEvent',
    '@id': `${abs('/shows/')}#show-${s.id}`,
    name: s.title ? `${site.name} at ${s.title}` : `${site.name} at ${s.venue}`,
    startDate: s.datetime,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: place,
    performer: [
      { '@type': 'MusicGroup', '@id': BAND_ID, name: site.name },
      ...s.lineup.filter((n) => n.toLowerCase() !== site.name.toLowerCase()).map((name) => ({ '@type': 'MusicGroup', name })),
    ],
    image: abs('/og.jpg'),
    url: s.eventUrl ?? abs('/shows/'),
  };
  if (s.endDate) node.endDate = s.endDate;
  if (s.ticketUrl) {
    node.offers = {
      '@type': 'Offer',
      url: s.ticketUrl,
      availability: s.soldOut ? 'https://schema.org/SoldOut' : 'https://schema.org/InStock',
      ...(s.free ? { price: 0, priceCurrency: 'USD' } : {}),
    };
  }
  return node;
}

export function videoNode(v: Video): Node {
  return {
    '@type': 'VideoObject',
    '@id': `${abs('/videos/')}#${v.youtubeId}`,
    name: `${site.name} – ${v.title}`,
    description: `${v.type}: “${v.title}” (${v.from}) by ${site.name}.`,
    thumbnailUrl: youtubeThumb(v.youtubeId),
    embedUrl: youtubeEmbedUrl(v.youtubeId),
    url: youtubeUrl(v.youtubeId),
    genre: v.type,
    creator: bandRef,
  };
}

export function graph(...nodes: (Node | Node[] | undefined | false)[]): string {
  const flat = nodes.flat().filter(Boolean);
  // Escape "<" so a title can never close the script element.
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': flat }).replace(/</g, '\\u003c');
}
