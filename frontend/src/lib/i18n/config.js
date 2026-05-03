export const locales = ["en", "ru"];
export const defaultLocale = "en";

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
