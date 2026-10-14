import { blogIndex } from './blog';

export interface BlogPost {
  readonly title: string;
  readonly excerpt: string;
  /** Internal path to the post page (/<slug>). */
  readonly url: string;
  /** Local featured-image path shown on the card. */
  readonly image: string;
  /** Short display date, e.g. 'Apr 20'. */
  readonly date?: string;
}

function displayDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  return Number.isNaN(d.getTime()) ? '' : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

/** Blog cards for the listing and home teaser, newest first (derived from the migrated posts). */
export const blogPosts: readonly BlogPost[] = blogIndex.map((p) => ({
  title: p.title,
  excerpt: p.excerpt,
  url: `/${p.slug}`,
  image: p.featuredImage ?? '/og-image.jpg',
  date: displayDate(p.date),
}));
