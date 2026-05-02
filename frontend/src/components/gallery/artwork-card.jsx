import Image from "next/image";

export function ArtworkCard({ artwork }) {
  return (
    <article className="inner-card p-2">
      <div className="relative mb-2 aspect-[4/5] overflow-hidden rounded-[0.3rem] border border-[#5d577f] bg-bg-canvas/60">
        <Image src={artwork.imageSrc} alt={artwork.alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
      </div>
      <h3 className="text-xs font-medium text-[#f5e5f0]">{artwork.title}</h3>
      <p className="mt-1 text-[0.7rem] leading-5 text-text-muted">{artwork.artistComment}</p>
    </article>
  );
}
