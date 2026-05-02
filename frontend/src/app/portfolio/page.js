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
      <main className="w-full p-4 sm:p-6 lg:p-8">
        <SectionShell id="portfolio-page" eyebrow="full portfolio" title="all artwork categories">
          <div className="space-y-10">
            {artworkCategories.map((category) => (
              <CategorySection key={category} category={category} artworks={artworks.filter((item) => item.category === category)} />
            ))}
          </div>
        </SectionShell>
      </main>
    </SiteFrame>
  );
}
