// Checks the production artifact in dist/ before it is deployed.
// Fails on missing pages, missing security headers, or anything that looks like a leaked secret.
import { readFile, readdir, stat } from 'node:fs/promises';
import { dirname, extname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const problems = [];

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

const files = await walk(dist);
const rel = (f) => relative(dist, f).split('\\').join('/');

// 1. Every route in the route table has a pre-rendered page.
const routesSource = await readFile(join(root, 'src/routes.ts'), 'utf8');
const routePaths = [...routesSource.matchAll(/^\s*\['(\/[^']*)'/gm)].map((m) => m[1]);
if (routePaths.length === 0) problems.push('Could not read any routes from src/routes.ts');
for (const path of routePaths) {
  const file = path === '/' ? 'index.html' : `${path.slice(1)}/index.html`;
  const full = join(dist, file);
  const html = await readFile(full, 'utf8').catch(() => null);
  if (html === null) {
    problems.push(`Missing page for ${path} (${file})`);
    continue;
  }
  if (!html.includes(`data-route="${path}"`)) problems.push(`${file} is missing its data-route marker`);
  if (!/<title>[^<]+<\/title>/.test(html)) problems.push(`${file} has no <title>`);
  if (!html.includes('<style>')) problems.push(`${file} does not inline the stylesheet`);
}

// 2. Supporting files for Cloudflare and search engines.
for (const required of ['404.html', 'sitemap.xml', 'robots.txt', '_headers', 'site.webmanifest']) {
  if (!files.some((f) => rel(f) === required)) problems.push(`Missing ${required}`);
}
const headers = await readFile(join(dist, '_headers'), 'utf8').catch(() => '');
for (const header of ['Content-Security-Policy', 'Strict-Transport-Security', 'X-Content-Type-Options', 'Referrer-Policy']) {
  if (!headers.includes(`${header}:`)) problems.push(`_headers does not set ${header}`);
}

// 3. Nothing that should never be public.
const forbiddenName = /(^|\/)(\.env(\..*)?|\.dev\.vars.*|\.cloudflare.*|.*\.pem|.*\.key|.*\.map|wrangler\.jsonc?|package(-lock)?\.json)$/i;
const secretPattern =
  /cfat_[A-Za-z0-9]{20,}|ghp_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{20,}|AKIA[0-9A-Z]{16}|-----BEGIN [A-Z ]*PRIVATE KEY-----|xox[baprs]-[A-Za-z0-9-]{10,}|CLOUDFLARE_API_TOKEN\s*[=:]/;
const textTypes = new Set(['.html', '.js', '.css', '.json', '.xml', '.txt', '.webmanifest', '.svg', '']);
let bytes = 0;
for (const file of files) {
  const name = rel(file);
  bytes += (await stat(file)).size;
  if (forbiddenName.test(name)) problems.push(`Forbidden file in artifact: ${name}`);
  if (!textTypes.has(extname(file))) continue;
  const text = await readFile(file, 'utf8');
  if (secretPattern.test(text)) problems.push(`Secret-like content in ${name}`);
}

if (problems.length) {
  console.error(`dist/ verification failed:\n - ${problems.join('\n - ')}`);
  process.exit(1);
}
console.log(
  `dist/ verified: ${routePaths.length} routes, ${files.length} files, ${(bytes / 1024 / 1024).toFixed(1)} MB, no secrets found`,
);
