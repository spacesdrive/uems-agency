// Renders every route to static HTML after `vite build` and the SSR build.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const ssrDir = join(root, 'dist-ssr');
const siteUrl = 'https://uemsventures.com';

// Inline the single stylesheet (~12 kB gzipped) to remove a render-blocking round trip.
const shell = await readFile(join(dist, 'index.html'), 'utf8');
const cssLink = shell.match(/<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/);
if (!cssLink) throw new Error('Stylesheet link not found in dist/index.html');
const css = await readFile(join(dist, cssLink[1].slice(1)), 'utf8');
const template = shell.replace(cssLink[0], () => `<style>${css}</style>`);
const { render, paths } = await import(pathToFileURL(join(ssrDir, 'entry-server.js')).href);

// React 19 emits <title>, <meta> and <link> ahead of the app markup; move them into <head>.
const headTag = /^(\s*(<title>[\s\S]*?<\/title>|<meta\b[^>]*\/?>|<link\b[^>]*\/?>))+/;

// `data-route` lets the client confirm the markup belongs to the current URL before hydrating.
async function renderPage(url, route = url) {
  const html = await render(url);
  const match = html.match(headTag);
  const head = match ? match[0] : '';
  const body = html.slice(head.length);
  if (!head.includes('<title>')) throw new Error(`No <title> rendered for ${url}`);
  return template
    .replace('<!--app-head-->', head.trim())
    .replace('<div id="root"><!--app-html--></div>', `<div id="root" data-route="${route}">${body}</div>`);
}

let count = 0;
for (const path of paths) {
  const page = await renderPage(path);
  const file = path === '/' ? join(dist, 'index.html') : join(dist, path.slice(1), 'index.html');
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, page);
  count++;
}

await writeFile(join(dist, '404.html'), await renderPage('/__not-found__', '*'));

const today = new Date().toISOString().slice(0, 10);
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...paths
    .filter((p) => p !== '/disclaimer')
    .map((p) => `  <url><loc>${siteUrl}${p === '/' ? '/' : `${p}/`}</loc><lastmod>${today}</lastmod></url>`),
  '</urlset>',
  '',
].join('\n');
await writeFile(join(dist, 'sitemap.xml'), sitemap);

await rm(ssrDir, { recursive: true, force: true });
console.log(`Prerendered ${count} routes + 404.html and sitemap.xml`);
