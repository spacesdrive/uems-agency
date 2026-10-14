// build-blog.mjs — one-time migration tool. Turns the old WordPress export
// (posts.json, extracted from the mysqldump) into clean, code-split blog data
// modules under src/data/blog/. The generated modules are the source of truth;
// this script is kept for auditability / re-runs.
//
// Requires a dev-only parser that is NOT a project dependency:
//     npm i -D node-html-parser
// Usage:
//     node scripts/build-blog.mjs <path/to/posts.json>
//
// What it does to each post (wording is never changed):
//  - strips inert WordPress / page-builder markup (class, data-*, Gutenberg
//    comments, <script>/<style>, membership-gate [um_loggedin] tags),
//  - demotes in-body <h1> to <h2> (the page title is the only <h1>),
//  - rewrites images + internal links from uemsventures.com to local paths,
//  - normalises typography (em/en dashes -> hyphen, smart quotes -> straight,
//    repairs UTF-8 mojibake) via clean-text.mjs,
//  - expands AIOSEO title/description template tokens.
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'node-html-parser';
import { cleanHtml, htmlToText, readingTimeMin } from './clean-text.mjs';

const SRC = process.argv[2];
if (!SRC) {
  console.error('Usage: node scripts/build-blog.mjs <path/to/posts.json>');
  process.exit(1);
}
const REPO = join(dirname(fileURLToPath(import.meta.url)), '..');
const POSTS_DIR = join(REPO, 'src/data/blog/posts');
const INDEX_FILE = join(REPO, 'src/data/blog/index.ts');

const posts = JSON.parse(readFileSync(SRC, 'utf8'));

