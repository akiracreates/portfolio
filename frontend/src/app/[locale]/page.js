import { CommissionsPreviewSection } from "@/components/sections/commissions-preview-section";
import { FeaturedWorkSection } from "@/components/sections/featured-work-section";
import { HeroSection } from "@/components/sections/hero-section";
import { WhatToExpectSection } from "@/components/sections/what-to-expect-section";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isLocale } from "@/lib/i18n/config";
import { buildPageMetadata } from "@/lib/seo/page-metadata";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  const m = dict.metaPages.home;
  const meta = buildPageMetadata({
    locale,
    pathSuffix: "",
    title: "akiracreates",
    description: m.description,
    imageAlt: dict.hero.imageAlt,
  });
  meta.title = { absolute: "akiracreates" };
  return meta;
}

export default async function HomePage({ params }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <>
      <HeroSection dict={dict} locale={locale} />
      <FeaturedWorkSection dict={dict} locale={locale} />
      <CommissionsPreviewSection dict={dict} locale={locale} />
      <WhatToExpectSection dict={dict} locale={locale} />
    </>
  );
}
