import { describe, expect, it } from 'vitest';
import { cx } from '../../src/lib/cx';
import { serializeJsonLd } from '../../src/lib/jsonLd';
import { canonicalPath, linkKind } from '../../src/lib/links';
import { sectionTones } from '../../src/lib/sectionTones';

describe('linkKind', () => {
  it.each([
    ['/about-us', 'internal'],
    ['#contact', 'hash'],
    ['tel:+919999999999', 'protocol'],
    ['MAILTO:info@example.com', 'protocol'],
    ['https://www.ielts.org', 'external'],
  ] as const)('classifies %s as %s', (to, kind) => {
    expect(linkKind(to)).toBe(kind);
  });
});

describe('canonicalPath', () => {
  it('adds a trailing slash to inner paths', () => {
    expect(canonicalPath('/about-us')).toBe('/about-us/');
  });

  it('leaves the root and already-canonical paths alone', () => {
    expect(canonicalPath('/')).toBe('/');
    expect(canonicalPath('/career-guidance/career-assessment-test/')).toBe('/career-guidance/career-assessment-test/');
  });
});

describe('serializeJsonLd', () => {
  it('produces valid JSON that round-trips', () => {
    const data = { '@type': 'Organization', name: 'UEMS Ventures' };
    expect(JSON.parse(serializeJsonLd(data))).toEqual(data);
  });

  it('escapes "<" so a value cannot close the script element', () => {
    const out = serializeJsonLd({ name: '</script><script>alert(1)</script>' });
    expect(out).not.toContain('<');
    expect(JSON.parse(out).name).toBe('</script><script>alert(1)</script>');
  });
});

describe('sectionTones', () => {
  it('alternates light and muted, starting light', () => {
    expect(sectionTones([{}, {}, {}])).toEqual(['light', 'muted', 'light']);
  });

  it('respects explicit tones and continues alternating from them', () => {
    expect(sectionTones([{}, { tone: 'dark' }, {}, { tone: 'light' }, {}])).toEqual([
      'light',
      'dark',
      'light',
      'light',
      'muted',
    ]);
  });

  it('returns an empty list for no sections', () => {
    expect(sectionTones([])).toEqual([]);
  });
});

describe('cx', () => {
  it('joins truthy class names only', () => {
    expect(cx('a', false, undefined, null, 'b')).toBe('a b');
  });
});
