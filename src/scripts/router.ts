/**
 * Navigation that never interrupts the music.
 *
 * Astro's client router normally replaces the whole <body>. Here only <main id="page">
 * is replaced: the header, footer and, crucially, the player (with its YouTube
 * iframe) are left completely alone, so a song or video keeps playing while you
 * browse. Browsers without the View Transitions API get the same swap, minus the
 * animation; with JavaScript off every link is an ordinary page load.
 */
import { swapFunctions } from 'astro:transitions/client';
import type { TransitionBeforeSwapEvent } from 'astro:transitions/client';

document.addEventListener('astro:before-swap', (ev) => {
  const event = ev as TransitionBeforeSwapEvent;
  const next = event.newDocument;
  const incoming = next.getElementById('page');
  const outgoing = document.getElementById('page');
  // Anything unexpected: let Astro do its default full swap.
  if (!incoming || !outgoing) return;

  event.swap = () => {
    swapFunctions.deselectScripts(next);
    swapFunctions.swapRootAttributes(next); // carries each record's colours on <html>
    swapFunctions.swapHeadElements(next);
    const restoreFocus = swapFunctions.saveFocus();
    outgoing.replaceWith(incoming);
    restoreFocus();
  };
});

function markNav() {
  const here = location.pathname;
  document.querySelectorAll<HTMLAnchorElement>('.site-nav a[href^="/"]').forEach((a) => {
    const href = a.getAttribute('href')!;
    if (here === href || here.startsWith(href)) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
}

document.addEventListener('astro:after-swap', markNav);
