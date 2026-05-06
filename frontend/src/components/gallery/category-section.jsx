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
  enableSecretSpin = false,
}) {
  const id = categoryAnchorId(category);
  const count = artworks.length;
  const label = count === 1 ? pieceLabel : piecesLabel;

  const categoryIntro = categoryIntroCopy[category] ?? categoryIntroCopy.default;

  return (
    <section id={id} className="scroll-mt-header space-y-6 md:space-y-8">
      <header className="category-banner corner-marks relative flex items-baseline justify-between gap-4 border border-dashed border-border-subtle p-5 md:p-6">
        <div className="space-y-1.5">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h3 className="heading-h2 text-[1.9rem] leading-tight md:text-[2.15rem]">
            {category}
          </h3>
          <p className="body-sm max-w-[52ch]">{categoryIntro}</p>
        </div>
        <span className="tilt-chip caption shrink-0 pt-2 text-highlight">
          {count} {label}
        </span>
      </header>
      <div className="cascade-artworks">
        {artworks.map((artwork, index) => (
          <ArtworkRow
            key={artwork.id}
            artwork={artwork}
            index={startIndex + index}
            locale={locale}
            enableSecretSpin={
              enableSecretSpin &&
              category.toLowerCase() === "animals" &&
              artwork.path === "images/animals/silly_kitty"
            }
          />
        ))}
      </div>
    </section>
  );
}

const categoryIntroCopy = {
  portraits: "intimate studies of expression, memory, and quiet mood.",
  animals: "character-driven companions with soft edges and warm contrast.",
  landscapes: "atmospheric places focused on light, weather, and distance.",
  "still life": "small everyday objects arranged as calm narrative moments.",
  default: "a curated sequence of recent pieces from this collection.",
};

export { categoryAnchorId };
