import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { CategorySection } from "@/components/gallery/category-section";
import { artworkCategories, artworks } from "@/lib/content/artworks";

export function PortfolioPreviewSection() {
  return (
    <Container>
      <Section
        id="portfolio"
        eyebrow="portfolio"
        title="three categories, one steady hand"
        description="portraits, animals, and still life — a small selection from each. browse the full archive for more."
        action={
          <Button as="link" href="/portfolio" variant="outline" size="sm">
            full portfolio
          </Button>
        }
      >
        <div className="space-y-16">
          {artworkCategories.map((category) => (
            <CategorySection
              key={category}
              category={category}
              artworks={artworks
                .filter((a) => a.category === category)
                .slice(0, 3)}
            />
          ))}
        </div>
      </Section>
    </Container>
  );
}
