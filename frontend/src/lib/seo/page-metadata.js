import { imagekitUrl } from "@/lib/images/imagekit";
import { getSiteUrl } from "@/lib/seo/site-url";

/** Stable OG / Twitter preview (hero portrait, capped width). */
export function getDefaultOgImageUrl() {
  return imagekitUrl("images/portraits/self", ["w-1200", "q-85", "f-auto"]);
}

function normalizedSuffix(pathAfterLocale) {
  if (pathAfterLocale == null || pathAfterLocale === "") return "";
  const s = String(pathAfterLocale);
  if (s === "/") return "";
  return s.startsWith("/") ? s : `/${s}`;
}

export function localeAlternates(pathAfterLocale) {
  const base = getSiteUrl();
  const suffix = normalizedSuffix(pathAfterLocale);
  return {
    en: `${base}/en${suffix}`,
    ru: `${base}/ru${suffix}`,
  };
}

export function canonicalUrl(locale, pathAfterLocale) {
  const base = getSiteUrl();
  const suffix = normalizedSuffix(pathAfterLocale);
  return `${base}/${locale}${suffix}`;
}

/**
 * Per-route metadata with canonical, hreflang alternates, OG/Twitter images.
 */
export function buildPageMetadata({
  locale,
  pathSuffix,
  title,
  description,
  imageAlt = "akira portfolio",
  robots,
}) {
  const canonical = canonicalUrl(locale, pathSuffix);
  const og = getDefaultOgImageUrl();

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: localeAlternates(pathSuffix ?? ""),
    },
    ...(robots ? { robots } : {}),
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      locale,
      images: [{ url: og, width: 1200, height: 630, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [og],
    },
  };
}
