import Image from "next/image";

export function ArtworkCard({ artwork }) {
  return (
    <article className="card-inner group overflow-hidden transition-all duration-[var(--duration-base)] hover:-translate-y-1 hover:shadow-[var(--shadow-glow)] hover:border-border-accent">
      <div className="relative aspect-[4/5] overflow-hidden rounded-t-[calc(var(--radius-md)-1px)]">
        <Image
          src={artwork.imageSrc}
          alt={artwork.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="p-3 space-y-1.5">
        <h3 className="text-sm font-medium text-text-primary">{artwork.title}</h3>
        <p className="text-xs leading-relaxed text-text-secondary">{artwork.artistComment}</p>
      </div>
    </article>
  );
}
