import { PortfolioPage } from "@/components/pages/portfolio-page";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isLocale } from "@/lib/i18n/config";
import { buildPageMetadata } from "@/lib/seo/page-metadata";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  const m = dict.metaPages.portfolio;
  return buildPageMetadata({
    locale,
    pathSuffix: "/portfolio",
    title: m.title,
    description: m.description,
    imageAlt: dict.hero.imageAlt,
  });
}

export default async function Page({ params }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return <PortfolioPage dict={dict} locale={locale} />;
}
