import { AboutPage } from "@/components/pages/about-page";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isLocale } from "@/lib/i18n/config";
import { buildPageMetadata } from "@/lib/seo/page-metadata";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  const m = dict.metaPages.about;
  return buildPageMetadata({
    locale,
    pathSuffix: "/about",
    title: m.title,
    description: m.description,
    imageAlt: dict.hero.imageAlt,
  });
}

export default async function Page({ params }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return <AboutPage dict={dict} locale={locale} />;
}
