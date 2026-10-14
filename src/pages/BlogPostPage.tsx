import { HeroBackdrop } from '../components/HeroBackdrop';
import { Html } from '../components/Html';
import { Reveal } from '../components/Reveal';
import { Section } from '../components/Section';
import { Seo } from '../components/Seo';
import { SmartLink } from '../components/SmartLink';
import { blogIndex } from '../data/blog';
import type { BlogListItem, BlogPostData } from '../data/blog/types';
import { site } from '../data/site';
import { cx } from '../lib/cx';
import s from './BlogPostPage.module.css';

function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

/** Up to three other posts sharing a category, newest first; backfilled with recent posts. */
function relatedPosts(post: BlogPostData): BlogListItem[] {
  const cats = new Set(post.categories.map((c) => c.slug));
  const others = blogIndex.filter((p) => p.slug !== post.slug);
  const sameCat = others.filter((p) => p.category && cats.has(p.category));
  const seen = new Set(sameCat.map((p) => p.slug));
  const backfill = others.filter((p) => !seen.has(p.slug));
  return [...sameCat, ...backfill].slice(0, 3);
}

function buildJsonLd(post: BlogPostData, url: string) {
  const image = post.featuredImage ? `${site.url}${post.featuredImage}` : `${site.url}/og-image.jpg`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.seo.description,
        image,
        datePublished: post.date,
        dateModified: post.modified || post.date,
        author: { '@type': 'Organization', name: post.author || site.name, url: site.url },
        publisher: {
          '@type': 'Organization',
          name: site.name,
          logo: { '@type': 'ImageObject', url: `${site.url}/images/brand-logo.webp` },
        },
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
          { '@type': 'ListItem', position: 2, name: 'Blogs', item: `${site.url}/blogs/` },
          { '@type': 'ListItem', position: 3, name: post.title, item: url },
        ],
      },
    ],
  };
}

export function BlogPostPage({ post }: { post: BlogPostData }) {
  const path = `/${post.slug}`;
  const url = `${site.url}/${post.slug}/`;
  const related = relatedPosts(post);

  return (
    <>
      <Seo title={post.seo.title} description={post.seo.description} path={path} jsonLd={buildJsonLd(post, url)} />

      <article className={s.article}>
        <header className={s.hero} aria-labelledby="page-title">
          <HeroBackdrop />
          <div className={cx('container', s.heroInner)}>
            <nav aria-label="Breadcrumb" className={s.crumbs}>
              <ol role="list">
                <li>
                  <SmartLink to="/">Home</SmartLink>
                </li>
                <li>
                  <SmartLink to="/blogs">Blogs</SmartLink>
                </li>
                <li>
                  <span aria-current="page">{post.title}</span>
                </li>
              </ol>
            </nav>

            {post.categories.length > 0 && (
              <ul role="list" className={s.chips}>
                {post.categories.map((c) => (
                  <li key={c.slug} className={s.chip}>
                    {c.name}
                  </li>
                ))}
              </ul>
            )}

            <h1 id="page-title" className={cx('t-display', s.title)}>
              {post.title}
            </h1>

            <p className={s.meta}>
              <span className={s.author}>{post.author || site.name}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden="true">·</span>
              <span>{post.readingTime} min read</span>
            </p>
          </div>

          {post.featuredImage && (
            <div className={cx('container', s.featuredWrap)}>
              <img
                className={s.featured}
                src={post.featuredImage}
                alt={post.featuredImageAlt || post.title}
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </div>
          )}
        </header>

        <Section tight labelledBy="page-title">
          <Html html={post.html} className={s.prose} />

          {post.tags.length > 0 && (
            <div className={s.tags}>
              <span className={s.tagsLabel}>Tags</span>
              <ul role="list">
                {post.tags.map((t) => (
                  <li key={t.slug}>{t.name}</li>
                ))}
              </ul>
            </div>
          )}

          <aside className={s.authorBox} aria-label="About the author">
            <div className={s.authorAvatar} aria-hidden="true">
              {(post.author || site.name).charAt(0)}
            </div>
            <div>
              <p className={s.authorName}>{post.author || site.name}</p>
              <p className={s.authorBio}>
                Part of the {site.name} team, guiding students through study abroad, career counselling and migration.{' '}
                <SmartLink to="/about-us" className="inline-link">
                  About UEMS Ventures
                </SmartLink>
              </p>
            </div>
          </aside>
        </Section>
      </article>

      {related.length > 0 && (
        <Section tone="muted" labelledBy="related-title">
          <h2 id="related-title" className={cx('t-h2-compact', s.relatedHeading)}>
            Related articles
          </h2>
          <ul role="list" className={s.related}>
            {related.map((p, i) => (
              <Reveal as="li" key={p.slug} delay={(i % 3) * 70}>
                <article className={s.relatedCard}>
                  {p.featuredImage && (
                    <SmartLink to={`/${p.slug}`} className={s.relatedMedia} tabIndex={-1} aria-hidden="true">
                      <img src={p.featuredImage} alt="" loading="lazy" decoding="async" />
                    </SmartLink>
                  )}
                  <p className={s.relatedMeta}>
                    {p.category ?? 'Blog'} · {p.readingTime} min read
                  </p>
                  <h3 className={s.relatedTitle}>
                    <SmartLink to={`/${p.slug}`}>{p.title}</SmartLink>
                  </h3>
                  <p className={s.relatedExcerpt}>{p.excerpt}</p>
                </article>
              </Reveal>
            ))}
          </ul>
        </Section>
      )}
    </>
  );
}
