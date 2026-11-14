// Card behaviour. Runs inline in <head> (components/starlight/Head.astro) so the page events below
// are caught before the first render. Plain JavaScript on purpose: it is inlined as written.
//
//  - seen:      cards the reader has opened carry data-seen ("已读"); kept in localStorage.
//  - opening:   a plain click puts data-opening on the card until the next page shows.
//  - round trip: card title -> page heading and back, through cross-document view transitions.
//               Only that round trip animates; every other navigation skips the transition.
//  - returned:  coming back to a list marks the card the reader left from, once, and puts the
//               keyboard focus on it.
(() => {
  const DETAIL = /^\/(post|event|publication)\/[^/]+\/$/;
  const LAST = 'dapr:last-card';
  const SEEN = 'dapr:seen-cards';
  const FRESH_MS = 30000;
  const TITLE = ':is(h2, h3)';

  const get = (store, key) => {
    try {
      return store.getItem(key);
    } catch {
      return null;
    }
  };
  const set = (store, key, value) => {
    try {
      store.setItem(key, value);
    } catch {
      /* private mode or blocked storage: the states simply do not persist */
    }
  };
  const json = (text, fallback) => {
    try {
      return JSON.parse(text) ?? fallback;
    } catch {
      return fallback;
    }
  };

  const pathOf = (url) => {
    try {
      return new URL(url, location.href).pathname;
    } catch {
      return '';
    }
  };
  const lastCard = () => json(get(sessionStorage, LAST), null);
  const seen = () => new Set(json(get(localStorage, SEEN), []));
  const markSeen = (href) => {
    const all = seen();
    all.delete(href);
    all.add(href);
    set(localStorage, SEEN, JSON.stringify([...all].slice(-300)));
  };
  const cardLink = (href) => document.querySelector(`.card[data-card] ${TITLE} a[href="${href}"]`);
  const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- View transitions: the card title and the page heading are the shared element. ---

  window.addEventListener('pageswap', (event) => {
    const transition = event.viewTransition;
    if (!transition) return;
    const to = event.activation && event.activation.entry ? pathOf(event.activation.entry.url) : '';
    const last = lastCard();
    let wanted = false;
    if (DETAIL.test(location.pathname)) {
      // Leaving a page for anywhere but another page: only the way back to the card counts.
      wanted = !DETAIL.test(to) && !!last && last.href === location.pathname;
    } else if (DETAIL.test(to)) {
      const heading = cardLink(to)?.closest(TITLE);
      if (heading) {
        heading.style.viewTransitionName = 'card-title';
        transition.finished.finally(() => {
          heading.style.viewTransitionName = '';
        });
        wanted = true;
      }
    }
    if (!wanted) transition.skipTransition();
  });

  // Resolved when the incoming transition ends, so the "returned" mark waits for the flight home.
  let flightHome = Promise.resolve();

  window.addEventListener('pagereveal', (event) => {
    const transition = event.viewTransition;
    if (!transition) return;
    const activation = typeof navigation !== 'undefined' ? navigation.activation : null;
    const last = lastCard();
    const from = activation && activation.from ? pathOf(activation.from.url) : '';
    let wanted = false;
    if (DETAIL.test(location.pathname)) {
      wanted =
        !!last &&
        last.href === location.pathname &&
        Date.now() - last.t < FRESH_MS &&
        activation?.navigationType === 'push';
    } else if (last && activation?.navigationType === 'traverse' && from === last.href) {
      // The way back: name the card's title for the duration of the transition.
      const rule = document.createElement('style');
      rule.textContent = `.card[data-card]:has(${TITLE} a[href="${last.href}"]) ${TITLE} { view-transition-name: card-title; }`;
      document.head.appendChild(rule);
      transition.finished.finally(() => rule.remove());
      flightHome = transition.finished.catch(() => {});
      wanted = true;
    }
    if (!wanted) transition.skipTransition();
  });

  // --- Card states ---

  const mark = (event, opening) => {
    const link =
      event.target instanceof Element ? event.target.closest(`.card[data-card] ${TITLE} a`) : null;
    if (!link) return;
    const card = link.closest('.card');
    const href = pathOf(link.href);
    set(sessionStorage, LAST, JSON.stringify({ href, t: Date.now() }));
    markSeen(href);
    card.dataset.seen = '';
    if (opening && !event.defaultPrevented) card.dataset.opening = '';
  };

  document.addEventListener('click', (event) => {
    const plain = event.button === 0 && !(event.metaKey || event.ctrlKey || event.shiftKey || event.altKey);
    mark(event, plain);
  });
  document.addEventListener('auxclick', (event) => mark(event, false));

  const clearOpening = () => {
    for (const card of document.querySelectorAll('.card[data-opening]')) delete card.dataset.opening;
    for (const heading of document.querySelectorAll(`.card[data-card] ${TITLE}`)) {
      heading.style.viewTransitionName = '';
    }
  };

  const applySeen = () => {
    const all = seen();
    if (DETAIL.test(location.pathname)) {
      markSeen(location.pathname);
      all.add(location.pathname);
    }
    for (const link of document.querySelectorAll(`.card[data-card] ${TITLE} a`)) {
      if (all.has(pathOf(link.href))) link.closest('.card').dataset.seen = '';
    }
  };

  // Back on a list: mark the card the reader left from, bring it into view if it is not, and
  // hand it the keyboard focus.
  const showReturned = async () => {
    const last = lastCard();
    if (!last || !DETAIL.test(last.href)) return;
    const link = cardLink(last.href);
    if (!link) return;
    await flightHome;
    const card = link.closest('.card');
    const box = card.getBoundingClientRect();
    if (box.top < 72 || box.bottom > innerHeight - 24) {
      card.scrollIntoView({ block: 'center', behavior: reduced() ? 'auto' : 'smooth' });
    }
    link.focus({ preventScroll: true });
    card.dataset.returned = '';
    setTimeout(() => delete card.dataset.returned, 1900);
  };

  const cameBack = () => {
    const entry = performance.getEntriesByType('navigation')[0];
    return !!entry && entry.type === 'back_forward';
  };

  document.addEventListener('DOMContentLoaded', () => {
    applySeen();
    if (cameBack()) showReturned();
  });

  // Restored from the back/forward cache: the page is exactly as it was left.
  window.addEventListener('pageshow', (event) => {
    if (!event.persisted) return;
    clearOpening();
    applySeen();
    showReturned();
  });
})();
