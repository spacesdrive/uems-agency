let observer: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        (entry.target as HTMLElement).dataset.revealState = 'shown';
        observer?.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  return observer;
}

/**
 * Hides an element that is currently below the fold and reveals it when it
 * scrolls into view. Elements already on screen are left untouched so content
 * never flashes and pre-rendered HTML stays visible without JavaScript.
 */
export function observeReveal(el: HTMLElement): () => void {
  if (typeof IntersectionObserver === 'undefined') return () => {};
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};

  const rect = el.getBoundingClientRect();
  if (rect.top < window.innerHeight && rect.bottom > 0) return () => {};

  el.dataset.revealState = 'hidden';
  const io = getObserver();
  io.observe(el);
  return () => io.unobserve(el);
}
