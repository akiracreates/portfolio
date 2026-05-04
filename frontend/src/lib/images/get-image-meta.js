import meta from "./image-meta.json";

const DEFAULT_DIMENSIONS = { width: 4, height: 5 };

/**
 * Resolves natural width/height for an ImageKit asset by its bare path
 * (e.g. "images/portraits/self"). Falls back to a reasonable 4:5 default
 * if the cache doesn't have the path yet.
 */
export function getImageMeta(path) {
  if (!path) return DEFAULT_DIMENSIONS;
  const m = meta[path];
  if (!m || typeof m.width !== "number" || typeof m.height !== "number") {
    return DEFAULT_DIMENSIONS;
  }
  return { width: m.width, height: m.height };
}
