/**
 * Tour dates are baked into the HTML at build time (and the site is rebuilt on a
 * schedule), but a tour announcement shouldn't have to wait for either. Whenever a
 * page with a show list is on screen, quietly re-check Bandsintown and redraw the
 * list if it has changed.
 */
import { BANDSINTOWN_EVENTS_URL } from '../data/site';
import { normalizeShows, showsBlockHTML, showsSignature, type Show } from '../lib/shows-shared';

let cache: { at: number; shows: Show[] } | undefined;
const TEN_MINUTES = 10 * 60 * 1000;

async function latest(): Promise<Show[] | undefined> {
  if (cache && Date.now() - cache.at < TEN_MINUTES) return cache.shows;
  try {
    const res = await fetch(BANDSINTOWN_EVENTS_URL, { headers: { accept: 'application/json' } });
    if (!res.ok) return undefined;
    const shows = normalizeShows(await res.json());
    cache = { at: Date.now(), shows };
    return shows;
  } catch {
    return undefined; // offline or blocked: the built-in list stands
  }
}

async function refresh() {
  const targets = document.querySelectorAll<HTMLElement>('[data-shows]');
  if (!targets.length) return;
  const shows = await latest();
  if (!shows) return;

  targets.forEach((target) => {
    const visible = shows.slice(0, Number(target.dataset.limit) || shows.length);
    const signature = showsSignature(visible);
    if (target.dataset.signature === signature) return; // nothing new since the build
    target.dataset.signature = signature;
    target.innerHTML = showsBlockHTML(visible);
  });
}

document.addEventListener('astro:page-load', refresh);
