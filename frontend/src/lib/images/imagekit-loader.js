import { getImageKitEndpoint } from "@/lib/images/imagekit";

function parseHostname(endpoint) {
  if (!endpoint) return "";
  try {
    return new URL(endpoint).hostname || "";
  } catch {
    return "";
  }
}

/**
 * True when `src` should use the ImageKit loader (responsive `w-*` in `tr`).
 */
export function isImageKitDeliveryUrl(src) {
  if (typeof src !== "string" || !src) return false;
  const ikHost = parseHostname(getImageKitEndpoint());
  if (src.includes("ik.imagekit.io")) return true;
  if (!ikHost) return false;
  try {
    return new URL(src).hostname === ikHost;
  } catch {
    return false;
  }
}

function clampQuality(q) {
  const n = typeof q === "number" && !Number.isNaN(q) ? q : 75;
  return Math.min(92, Math.max(50, Math.round(n)));
}

/**
 * Merge ImageKit `tr` with responsive width + quality for next/image loader.
 * Preserves existing transforms (e.g. `f-jpg`, `q-auto`) unless overridden by width/q rules.
 */
export function imageKitLoader({ src, width, quality }) {
  const endpoint = getImageKitEndpoint();
  if (!endpoint || typeof src !== "string") return src;

  let absolute = src;
  if (!src.startsWith("http")) {
    const cleanPath = src.replace(/^\/+/, "");
    absolute = `${endpoint}/${encodeURI(cleanPath)}`;
  }

  let url;
  try {
    url = new URL(absolute);
  } catch {
    return src;
  }

  const existingTr = url.searchParams.get("tr") || "";
  const parts = existingTr
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);

  const withoutW = parts.filter((p) => !/^w-\d+$/.test(p));
  const hasQAuto = withoutW.includes("q-auto");
  const rest = withoutW.filter((p) => !/^q-\d+$/.test(p) && p !== "q-auto");

  const qPart = hasQAuto ? "q-auto" : `q-${clampQuality(quality)}`;
  const wPx = Math.min(Math.max(16, Math.round(width)), 4096);
  const trMerged = [`w-${wPx}`, qPart, ...rest].join(",");

  url.searchParams.set("tr", trMerged);
  return url.toString();
}
