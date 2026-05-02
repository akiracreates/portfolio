import { PageNav } from "@/components/layout/page-nav";
import { SiteFrame } from "@/components/layout/site-frame";
import { CategorySection } from "@/components/gallery/category-section";
import { SectionShell } from "@/components/ui/section-shell";
import { artworkCategories, artworks } from "@/lib/content/artworks";

export const metadata = {
  title: "portfolio | akira",
  description: "expanded artwork categories including portraits, animals, and still life.",
};

export default function PortfolioPage() {
  return (
    <SiteFrame>
      <main className="w-full p-3 sm:p-4">
        <PageNav />
        <div className="content-column">
        <SectionShell id="portfolio-page" eyebrow="full portfolio" title="all artwork categories">
          <div className="space-y-6">
            {artworkCategories.map((category) => (
              <CategorySection key={category} category={category} artworks={artworks.filter((item) => item.category === category)} />
            ))}
          </div>
        </SectionShell>
        </div>
      </main>
    </SiteFrame>
  );
}
