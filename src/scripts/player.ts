/**
 * The persistent player.
 *
 * Any element with `data-play` + `data-yt` is a play button. Its siblings inside the
 * nearest `[data-playlist]` become the queue, so an album plays through in order.
 * The YouTube IFrame API is only fetched on the first press of play; until then the
 * page makes no third-party requests at all.
 *
 * The player element lives outside the swapped region (see router.ts), so it is
 * created exactly once per visit and playback survives every page navigation.
 */

interface Item {
  id: string;
  title: string;
  album: string;
  href?: string;
  cover?: string;
}

type Status = 'idle' | 'loading' | 'playing' | 'paused';
type View = 'mini' | 'pip' | 'theatre';

interface YTPlayer {
  playVideo(): void;
  pauseVideo(): void;
  loadVideoById(id: string): void;
  cueVideoById(id: string): void;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  getCurrentTime(): number;
  getDuration(): number;
  getPlayerState(): number;
}

declare global {
  interface Window {
    YT?: { Player: new (el: HTMLElement, opts: Record<string, unknown>) => YTPlayer };
    onYouTubeIframeAPIReady?: () => void;
    __btsPlayer?: boolean;
  }
}

const STORE_KEY = 'bts:player';
const YT_STATE = { ENDED: 0, PLAYING: 1, PAUSED: 2, BUFFERING: 3, CUED: 5 } as const;

