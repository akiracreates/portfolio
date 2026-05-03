import { AboutPreviewSection } from "@/components/sections/about-preview-section";
import { CommissionsPreviewSection } from "@/components/sections/commissions-preview-section";
import { ContactFooterSection } from "@/components/sections/contact-footer-section";
import { FeaturedWorkSection } from "@/components/sections/featured-work-section";
import { HeroSection } from "@/components/sections/hero-section";
import { PortfolioPreviewSection } from "@/components/sections/portfolio-preview-section";
import { TermsHighlightSection } from "@/components/sections/terms-highlight-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedWorkSection />
      <AboutPreviewSection />
      <PortfolioPreviewSection />
      <CommissionsPreviewSection />
      <TermsHighlightSection />
      <ContactFooterSection />
    </>
  );
}
