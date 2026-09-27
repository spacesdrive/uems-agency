/**
 * Serializes structured data for an inline `<script type="application/ld+json">`.
 * `<` is escaped so no string value can close the script element early.
 */
export function serializeJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
