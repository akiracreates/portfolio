import { CommissionsPreviewSection } from "@/components/sections/commissions-preview-section";
import { FeaturedWorkSection } from "@/components/sections/featured-work-section";
import { HeroSection } from "@/components/sections/hero-section";
import { WhatToExpectSection } from "@/components/sections/what-to-expect-section";
import { getDictionary } from "@/lib/i18n/get-dictionary";

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
