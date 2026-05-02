import { SidebarNav } from "@/components/layout/sidebar-nav";
import { SiteFrame } from "@/components/layout/site-frame";
import { AboutPreviewSection } from "@/components/sections/about-preview-section";
import { CommissionsPreviewSection } from "@/components/sections/commissions-preview-section";
import { ContactFooterSection } from "@/components/sections/contact-footer-section";
import { EasterEggPreviewSection } from "@/components/sections/easter-egg-preview-section";
import { HeroSection } from "@/components/sections/hero-section";
import { PortfolioPreviewSection } from "@/components/sections/portfolio-preview-section";
import { siteConfig } from "@/lib/content/site-config";

export default function HomePage() {
  return (
    <SiteFrame>
      <SidebarNav items={siteConfig.navItems} />
      <main className="flex-1 space-y-4 p-3 sm:p-4">
        <div className="content-column space-y-4">
        <HeroSection />
        <AboutPreviewSection />
        <PortfolioPreviewSection />
        <CommissionsPreviewSection />
        <EasterEggPreviewSection />
        <ContactFooterSection />
        </div>
      </main>
    </SiteFrame>
  );
}
