import { describe, expect, it } from 'vitest';
import { blogIndex } from '../../src/data/blog';
import { pastEvents, upcomingEvents } from '../../src/data/events';
import { footerNav, primaryNav } from '../../src/data/site';
import { findRoute, preloadRoute, routes } from '../../src/routes';

/** Static page routes carried over from the original site (excludes migrated blog posts). */
const CORE_PAGE_COUNT = 30;

describe('route table', () => {
  it('has unique, normalised paths', () => {
    const paths = routes.map((r) => r.path);
    expect(new Set(paths).size).toBe(paths.length);
    for (const path of paths) {
      expect(path).toMatch(/^\/([a-z0-9-]+(\/[a-z0-9-]+)*)?$/);
    }
  });

  it('includes every page of the original site map plus one route per migrated blog post', () => {
    expect(blogIndex.length).toBeGreaterThan(0);
    expect(routes).toHaveLength(CORE_PAGE_COUNT + blogIndex.length);
  });

  it('serves each migrated blog post at its original root permalink', () => {
    for (const post of blogIndex) {
      expect(findRoute(`/${post.slug}`)?.path).toBe(`/${post.slug}`);
    }
  });

  it('links every seminar/event to a page on this site, never the old domain', () => {
    for (const event of [...upcomingEvents, ...pastEvents]) {
      expect(event.url.startsWith('/')).toBe(true);
      expect(findRoute(event.url)?.path).toBe(event.url);
    }
  });
});

describe('findRoute', () => {
  it('matches with or without a trailing slash, query or hash', () => {
    expect(findRoute('/about-us')?.path).toBe('/about-us');
    expect(findRoute('/about-us/')?.path).toBe('/about-us');
    expect(findRoute('/about-us/?utm_source=x#team')?.path).toBe('/about-us');
  });

  it('is case-insensitive like the original WordPress site', () => {
    expect(findRoute('/Study-In-Australia/')?.path).toBe('/study-in-australia');
  });

  it('matches the home page', () => {
    expect(findRoute('/')?.path).toBe('/');
  });

  it('no longer serves the removed Premium assessment page (it redirects to Career Clarity Tests)', () => {
    expect(findRoute('/career-guidance/career-assessment-test/')).toBeUndefined();
    expect(findRoute('/career-clarity-tests/')?.path).toBe('/career-clarity-tests');
  });

  it('returns undefined for unknown paths', () => {
    expect(findRoute('/does-not-exist')).toBeUndefined();
    expect(findRoute('/about-us/extra')).toBeUndefined();
  });
});

describe('preloadRoute', () => {
  it('loads a route chunk once and ignores repeat or unknown requests', async () => {
    const first = preloadRoute('/privacy-policy');
    expect(first).toBeInstanceOf(Promise);
    await expect(first).resolves.toHaveProperty('default');
    expect(preloadRoute('/privacy-policy/')).toBeUndefined();
    expect(preloadRoute('/nope')).toBeUndefined();
  });
});

describe('internal links', () => {
  // Every data module (site, home, pages, posts, legal…) is scanned for internal hrefs.
  const modules = import.meta.glob('../../src/data/**/*.ts', { eager: true });
  const serialized = JSON.stringify(Object.values(modules));
  const found = new Set<string>();
  for (const m of serialized.matchAll(/"(?:to|href)":"(\/[^"#]*)[^"]*"|\]\((\/[^)#\s]*)[^)]*\)/g)) {
    const path = m[1] ?? m[2];
    if (path) found.add(path);
  }

  it('finds internal links to check', () => {
    expect(found.size).toBeGreaterThan(20);
  });

  it.each([...found].filter((p) => !p.startsWith('/images/')))('%s resolves to a route', (path) => {
    expect(findRoute(path)).toBeDefined();
  });

  const navPaths = [primaryNav, primaryNav.flatMap((item) => item.children ?? []), ...Object.values(footerNav)]
    .flat()
    .map((link) => link.to);

  it.each(navPaths)('navigation link %s resolves to a route', (path) => {
    expect(findRoute(path)).toBeDefined();
  });
});
