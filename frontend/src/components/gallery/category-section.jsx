import { ArtworkCard } from "@/components/gallery/artwork-card";

export function CategorySection({ category, artworks }) {
  return (
    <section className="space-y-4">
      <h3 className="text-sm font-medium tracking-wide text-[#f9d6be]">{category}</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {artworks.map((artwork) => (
          <ArtworkCard key={artwork.id} artwork={artwork} />
        ))}
      </div>
    </section>
  );
}
