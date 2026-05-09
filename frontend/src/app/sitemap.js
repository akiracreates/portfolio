import { getSiteUrl } from "@/lib/seo/site-url";

const ROUTES = ["", "/about", "/portfolio", "/commissions", "/commissions/request"];
const LOCALES = ["en", "ru"];

function localePath(locale, segment) {
  return segment === "" ? `/${locale}` : `/${locale}${segment}`;
}

export default function sitemap() {
  const base = getSiteUrl();
  return ROUTES.map((segment) => {
    const languages = Object.fromEntries(
      LOCALES.map((locale) => [locale, `${base}${localePath(locale, segment)}`]),
    );
    const priority =
      segment === ""
        ? 1
        : segment.startsWith("/commissions/request")
          ? 0.65
          : 0.75;

    return {
      url: languages.en,
      changeFrequency: "weekly",
      priority,
      alternates: {
        languages,
      },
    };
  });
}
