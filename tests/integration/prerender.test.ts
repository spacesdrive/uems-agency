// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { site } from '../../src/data/site';
import { paths, render } from '../../src/entry-server';
import { canonicalPath } from '../../src/lib/links';

/** Server-renders routes through the same entry used by the production pre-render step. */
describe('pre-rendered routes', () => {
  it.each(paths)('%s renders a complete page', async (path) => {
    const html = await render(path);
    const text = html.replace(/<[^>]+>/g, ' ');

    expect(html.match(/<h1[\s>]/g) ?? []).toHaveLength(1);
    expect(html).toMatch(/<title>[^<]*UEMS Ventures[^<]*<\/title>/);
    expect(html).toMatch(/<meta name="description" content="[^"]{20,}"/);
    expect(html).toContain('<main id="main"');
    expect(html).toContain('aria-label="Main"');
    expect(text).not.toMatch(/\bundefined\b|\[object Object\]|\bNaN\b/);
  });

  // The Disclaimer page is a "coming soon" stub and the appointment form needs no search listing.
  const noIndexPaths = ['/disclaimer', '/book-appointment'];

  it.each(paths.filter((p) => !noIndexPaths.includes(p)))('%s declares its canonical URL', async (path) => {
    const html = await render(path);
    expect(html).toContain(`<link rel="canonical" href="${site.url}${canonicalPath(path)}"`);
    expect(html).not.toContain('content="noindex"');
  });

  it.each(noIndexPaths)('%s is excluded from indexing', async (path) => {
    const html = await render(path);
    expect(html).toContain('<meta name="robots" content="noindex"');
    expect(html).not.toContain('rel="canonical"');
  });

  it('renders the not-found page for unknown URLs', async () => {
    const html = await render('/this-page-does-not-exist');
    expect(html).toMatch(/<meta name="robots" content="noindex"/);
    expect(html).not.toContain('rel="canonical"');
    expect(html.match(/<h1[\s>]/g) ?? []).toHaveLength(1);
  });

  it('emits valid organisation structured data on the home page', async () => {
    const html = await render('/');
    const json = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)?.[1];
    expect(json).toBeDefined();
    const data = JSON.parse(json!);
    expect(data['@type']).toBeDefined();
    expect(data.name).toBe(site.name);
  });
});

describe('contact page', () => {
  it('shows the enquiry form in the hero, beside "Fill the form"', async () => {
    const html = await render('/contact-us');
    const hero = html.slice(html.indexOf('id="page-title"'), html.indexOf('</section>', html.indexOf('id="page-title"')));
    expect(hero).toContain('<form');
    expect(html.match(/<form/g)).toHaveLength(1);
  });
});
