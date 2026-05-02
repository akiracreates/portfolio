import { ArtworkCard } from "@/components/gallery/artwork-card";

export function CategorySection({ category, artworks }) {
  return (
    <section className="space-y-4">
      <h3 className="text-base font-medium text-accent-peach">{category}</h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {artworks.map((artwork) => (
          <ArtworkCard key={artwork.id} artwork={artwork} />
        ))}
      </div>
    </section>
  );
}
