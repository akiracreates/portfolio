import Image from "next/image";

export function ArtworkCard({ artwork }) {
  return (
    <article className="card-frame p-3">
      <div className="relative mb-3 aspect-[4/5] overflow-hidden rounded-md border border-border-soft bg-bg-canvas/60">
        <Image src={artwork.imageSrc} alt={artwork.alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
      </div>
      <h3 className="text-sm font-medium text-text-primary">{artwork.title}</h3>
      <p className="mt-2 text-xs leading-6 text-text-muted">{artwork.artistComment}</p>
    </article>
  );
}
