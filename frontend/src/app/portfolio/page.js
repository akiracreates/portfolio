import { CategorySection } from "@/components/gallery/category-section";
import { PortfolioCategoryTabs } from "@/components/portfolio/portfolio-category-tabs";
import { SectionShell } from "@/components/ui/section-shell";
import { artworkCategories, artworks } from "@/lib/content/artworks";

export const metadata = {
  title: "portfolio | akira",
  description:
    "expanded artwork categories including portraits, animals, and still life.",
};

export default function PortfolioPage() {
  return (
    <div className="content-column-wide stack-section py-10 sm:py-14">
      <SectionShell
        id="portfolio-page"
        eyebrow="full portfolio"
        title="all artwork categories"
        variant="accent"
        template="gallery"
      >
        <PortfolioCategoryTabs categories={artworkCategories} />
        <div className="space-y-16 sm:space-y-20">
          {artworkCategories.map((category) => (
            <CategorySection
              key={category}
              category={category}
              artworks={artworks.filter((a) => a.category === category)}
            />
          ))}
        </div>
      </SectionShell>
    </div>
  );
}
