// clean-text.mjs — content-preserving typographic normalization for migrated WP blog HTML.
// RULE: only punctuation GLYPHS are changed (em/en dashes, smart quotes, ellipsis, nbsp,
// and any residual UTF-8 mojibake). Words are never altered. Transforms apply only to TEXT
// between tags — never inside tags, and never inside <script>/<style>/<pre>/<code>.

// --- 1. Mojibake repair (UTF-8 bytes mis-decoded as Windows-1252). Longest first. ---
const MOJIBAKE = [
  ['â€™', "'"],   // â€™  -> '
  ['â€˜', "'"],   // â€˜  -> '
  ['â€œ', '"'],   // â€œ  -> "
  ['â€\u009D', '"'],   // â€  -> ”
  ['â€”', '-'],   // â€”  -> em dash
  ['â€“', '-'],   // â€“  -> en dash
  ['â€\u0094', '-'],   // â€” (cp1252 0x94) -> em dash
  ['â€\u0093', '-'],   // â€“ (cp1252 0x93) -> en dash
  ['â€¦', '...'], // â€¦  -> …
  ['â€', '"'],         // â€   -> stray close quote (catch-all, after the above)
  ['Â ', ' '],         // Â<nbsp> -> space
  ['Â', ''],                // stray Â
];

// --- 2. Real Unicode punctuation -> ASCII ---
const UNICODE = [
  ['—', '-'],   // — em dash         (THE main target)
  ['–', '-'],   // – en dash
  ['―', '-'],   // ― horizontal bar
  ['−', '-'],   // − minus sign
  ['’', "'"],   // ’ right single
  ['‘', "'"],   // ‘ left single
  ['‛', "'"],   // ‛
  ['“', '"'],   // “ left double
  ['”', '"'],   // ” right double
  ['‟', '"'],   // ‟
  ['…', '...'],  // … ellipsis
  [' ', ' '],   // non-breaking space
  [' ', ' '],   // narrow nbsp
  ['​', ''],    // zero-width space
  ['﻿', ''],    // BOM / zero-width no-break
];

function normalizeText(s) {
  for (const [from, to] of MOJIBAKE) s = s.split(from).join(to);
  for (const [from, to] of UNICODE) s = s.split(from).join(to);
  // Collapse runs of spaces/tabs created by dash/space substitutions. Keep newlines.
  s = s.replace(/[ \t]{2,}/g, ' ');
  // Tidy " - " spacing around a dash that ended up glued to words via a smart dash.
  return s;
}

// Split HTML into [text, tag, text, tag, ...]; only transform text segments, and skip
// raw regions where whitespace/punctuation is significant.
const RAW = new Set(['script', 'style', 'pre', 'code', 'textarea']);

export function cleanHtml(html) {
  if (!html) return html;
  const parts = html.split(/(<[^>]+>)/);
  let rawDepth = 0;
  for (let i = 0; i < parts.length; i++) {
    const seg = parts[i];
    if (i % 2 === 1) {
      // a tag — detect entry/exit of raw regions
      const m = /^<\s*(\/?)\s*([a-zA-Z0-9]+)/.exec(seg);
      if (m) {
        const closing = m[1] === '/';
        const name = m[2].toLowerCase();
        if (RAW.has(name)) rawDepth += closing ? -1 : (seg.endsWith('/>') ? 0 : 1);
        if (rawDepth < 0) rawDepth = 0;
      }
      continue;
    }
    if (rawDepth === 0) parts[i] = normalizeText(seg);
  }
  return parts.join('');
}

// Plain-text extraction (for word count / excerpts). Strips tags + decodes a few entities.
export function htmlToText(html) {
  if (!html) return '';
  const t = html
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, ' ')
              .replace(/<[^>]+>/g, ' ')
              .replace(/&nbsp;/gi, ' ')
              .replace(/&amp;/gi, '&')
              .replace(/&lt;/gi, '<').replace(/&gt;/gi, '>')
              .replace(/&#8217;|&rsquo;/gi, "'").replace(/&#8220;|&#8221;|&ldquo;|&rdquo;/gi, '"')
              .replace(/&#8211;|&#8212;|&ndash;|&mdash;/gi, '-')
              .replace(/\s+/g, ' ').trim();
  return t;
}

export function wordCount(html) {
  const t = htmlToText(html);
  return t ? t.split(/\s+/).length : 0;
}

export function readingTimeMin(html) {
  return Math.max(1, Math.ceil(wordCount(html) / 225));
}

// --- self-test ---
if (process.argv[1] && process.argv[1].endsWith('clean-text.mjs')) {
  const cases = [
    ['Study abroad — a dream — needs planning.', 'Study abroad - a dream - needs planning.'],
    ['It’s the “best” choice…', "It's the \"best\" choice..."],
    ['word—word', 'word-word'],
    ['Mojibake: donâ€™t â€œquoteâ€\u009D meâ€¦', 'Mojibake: don\'t "quote" me...'],
    ['<p>Keep <a href="a—b">link</a> — ok</p>', '<p>Keep <a href="a—b">link</a> - ok</p>'], // tag attr untouched
    ['<code>a—b</code> then — x', '<code>a—b</code> then - x'], // code untouched
  ];
  let pass = 0;
  for (const [inp, exp] of cases) {
    const got = cleanHtml(inp);
    const ok = got === exp;
    pass += ok ? 1 : 0;
    console.log(`${ok ? 'PASS' : 'FAIL'}  in=${JSON.stringify(inp)}\n       got=${JSON.stringify(got)}${ok ? '' : `\n       exp=${JSON.stringify(exp)}`}`);
  }
  console.log(`\n${pass}/${cases.length} passed`);
  console.log('wordCount("<p>one two three</p>") =', wordCount('<p>one two three</p>'));
  console.log('readingTime(900 words) =', readingTimeMin('<p>' + 'w '.repeat(900) + '</p>'), 'min');
}
