import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// jsdom lacks these browser APIs; components only need them to exist.
if (typeof window !== 'undefined') {
  window.matchMedia ??= (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList;

  window.scrollTo ??= () => {};
  Element.prototype.scrollIntoView ??= () => {};

  class NoopObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  }
  globalThis.IntersectionObserver ??= NoopObserver as unknown as typeof IntersectionObserver;
  globalThis.ResizeObserver ??= NoopObserver as unknown as typeof ResizeObserver;
}

afterEach(() => {
  cleanup();
});