// ---------- helpers ----------
const ENTITIES = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#039;': "'", '&#39;': "'", '&rsquo;': "'", '&nbsp;': ' ' };
function decodeEntities(s) {
  return (s || '').replace(/&(amp|lt|gt|quot|#0?39|rsquo|nbsp);/g, (m) => ENTITIES[m] ?? m);
}
// Normalise typography on a plain string (reuse the HTML cleaner; no tags => all text).
const text = (s) => cleanHtml(decodeEntities(s || '')).trim();

function authorName(raw) {
  const map = { uemswpsite: 'UEMS Ventures', 'UEMS TEAM': 'UEMS Team' };
  return map[raw] || raw || 'UEMS Ventures';
}

function cleanTerms(terms) {
  const out = [];
  for (const t of terms || []) {
    const name = text(t.name);
    if (!name || /^uncategor/i.test(t.slug) || /^uncategor/i.test(name)) continue;
    out.push({ name, slug: t.slug });
  }
  return out;
}

// Make a local media path ASCII/URL-safe (odd WordPress filenames carry em/en dashes etc.).
function sanitizeLocal(p) {
  return p
    .split('/')
    .map((seg) =>
      seg
        .replace(/[‒–—―]/g, '-')
        .replace(/[^A-Za-z0-9._-]/g, '-')
        .replace(/-{2,}/g, '-')
        .replace(/^-+/, '')
        .replace(/-+(\.[A-Za-z0-9]+)$/, '$1'),
    )
    .join('/');
}

// URL rewriting: our-domain uploads -> /blog-media, our-domain pages -> relative, else untouched.
function rewriteUrl(u) {
  if (!u) return u;
  let m = u.match(/^https?:\/\/(?:www\.)?uemsventures\.com\/wp-content\/uploads\/(.+)$/i);
  if (m) return sanitizeLocal('/blog-media/' + m[1]);
  m = u.match(/^https?:\/\/(?:www\.)?uemsventures\.com(\/.*)?$/i);
  if (m) return m[1] || '/';
  return u; // genuine external (e.g. googleusercontent) stays absolute
}

const KEEP_ATTRS = new Set([
  'href', 'src', 'alt', 'title', 'width', 'height', 'colspan', 'rowspan', 'scope', 'target', 'rel', 'datetime', 'start',
]);
// style kept only where it carries layout meaning (inline image sizing, table/cell sizing).
const KEEP_STYLE_TAGS = new Set(['img', 'table', 'td', 'th', 'col', 'colgroup']);

function cleanContent(rawHtml) {
  let html = rawHtml || '';
  html = html.replace(/<!--[\s\S]*?-->/g, '');                       // strip HTML/Gutenberg comments
  html = html.replace(/<(script|style|noscript)[\s\S]*?<\/\1>/gi, ''); // strip script/style blocks
  html = html.replace(/\[\/?um_loggedin\]/gi, '');                   // strip membership-gate shortcode tags

  const root = parse(html, { comment: false });

  for (const el of root.querySelectorAll('*')) {
    const tag = el.rawTagName ? el.rawTagName.toLowerCase() : '';
    for (const name of Object.keys(el.attributes)) {
      const lower = name.toLowerCase();
      if (lower === 'style') {
        if (!KEEP_STYLE_TAGS.has(tag)) el.removeAttribute(name);
        continue;
      }
      if (!KEEP_ATTRS.has(lower)) el.removeAttribute(name);
    }
    if (tag === 'img') {
      el.removeAttribute('srcset');
      el.removeAttribute('sizes');
      const src = el.getAttribute('src');
      if (src) el.setAttribute('src', rewriteUrl(src));
      if (el.getAttribute('alt') == null) el.setAttribute('alt', '');
      el.setAttribute('loading', 'lazy');
      el.setAttribute('decoding', 'async');
    }
    if (tag === 'a') {
      const href = el.getAttribute('href');
      if (href) {
        const nu = rewriteUrl(href);
        el.setAttribute('href', nu);
        if (nu.startsWith('/')) {
          el.removeAttribute('target');
          el.removeAttribute('rel');
        }
      }
    }
  }

  let out = root.toString();
  out = out.replace(/(<\/?)h1(\b[^>]*>)/gi, '$1h2$2');               // demote body <h1> to <h2>
  let prev;
  do {
    prev = out;
    out = out.replace(/<(p|div|span)>(?:\s|&nbsp;|<br\s*\/?>)*<\/\1>/gi, '');
  } while (out !== prev);
  out = cleanHtml(out);                                              // typographic normalisation
  out = out.replace(/\r\n?/g, '\n').replace(/\n{3,}/g, '\n\n').trim(); // LF-only, no triple blank lines
  return out;
}

function makeExcerpt(post, cleanedHtml) {
  let base = post.excerpt && post.excerpt.trim() ? htmlToText(post.excerpt) : htmlToText(cleanedHtml);
  base = text(base);
  if (base.length <= 170) return base;
  const cut = base.slice(0, 170);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > 120 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:.-]+$/, '') + '...';
}

const AIOSEO_TOKENS = {
  '#post_title': (p) => p.title,
  '#archive_title': (p) => p.title,
  '#taxonomy_title': (p) => p.title,
  '#separator_sa': () => '|',
  '#site_title': () => 'UEMS Ventures',
  '#tagline': () => 'Study Abroad, Career Guidance & Migration',
  '#breadcrumb_404_error_format': () => '',
};
function expandTokens(str, p) {
  let s = str;
  for (const [tok, fn] of Object.entries(AIOSEO_TOKENS)) s = s.split(tok).join(fn(p));
  s = s.replace(/\s{2,}/g, ' ').replace(/\s+\|\s*$/, '').trim();
  return s;
}
function seoTitle(post) {
  const raw = (post.seo_title || '').trim();
  if (raw) {
    const expanded = raw.includes('#') ? expandTokens(raw, post) : raw;
    if (expanded && !expanded.includes('#')) return text(expanded);
  }
  return text(post.title);
}
function seoDescription(post, excerpt) {
  const raw = (post.seo_description || '').trim();
  if (raw && !raw.includes('#')) return text(raw);
  if (raw && raw.includes('#')) {
    const e = expandTokens(raw, post);
    if (e && !e.includes('#')) return text(e);
  }
  return excerpt;
}

