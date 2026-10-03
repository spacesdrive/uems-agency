// Post-deploy smoke test: node scripts/smoke-production.mjs https://uems-agency.spacesdrive.cc
// Waits until the live site serves this build (matching the hashed entry script in dist/),
// then checks key routes, redirects, the 404 page, security headers and asset caching.
import { readFile } from 'node:fs/promises';

const base = (process.argv[2] ?? '').replace(/\/$/, '');
if (!base.startsWith('https://')) {
  console.error('Usage: node scripts/smoke-production.mjs https://<host>');
  process.exit(2);
}

const localIndex = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8').catch(() => null);
const expectedEntry = localIndex?.match(/\/assets\/index-[\w-]+\.js/)?.[0];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const get = (path, init) => fetch(base + path, { redirect: 'manual', headers: { 'cache-control': 'no-cache' }, ...init });

// 1. Wait for the new version to be live (edge propagation takes a few seconds).
let home = '';
for (let attempt = 1; attempt <= 24; attempt++) {
  try {
    const res = await get('/');
    home = res.ok ? await res.text() : '';
    if (res.ok && (!expectedEntry || home.includes(expectedEntry))) break;
    console.log(`Waiting for deployment (attempt ${attempt}, status ${res.status})…`);
  } catch (error) {
    console.log(`Waiting for deployment (attempt ${attempt}, ${error.cause?.code ?? error.message})…`);
  }
  await sleep(5000);
}

const failures = [];
const check = (ok, message) => {
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${message}`);
  if (!ok) failures.push(message);
};

check(home.includes('data-route="/"'), 'home page is served');
if (expectedEntry) check(home.includes(expectedEntry), `live site serves this build (${expectedEntry})`);

// 2. Key routes render their pre-rendered page.
for (const path of ['/about-us/', '/study-in-australia/', '/contact-us/', '/career-clarity-tests/']) {
  const res = await get(path);
  const html = res.ok ? await res.text() : '';
  check(res.status === 200 && html.includes(`data-route="${path.slice(0, -1)}"`), `${path} → ${res.status}`);
}

// 3. Canonical redirects, 404 handling and SEO files.
const bare = await get('/about-us');
check(
  [301, 307, 308].includes(bare.status) && new URL(bare.headers.get('location') ?? '', base).pathname === '/about-us/',
  `/about-us redirects to /about-us/ (${bare.status})`,
);
const missing = await get('/this-page-does-not-exist/');
check(missing.status === 404 && (await missing.text()).includes('Page not found'), `unknown URL → ${missing.status} with 404 page`);
const sitemap = await get('/sitemap.xml');
check(sitemap.status === 200 && (await sitemap.text()).includes('<urlset'), `sitemap.xml → ${sitemap.status}`);
check((await get('/_headers')).status === 404, '_headers is not publicly served');

// 4. Security headers and caching.
const head = await get('/');
for (const header of ['content-security-policy', 'strict-transport-security', 'x-content-type-options', 'referrer-policy', 'x-frame-options']) {
  check(Boolean(head.headers.get(header)), `header ${header}`);
}
const entry = home.match(/\/assets\/index-[\w-]+\.js/)?.[0];
if (entry) {
  const asset = await get(entry);
  check(asset.status === 200 && /immutable/.test(asset.headers.get('cache-control') ?? ''), `${entry} is cached immutably`);
}
const http = await fetch(base.replace('https://', 'http://') + '/', { redirect: 'manual' }).catch(() => null);
check(!http || [301, 302, 307, 308].includes(http.status), `plain HTTP redirects to HTTPS (${http?.status ?? 'refused'})`);

// 5. Form email endpoint is live and guarded. These requests are refused before any email is sent.
const getApi = await get('/api/enquiry');
check(getApi.status === 405, `/api/enquiry rejects GET (${getApi.status})`);
const foreign = await fetch(`${base}/api/enquiry`, {
  method: 'POST',
  headers: { Origin: 'https://example.com', 'Content-Type': 'application/json' },
  body: '{}',
});
check(foreign.status === 403, `/api/enquiry rejects other origins (${foreign.status})`);
const redirected = await get('/career-guidance/career-assessment-test/');
check(
  redirected.status === 301 && new URL(redirected.headers.get('location') ?? '', base).pathname === '/career-clarity-tests/',
  `removed Premium page redirects to /career-clarity-tests/ (${redirected.status})`,
);

if (failures.length) {
  console.error(`\n${failures.length} production check(s) failed.`);
  process.exit(1);
}
console.log('\nProduction smoke test passed.');
