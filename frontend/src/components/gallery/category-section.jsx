import { ArtworkCard } from "@/components/gallery/artwork-card";
import { Eyebrow } from "@/components/ui/eyebrow";

function categoryAnchorId(category) {
  return `category-${category.toLowerCase().replace(/\s+/g, "-")}`;
}

export function CategorySection({ category, artworks, eyebrow = "collection" }) {
  const id = categoryAnchorId(category);

  return (
    <section id={id} className="scroll-mt-header space-y-6">
      <header className="flex items-baseline justify-between gap-4">
        <div className="space-y-1.5">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h3 className="heading-h2 text-[1.5rem] leading-tight">{category}</h3>
        </div>
        <span className="caption">
          {artworks.length} {artworks.length === 1 ? "piece" : "pieces"}
        </span>
      </header>
      <div className="grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {artworks.map((artwork) => (
          <ArtworkCard key={artwork.id} artwork={artwork} />
        ))}
      </div>
    </section>
  );
}

export { categoryAnchorId };