const isoDate = (s) => (s || '').slice(0, 10);

function tsLiteral(html) {
  return '`' + html.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${') + '`';
}
const j = (v) => JSON.stringify(v);

// ---------- build ----------
if (existsSync(POSTS_DIR)) for (const f of readdirSync(POSTS_DIR)) rmSync(join(POSTS_DIR, f));
mkdirSync(POSTS_DIR, { recursive: true });

const seenSlugs = new Set();
const indexItems = [];
const warnings = [];

for (const post of posts) {
  let slug = post.slug;
  if (!slug) { warnings.push(`post ${post.id} has no slug, skipped`); continue; }
  if (seenSlugs.has(slug)) { warnings.push(`duplicate slug ${slug} (post ${post.id}) -> suffixed`); slug = `${slug}-${post.id}`; }
  seenSlugs.add(slug);

  const html = cleanContent(post.content_html);
  const excerpt = makeExcerpt(post, html);
  const title = text(post.title);
  const author = authorName(post.author_name);
  const categories = cleanTerms(post.categories);
  const tags = cleanTerms(post.tags);
  const featuredImage = post.featured_image_url ? rewriteUrl(post.featured_image_url) : undefined;
  const featuredImageAlt = text(post.featured_image_alt) || title;
  const date = isoDate(post.date);
  const modified = isoDate(post.modified) || date;
  const readingTime = readingTimeMin(html);
  const seo = { title: seoTitle(post), description: seoDescription(post, excerpt) };

  const body =
    `import type { BlogPostData } from '../types';\n\n` +
    `const post: BlogPostData = {\n` +
    `  slug: ${j(slug)},\n` +
    `  title: ${j(title)},\n` +
    `  excerpt: ${j(excerpt)},\n` +
    `  date: ${j(date)},\n` +
    `  modified: ${j(modified)},\n` +
    `  author: ${j(author)},\n` +
    `  categories: ${j(categories)},\n` +
    `  tags: ${j(tags)},\n` +
    (featuredImage ? `  featuredImage: ${j(featuredImage)},\n` : '') +
    (featuredImage ? `  featuredImageAlt: ${j(featuredImageAlt)},\n` : '') +
    `  readingTime: ${readingTime},\n` +
    `  seo: { title: ${j(seo.title)}, description: ${j(seo.description)} },\n` +
    `  html: ${tsLiteral(html)},\n` +
    `};\n\nexport default post;\n`;

  writeFileSync(join(POSTS_DIR, `${slug}.ts`), body, 'utf8');

  indexItems.push({
    slug, title, excerpt, date, author,
    category: categories[0]?.name,
    featuredImage, featuredImageAlt: featuredImage ? featuredImageAlt : undefined,
    readingTime,
  });
}

indexItems.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0)); // newest first

const indexBody =
  `import type { BlogListItem } from './types';\n\n` +
  `/** Generated from the WordPress export by scripts/build-blog.mjs. Do not edit by hand. */\n` +
  `export const blogIndex: readonly BlogListItem[] = [\n` +
  indexItems
    .map((it) => {
      const parts = [
        `slug: ${j(it.slug)}`,
        `title: ${j(it.title)}`,
        `excerpt: ${j(it.excerpt)}`,
        `date: ${j(it.date)}`,
        `author: ${j(it.author)}`,
        it.category ? `category: ${j(it.category)}` : null,
        it.featuredImage ? `featuredImage: ${j(it.featuredImage)}` : null,
        it.featuredImageAlt ? `featuredImageAlt: ${j(it.featuredImageAlt)}` : null,
        `readingTime: ${it.readingTime}`,
      ].filter(Boolean);
      return `  { ${parts.join(', ')} },`;
    })
    .join('\n') +
  `\n];\n`;

writeFileSync(INDEX_FILE, indexBody, 'utf8');

console.log(`generated ${indexItems.length} post modules into src/data/blog/posts/`);
if (warnings.length) { console.log('\nWARNINGS:'); warnings.forEach((w) => console.log('  - ' + w)); }
