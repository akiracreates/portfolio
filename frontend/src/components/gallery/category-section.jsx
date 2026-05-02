import { ArtworkCard } from "@/components/gallery/artwork-card";

export function CategorySection({ category, artworks }) {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <h3 className="text-sm font-medium tracking-wide text-secondary">{category}</h3>
        <div className="flex-1 h-px bg-border-subtle" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {artworks.map((artwork) => (
          <ArtworkCard key={artwork.id} artwork={artwork} />
        ))}
      </div>
    </section>
  );
}
