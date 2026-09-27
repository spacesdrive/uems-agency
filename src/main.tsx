import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { App } from './App';
import { findRoute, preloadRoute, routes } from './routes';

const container = document.getElementById('root');
if (!container) throw new Error('Root element #root not found');

const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

/**
 * Hydrate only when the pre-rendered markup belongs to this URL. A host that
 * falls back to another page's HTML (e.g. index.html for unknown paths) gets a
 * clean client render instead of a hydration mismatch.
 */
function prerenderedForThisUrl(el: HTMLElement): boolean {
  const rendered = el.dataset.route;
  if (!rendered || !el.firstElementChild) return false;
  const current = findRoute(window.location.pathname);
  return rendered === '*' ? current === undefined : current?.path === rendered;
}

if (prerenderedForThisUrl(container)) {
  // Load this route's chunk first so hydration completes in one pass.
  Promise.resolve(preloadRoute(window.location.pathname))
    .catch(() => undefined)
    .then(() => hydrateRoot(container, app));
} else {
  container.replaceChildren();
  createRoot(container).render(app);
}

// Warm the primary sections once the browser is idle.
const warm = () => routes.slice(0, 6).forEach((r) => preloadRoute(r.path));
if ('requestIdleCallback' in window) window.requestIdleCallback(warm, { timeout: 4000 });
else setTimeout(warm, 3000);
