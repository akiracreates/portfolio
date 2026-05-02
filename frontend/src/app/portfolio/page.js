import { CategorySection } from "@/components/gallery/category-section";
import { SectionShell } from "@/components/ui/section-shell";
import { artworkCategories, artworks } from "@/lib/content/artworks";

export const metadata = {
  title: "portfolio | akira",
  description:
    "expanded artwork categories including portraits, animals, and still life.",
};

export default function PortfolioPage() {
  return (
    <div className="content-column space-y-8 py-10 sm:py-14">
      <SectionShell
        id="portfolio-page"
        eyebrow="full portfolio"
        title="all artwork categories"
        variant="accent"
      >
        <div className="space-y-10">
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
