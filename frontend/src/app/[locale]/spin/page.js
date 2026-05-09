import { SpinPage } from "@/components/pages/spin-page";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isLocale } from "@/lib/i18n/config";
import { buildPageMetadata } from "@/lib/seo/page-metadata";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  const m = dict.metaPages.spin;
  return buildPageMetadata({
    locale,
    pathSuffix: "/spin",
    title: m.title,
    description: m.description,
    imageAlt: dict.hero.imageAlt,
    robots: { index: false, follow: false },
  });
}

export default async function Page({ params }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return <SpinPage dict={dict} locale={locale} />;
}
