interface HtmlProps {
  /** Trusted, build-time article HTML migrated from the UEMS WordPress export. */
  html: string;
  className?: string;
}

/**
 * Renders a migrated blog post's HTML body. The markup is our own content,
 * cleaned and normalised at build time (see scripts that generate src/data/blog/*),
 * so it is trusted; it is never user-supplied at runtime.
 */
export function Html({ html, className }: HtmlProps) {
  return (
    // oxlint-disable-next-line react/no-danger -- trusted build-time article HTML from our own WordPress export.
    <div className={className} dangerouslySetInnerHTML={{ __html: html }} />
  );
}
