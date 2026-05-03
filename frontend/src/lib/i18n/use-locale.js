"use client";

import { useParams, usePathname } from "next/navigation";
import { useCallback } from "react";
import { defaultLocale, isLocale } from "@/lib/i18n/config";

/** Reads the active locale from the [locale] route segment. */
export function useLocale() {
  const params = useParams();
  const raw = params?.locale;
  const value = Array.isArray(raw) ? raw[0] : raw;
  return isLocale(value) ? value : defaultLocale;
}

/** Builds a locale-prefixed href like `/en/about`. Accepts hashes too: `/about#section`. */
export function useLocalizedHref() {
  const locale = useLocale();
  return useCallback(
    (href) => {
      if (!href || typeof href !== "string") return `/${locale}`;
      if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
        return href;
      }
      if (href.startsWith("#")) return href;
      const trimmed = href.startsWith("/") ? href : `/${href}`;
      return `/${locale}${trimmed === "/" ? "" : trimmed}`;
    },
    [locale],
  );
}

/** Returns the current pathname with the locale segment stripped. */
export function usePathWithoutLocale() {
  const pathname = usePathname() ?? "/";
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0 && isLocale(segments[0])) {
    return "/" + segments.slice(1).join("/");
  }
  return pathname;
}
