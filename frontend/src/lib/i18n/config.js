export const locales = ["en", "ru"];
export const defaultLocale = "en";

/** Middleware forwards URL locale so `<html lang>` matches the path (not only the cookie). */
export const LOCALE_REQUEST_HEADER = "x-akira-locale";

/** Middleware forwards pathname for SEO JSON-LD (WebPage, breadcrumbs) without prop drilling. */
export const PATHNAME_REQUEST_HEADER = "x-akira-pathname";

export function isLocale(value) {
  return locales.includes(value);
}

/** maps a locale to its currency code used in pricing data */
export const currencyByLocale = {
  en: "usd",
  ru: "rub",
};

/** formats a price for display, given a locale */
export function formatPrice(price, locale) {
  if (!price) return "";
  if (locale === "ru") {
    return `${Number(price.rub).toLocaleString("ru-RU")} ₽`;
  }
  return `$${Number(price.usd).toLocaleString("en-US")}`;
}

/** picks the field for the active locale, with EN fallback */
export function pickLocale(field, locale) {
  if (!field) return "";
  if (typeof field === "string") return field;
  return field[locale] ?? field.en ?? "";
}
