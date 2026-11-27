/**
 * Show normalisation + markup shared by the build (static HTML) and the browser
 * (which re-checks Bandsintown so a newly announced date never waits for a rebuild).
 * No Node or Astro imports in here.
 */

export interface Show {
  id: string;
  /** Local start, as given by Bandsintown: 2027-06-18T19:00:00 (venue local time, no zone). */
  datetime: string;
  /** YYYY-MM-DD when the event spans several days (festivals). */
  endDate?: string;
  title?: string;
  venue: string;
  city: string;
  region: string;
  country: string;
  /** "Greenfield, MA" / "London, United Kingdom" */
  place: string;
  streetAddress?: string;
  postalCode?: string;
  latitude?: string;
  longitude?: string;
  ticketUrl?: string;
  eventUrl?: string;
  soldOut: boolean;
  free: boolean;
  lineup: string[];
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTHS_LONG = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/* eslint-disable @typescript-eslint/no-explicit-any */
export function normalizeShow(e: any): Show | null {
  if (!e || !e.datetime || !e.venue) return null;
  const v = e.venue;
  const tickets = (e.offers ?? []).find((o: any) => o?.url && /ticket/i.test(o.type ?? 'Tickets')) ?? (e.offers ?? [])[0];
  const startDay = String(e.datetime).slice(0, 10);
  const endDay = e.festival_end_date || (e.ends_at ? String(e.ends_at).slice(0, 10) : '');
  const isUS = !v.country || v.country === 'United States';
  const place = [v.city, isUS ? v.region : v.country].filter(Boolean).join(', ');
  return {
    id: String(e.id ?? `${startDay}-${v.name}`),
    datetime: String(e.datetime),
    endDate: endDay && endDay !== startDay ? endDay : undefined,
    title: e.title && e.title !== v.name ? String(e.title) : undefined,
    venue: String(v.name ?? ''),
    city: String(v.city ?? ''),
    region: String(v.region ?? ''),
    country: String(v.country ?? ''),
    place: place || String(v.location ?? ''),
    streetAddress: v.street_address || undefined,
    postalCode: v.postal_code || undefined,
    latitude: v.latitude || undefined,
    longitude: v.longitude || undefined,
    ticketUrl: tickets?.url || undefined,
    eventUrl: e.url || undefined,
    soldOut: Boolean(e.sold_out),
    free: Boolean(e.free),
    lineup: Array.isArray(e.lineup) ? e.lineup.map(String) : [],
  };
}

export function normalizeShows(list: unknown): Show[] {
  if (!Array.isArray(list)) return [];
  return list
    .map(normalizeShow)
    .filter((s): s is Show => s !== null)
    .sort((a, b) => a.datetime.localeCompare(b.datetime));
}

/** Parse the date part without letting the runtime's timezone shift the day. */
export function dateParts(iso: string) {
  const [y, m, d] = iso.slice(0, 10).split('-').map(Number);
  const weekday = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  return { y, m, d, mon: MONTHS[m - 1], month: MONTHS_LONG[m - 1], dow: DAYS[weekday] };
}

/** "Fri, June 18, 2027" or "June 18–20, 2027" */
export function showDateLabel(s: Show): string {
  const a = dateParts(s.datetime);
  if (!s.endDate) return `${a.dow}, ${a.month} ${a.d}, ${a.y}`;
  const b = dateParts(s.endDate);
  return a.m === b.m && a.y === b.y
    ? `${a.month} ${a.d}–${b.d}, ${a.y}`
    : `${a.month} ${a.d} – ${b.month} ${b.d}, ${b.y}`;
}

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const safeUrl = (u?: string) => (u && /^https:\/\//.test(u) ? esc(u) : '');

/** One row of the tour list. Returned as a string so the server and the browser render identically. */
export function showRowHTML(s: Show): string {
  const a = dateParts(s.datetime);
  const end = s.endDate ? dateParts(s.endDate) : null;
  const day = end ? `${a.d}<span class="show__dash">–</span>${end.d}` : String(a.d);
  const others = s.lineup.filter((n) => n.toLowerCase() !== 'built to spill');
  const tickets = safeUrl(s.ticketUrl);
  const cta = s.soldOut
    ? `<span class="btn btn--ghost show__cta" aria-disabled="true">Sold out</span>`
    : tickets
      ? `<a class="btn btn--ticket show__cta" href="${tickets}" target="_blank" rel="noopener">${s.free ? 'Free · RSVP' : 'Tickets'}<span class="visually-hidden"> for ${esc(s.venue)}, ${esc(showDateLabel(s))}</span></a>`
      : '';
  return `<li class="show">
  <time class="show__date" datetime="${esc(s.datetime.slice(0, 10))}" title="${esc(showDateLabel(s))}">
    <span class="show__mon">${a.mon}</span>
    <span class="show__day">${day}</span>
    <span class="show__yr">${a.dow} · ${a.y}</span>
  </time>
  <div class="show__where">
    <p class="show__city">${esc(s.place)}</p>
    <p class="show__venue">${esc(s.venue)}${others.length ? ` <span class="show__with">with ${esc(others.join(', '))}</span>` : ''}</p>
  </div>
  ${cta}
</li>`;
}

export function showListHTML(shows: Show[]): string {
  return shows.map(showRowHTML).join('\n');
}

/** Cheap fingerprint of a rendered list, so the browser can tell whether the live data differs. */
export function showsSignature(shows: Show[]): string {
  return shows.map((s) => `${s.id}:${s.datetime}:${s.soldOut ? 1 : 0}:${s.ticketUrl ? 1 : 0}`).join('|');
}

export const NO_SHOWS_HTML = `<p class="shows-empty">No shows are currently scheduled. Check back soon.</p>`;

export function showsBlockHTML(shows: Show[]): string {
  return shows.length ? `<ol class="shows">${showListHTML(shows)}</ol>` : NO_SHOWS_HTML;
}
