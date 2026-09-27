import { site } from '../data/site';
import { serializeJsonLd } from '../lib/jsonLd';
import { canonicalPath } from '../lib/links';

interface SeoProps {
  title: string;
  description: string;
  path: string;
  /** Structured data object rendered as JSON-LD. */
  jsonLd?: Record<string, unknown>;
  noIndex?: boolean;
}

/** Document head tags, hoisted into <head> by React 19. */
export function Seo({ title, description, path, jsonLd, noIndex = false }: SeoProps) {
  const fullTitle = title.includes(site.name) ? title : `${title} | ${site.name}`;
  const url = site.url + canonicalPath(path);

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noIndex ? <meta name="robots" content="noindex" /> : <link rel="canonical" href={url} />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {jsonLd && (
        // oxlint-disable-next-line react/no-danger -- JSON-LD must be raw text; serializeJsonLd escapes `<`.
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />
      )}
    </>
  );
}
