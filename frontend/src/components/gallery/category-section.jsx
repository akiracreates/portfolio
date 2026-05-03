import { ArtworkCard } from "@/components/gallery/artwork-card";

function categoryAnchorId(category) {
  return `category-${category.toLowerCase().replace(/\s+/g, "-")}`;
}

export function CategorySection({ category, artworks }) {
  const id = categoryAnchorId(category);

  return (
    <section id={id} className="scroll-mt-28 space-y-6">
      <header className="space-y-2">
        <p className="label-sm title-underline">collection</p>
        <h3 className="heading-display heading-sm text-text-primary">{category}</h3>
        <div className="max-w-sm border-b border-dashed border-primary/25 pb-1" />
      </header>
      <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {artworks.map((artwork, index) => (
          <ArtworkCard key={artwork.id} artwork={artwork} featured={index === 0} />
        ))}
      </div>
    </section>
  );
}

export { categoryAnchorId };
