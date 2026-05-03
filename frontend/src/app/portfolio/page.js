import { Container } from "@/components/ui/container";
import { CategorySection } from "@/components/gallery/category-section";
import { PageHeader } from "@/components/layout/page-header";
import { PortfolioCategoryTabs } from "@/components/portfolio/portfolio-category-tabs";
import { artworkCategories, artworks } from "@/lib/content/artworks";

export const metadata = {
  title: "portfolio | akira",
  description:
    "expanded artwork categories — portraits, animals, and still life.",
};

export default function PortfolioPage() {
  return (
    <>
      <PageHeader
        id="portfolio"
        eyebrow="portfolio"
        title="all artwork, sorted by category."
        description={`${artworks.length} pieces across ${artworkCategories.length} collections. tap a category to jump.`}
      />

      <Container className="pt-4 pb-16 md:pb-24">
        <PortfolioCategoryTabs categories={artworkCategories} />
        <div className="space-y-20 md:space-y-24">
          {artworkCategories.map((category) => (
            <CategorySection
              key={category}
              category={category}
              artworks={artworks.filter((a) => a.category === category)}
            />
          ))}
        </div>
      </Container>
    </>
  );
}
