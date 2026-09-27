export type LinkKind = 'internal' | 'hash' | 'external' | 'protocol';

export function linkKind(to: string): LinkKind {
  if (to.startsWith('/')) return 'internal';
  if (to.startsWith('#')) return 'hash';
  if (/^(tel|mailto):/i.test(to)) return 'protocol';
  return 'external';
}

/** Canonical URL form used by the original site (trailing slash). */
export function canonicalPath(path: string): string {
  if (path === '/' || path.endsWith('/')) return path;
  return `${path}/`;
}
