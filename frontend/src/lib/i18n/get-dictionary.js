import { defaultLocale, isLocale } from "@/lib/i18n/config";

const loaders = {
  en: () => import("@/lib/i18n/dictionaries/en.js").then((m) => m.dictionary),
  ru: () => import("@/lib/i18n/dictionaries/ru.js").then((m) => m.dictionary),
};

/**
 * Server-only: load and return the dictionary for a locale.
 * Falls back to the default locale for unknown values.
 */
export async function getDictionary(locale) {
  const safe = isLocale(locale) ? locale : defaultLocale;
  const load = loaders[safe] ?? loaders[defaultLocale];
  return load();
}