function init() {
  const root = document.getElementById('player');
  if (!root || window.__btsPlayer) return;
  window.__btsPlayer = true;

  const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
  const el = {
    title: $('player-title'),
    album: $<HTMLAnchorElement>('player-album'),
    cover: $<HTMLImageElement>('player-cover'),
    toggle: $<HTMLButtonElement>('player-toggle'),
    seek: $<HTMLInputElement>('player-seek'),
    time: $('player-time'),
    hint: $('player-hint'),
    frame: $('player-frame'),
  };

  let queue: Item[] = [];
  let index = 0;
  let status: Status = 'idle';
  let view: View = 'mini';
  let yt: YTPlayer | undefined;
  let ytReady = false;
  let apiPromise: Promise<void> | undefined;
  let ticker: number | undefined;
  let stallTimer: number | undefined;
  let seeking = false;

  /* ---------- state ---------- */

  try {
    queue = JSON.parse(document.getElementById('player-default')?.textContent ?? '[]');
  } catch {
    queue = [];
  }
  try {
    const saved = JSON.parse(sessionStorage.getItem(STORE_KEY) ?? 'null');
    if (saved && Array.isArray(saved.queue) && saved.queue.length) {
      queue = saved.queue;
      index = Math.min(Math.max(0, saved.index | 0), queue.length - 1);
    }
  } catch {
    /* private mode, or nothing saved */
  }

  const current = (): Item | undefined => queue[index];

  function save() {
    try {
      sessionStorage.setItem(STORE_KEY, JSON.stringify({ queue, index }));
    } catch {
      /* ignore */
    }
  }

  function setStatus(next: Status) {
    status = next;
    root!.dataset.status = next;
    el.toggle.setAttribute('aria-label', next === 'playing' ? 'Pause' : 'Play');
    syncPage();
    if (next === 'playing') startTicker();
    else stopTicker();
  }

  function setView(next: View) {
    view = next;
    root!.dataset.view = next;
  }

  function setHint(text: string) {
    el.hint.textContent = text;
  }

  /* ---------- rendering ---------- */

  const fmt = (s: number) => {
    if (!isFinite(s) || s < 0) s = 0;
    const m = Math.floor(s / 60);
    return `${m}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
  };

  function renderNow() {
    const item = current();
    if (!item) return;
    el.title.textContent = item.title;
    el.album.textContent = item.album;
    if (item.href) el.album.setAttribute('href', item.href);
    else el.album.removeAttribute('href');
    if (item.cover && el.cover.getAttribute('src') !== item.cover) el.cover.src = item.cover;
    syncPage();
  }

  /** Mark whichever buttons on the current page belong to the track that is loaded. */
  function syncPage() {
    const id = current()?.id;
    const active = status !== 'idle';
    document.querySelectorAll<HTMLElement>('[data-play]').forEach((btn) => {
      const mine = active && btn.dataset.yt === id;
      btn.classList.toggle('is-current', mine);
      btn.classList.toggle('is-playing', mine && status === 'playing');
      if (mine) btn.setAttribute('aria-current', 'true');
      else btn.removeAttribute('aria-current');
    });
  }

  function tick() {
    if (!yt || !ytReady || seeking) return;
    const dur = yt.getDuration() || 0;
    const cur = yt.getCurrentTime() || 0;
    if (dur > 0) {
      const p = Math.min(1, cur / dur);
      el.seek.value = String(Math.round(p * 1000));
      el.seek.style.setProperty('--p', `${(p * 100).toFixed(2)}%`);
      el.seek.setAttribute('aria-valuetext', `${fmt(cur)} of ${fmt(dur)}`);
      el.time.textContent = `${fmt(cur)} / ${fmt(dur)}`;
    }
  }

  function startTicker() {
    stopTicker();
    tick();
    ticker = window.setInterval(tick, 500);
  }

  function stopTicker() {
    if (ticker) window.clearInterval(ticker);
    ticker = undefined;
  }

  function resetProgress() {
    el.seek.value = '0';
    el.seek.style.setProperty('--p', '0%');
    el.time.textContent = '';
  }

  /* ---------- YouTube ---------- */

  function loadApi(): Promise<void> {
    apiPromise ??= new Promise<void>((resolve, reject) => {
      if (window.YT?.Player) return resolve();
      const previous = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        previous?.();
        resolve();
      };
      const s = document.createElement('script');
      s.src = 'https://www.youtube.com/iframe_api';
      s.async = true;
      s.onerror = () => {
        apiPromise = undefined;
        reject(new Error('YouTube could not be reached'));
      };
      // Appended to <body>: the router only ever rewrites <head> and <main>.
      document.body.append(s);
    });
    return apiPromise;
  }

  function watchForStall() {
    window.clearTimeout(stallTimer);
    // Some phones refuse to start playback from script. Bring the video forward
    // so its own play button is one tap away.
    stallTimer = window.setTimeout(() => {
      if (status === 'loading') {
        if (view === 'mini') setView('pip');
        setHint('Tap the video to start');
      }
    }, 3500);
  }

  async function start(id: string) {
    setStatus('loading');
    setHint('');
    resetProgress();
    watchForStall();
    if (yt && ytReady) {
      yt.loadVideoById(id);
      return;
    }
    if (yt) return; // created, not ready yet: onReady plays whatever is current
    try {
      await loadApi();
    } catch {
      setStatus('idle');
      setHint('YouTube is unreachable right now');
      return;
    }
    if (yt || !window.YT) return;
    yt = new window.YT.Player(el.frame, {
      width: '100%',
      height: '100%',
      host: 'https://www.youtube-nocookie.com',
      videoId: current()?.id ?? id,
      playerVars: { autoplay: 1, playsinline: 1, rel: 0, origin: location.origin },
      events: {
        onReady: () => {
          ytReady = true;
          root!.dataset.loaded = '';
          el.seek.disabled = false;
          yt!.playVideo();
        },
        onStateChange: (e: { data: number }) => {
          switch (e.data) {
            case YT_STATE.PLAYING:
              window.clearTimeout(stallTimer);
              setHint('');
              setStatus('playing');
              break;
            case YT_STATE.PAUSED:
              setStatus('paused');
              tick();
              break;
            case YT_STATE.BUFFERING:
              if (status !== 'playing') setStatus('loading');
              break;
            case YT_STATE.CUED:
              yt!.playVideo();
              break;
            case YT_STATE.ENDED:
              if (index < queue.length - 1) go(index + 1);
              else setStatus('paused');
              break;
          }
        },
        onError: () => {
          // Removed or embedding switched off: say so and move along.
          setHint(`“${current()?.title ?? 'That one'}” can’t be played here`);
          if (index < queue.length - 1) go(index + 1);
          else setStatus('paused');
        },
      },
    });
  }

  /* ---------- controls ---------- */

  function go(i: number) {
    if (!queue.length) return;
    index = (i + queue.length) % queue.length;
    save();
    renderNow();
    start(current()!.id);
  }

  function toggle() {
    if (!current()) return;
    if (!yt || !ytReady) return void start(current()!.id);
    if (status === 'playing' || status === 'loading') yt.pauseVideo();
    else yt.playVideo();
  }

  function readItem(btn: HTMLElement): Item {
    return {
      id: btn.dataset.yt!,
      title: btn.dataset.title ?? '',
      album: btn.dataset.album ?? '',
      href: btn.dataset.href || undefined,
      cover: btn.dataset.cover || undefined,
    };
  }

  function playFrom(btn: HTMLElement) {
    const id = btn.dataset.yt;
    if (!id) return;
    if (btn.dataset.view === 'pip' && view === 'mini') setView('pip');
    if (status !== 'idle' && current()?.id === id) return toggle();
    const scope = btn.closest('[data-playlist]') ?? document;
    const buttons = [...scope.querySelectorAll<HTMLElement>('[data-play][data-yt]')];
    // The same song can be listed twice on a page (a video card and a tracklist); keep the first.
    const seen = new Set<string>();
    queue = buttons.map(readItem).filter((it) => (seen.has(it.id) ? false : (seen.add(it.id), true)));
    go(Math.max(0, queue.findIndex((it) => it.id === id)));
  }

  document.addEventListener('click', (ev) => {
    const target = ev.target as Element | null;
    if (!target) return;

    const play = target.closest<HTMLElement>('[data-play]');
    if (play) {
      ev.preventDefault();
      return playFrom(play);
    }

    // "Play album" style buttons point at a tracklist.
    const first = target.closest<HTMLElement>('[data-play-first]');
    if (first) {
      ev.preventDefault();
      const list = document.querySelector(first.dataset.playFirst!);
      const btn = list?.querySelector<HTMLElement>('[data-play][data-yt]');
      if (btn) playFrom(btn);
      return;
    }

    const ctl = target.closest<HTMLElement>('[data-player]');
    if (!ctl) return;
    switch (ctl.dataset.player) {
      case 'toggle':
        return toggle();
      case 'next':
        return go(index + 1);
      case 'prev':
        // Like a tape deck: back to the top of the song first, then to the one before.
        if (yt && ytReady && yt.getCurrentTime() > 4) return yt.seekTo(0, true);
        return go(index - 1);
      case 'expand':
        return setView('pip');
      case 'mini':
        return setView('mini');
      case 'theatre':
        return setView(view === 'theatre' ? 'pip' : 'theatre');
      case 'view':
        if (!yt) {
          setView('pip');
          return toggle();
        }
        return setView(view === 'mini' ? 'pip' : 'mini');
    }
  });

  // Warm the connection the moment someone reaches for a play control.
  const warm = (ev: Event) => {
    if ((ev.target as Element | null)?.closest?.('[data-play], [data-play-first], [data-player]')) {
      loadApi().catch(() => {});
      document.removeEventListener('pointerover', warm);
      document.removeEventListener('focusin', warm);
    }
  };
  document.addEventListener('pointerover', warm, { passive: true });
  document.addEventListener('focusin', warm);

  el.seek.addEventListener('input', () => {
    seeking = true;
    el.seek.style.setProperty('--p', `${Number(el.seek.value) / 10}%`);
  });
  el.seek.addEventListener('change', () => {
    if (yt && ytReady) yt.seekTo((Number(el.seek.value) / 1000) * (yt.getDuration() || 0), true);
    seeking = false;
  });

  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape' && view === 'theatre') setView('pip');
  });

  // New page content arrives without the "now playing" marks; put them back.
  document.addEventListener('astro:page-load', syncPage);

  renderNow();
}

init();

export {};
