import { ArtworkRow } from "@/components/gallery/artwork-card";
import { Eyebrow } from "@/components/ui/eyebrow";

function categoryAnchorId(category) {
  return `category-${category.toLowerCase().replace(/\s+/g, "-")}`;
}

/**
 * Editorial category layout: image + content rows that alternate per index.
 * Replaces the previous 3-col grid per the spec.
 */
export function CategorySection({
  category,
  artworks,
  locale = "en",
  eyebrow = "collection",
  piecesLabel = "pieces",
  pieceLabel = "piece",
  startIndex = 0,
}) {
  const id = categoryAnchorId(category);
  const count = artworks.length;
  const label = count === 1 ? pieceLabel : piecesLabel;

  return (
    <section id={id} className="scroll-mt-header space-y-8 md:space-y-11">
      <header className="category-banner corner-marks relative flex items-baseline justify-between gap-4 border border-dashed border-border-subtle p-5 md:p-6">
        <div className="space-y-1.5">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h3 className="heading-h2 text-[1.9rem] leading-tight md:text-[2.15rem]">
            {category}
          </h3>
        </div>
        <span className="tilt-chip caption shrink-0 pt-2 text-highlight">
          {count} {label}
        </span>
      </header>
      <div className="space-y-10 md:space-y-14">
        {artworks.map((artwork, index) => (
          <ArtworkRow
            key={artwork.id}
            artwork={artwork}
            index={startIndex + index}
            locale={locale}
          />
        ))}
      </div>
    </section>
  );
}

export { categoryAnchorId };
