import { imagekitUrl } from "@/lib/images/imagekit";
import { getSiteUrl } from "@/lib/seo/site-url";

const OG_LOCALE_BY_SEGMENT = {
  en: "en_US",
  ru: "ru_RU",
};

/** Portrait → ~1.91:1 crop for OG/Twitter (`ar-1.91-1` is ImageKit’s landscape OG ratio). */
function imageKitOgPortraitUrl() {
  return imagekitUrl("images/portraits/self", [
    "ar-1.91-1",
    "w-1200",
    "fo-auto",
    "q-85",
    "f-auto",
  ]);
}

/**
 * Absolute OG/Twitter image URL plus real dimensions (ImageKit crop or square favicon fallback).
 */
export function resolveOgImageForMetadata() {
  const ik = imageKitOgPortraitUrl();
  if (ik) return { url: ik, width: 1200, height: 630 };
  const base = getSiteUrl();
  return { url: `${base}/icons/icon-512.png`, width: 512, height: 512 };
}

/** Stable OG / Twitter preview URL (never empty when NEXT_PUBLIC_APP_URL is set). */
export function getDefaultOgImageUrl() {
  return resolveOgImageForMetadata().url;
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
  const en = `${base}/en${suffix}`;
  const ru = `${base}/ru${suffix}`;
  return {
    "x-default": en,
    en,
    ru,
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
  const { url: ogUrl, width: ogW, height: ogH } = resolveOgImageForMetadata();
  const ogLocale = OG_LOCALE_BY_SEGMENT[locale] ?? OG_LOCALE_BY_SEGMENT.en;
  const ogAlternateLocale =
    locale === "en" ? OG_LOCALE_BY_SEGMENT.ru : OG_LOCALE_BY_SEGMENT.en;

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
      locale: ogLocale,
      alternateLocale: [ogAlternateLocale],
      images: [{ url: ogUrl, width: ogW, height: ogH, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogUrl],
    },
  };
}
