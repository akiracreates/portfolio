/**
 * Canonical site origin for metadata, sitemap, robots, and JSON-LD.
 * Set NEXT_PUBLIC_APP_URL in production (e.g. https://example.com).
 */
export function getSiteUrl() {
  const raw =
    process.env.NEXT_PUBLIC_APP_URL?.trim() || "http://localhost:3000";
  return raw.replace(/\/+$/, "");
}

/**
 * Safe constructor for Metadata API `metadataBase`.
 */
export function getMetadataBaseUrl() {
  try {
    return new URL(`${getSiteUrl()}/`);
  } catch {
    return new URL("http://localhost:3000/");
  }
}
