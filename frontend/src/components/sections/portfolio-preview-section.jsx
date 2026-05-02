import { CategorySection } from "@/components/gallery/category-section";
import { Button } from "@/components/ui/button";
import { SectionShell } from "@/components/ui/section-shell";
import { artworkCategories, artworks } from "@/lib/content/artworks";

export function PortfolioPreviewSection() {
  return (
    <SectionShell
      id="portfolio-preview"
      eyebrow="portfolio preview"
      title="portraits, animals, and still life"
      action={
        <Button as="link" href="/portfolio" variant="secondary">
          full portfolio
        </Button>
      }
    >
      <div className="space-y-8">
        {artworkCategories.map((category) => (
          <CategorySection
            key={category}
            category={category}
            artworks={artworks.filter((artwork) => artwork.category === category).slice(0, 2)}
          />
        ))}
      </div>
    </SectionShell>
  );
}
