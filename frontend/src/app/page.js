import { AboutPreviewSection } from "@/components/sections/about-preview-section";
import { CommissionsPreviewSection } from "@/components/sections/commissions-preview-section";
import { ContactFooterSection } from "@/components/sections/contact-footer-section";
import { EasterEggPreviewSection } from "@/components/sections/easter-egg-preview-section";
import { HeroSection } from "@/components/sections/hero-section";
import { PortfolioPreviewSection } from "@/components/sections/portfolio-preview-section";

export default function HomePage() {
  return (
    <div className="space-y-10 pb-8">
      <HeroSection />
      <div className="content-column space-y-10">
        <AboutPreviewSection />
        <PortfolioPreviewSection />
        <CommissionsPreviewSection />
        <EasterEggPreviewSection />
        <ContactFooterSection />
      </div>
    </div>
  );
}
