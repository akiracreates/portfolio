import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ImageFrame } from "@/components/ui/image-frame";
import { SmartImage } from "@/components/ui/smart-image";
import { pickLocale } from "@/lib/i18n/config";

export function ArtworkCard({
  artwork,
  locale = "en",
  showFeaturedBadge = true,
  featuredLabel = "featured",
  variant = "default",
  className = "",
}) {
  const title = pickLocale(artwork.title, locale);
  const alt = pickLocale(artwork.alt, locale) || title;
  const note = pickLocale(artwork.artistComment, locale);
  const width = artwork.width ?? 4;
  const height = artwork.height ?? 5;
  const aspectStyle = { aspectRatio: `${width} / ${height}` };
  const featured = variant === "featured";
  const isFeaturedGalleryCard = featured;

  return (
    <article
      className={`group flex h-full flex-col overflow-hidden transition-transform duration-[var(--duration-base)] hover:-translate-y-[3px] ${
        featured
          ? "rounded-[18px]"
          : "soft-glow-hover scrap-card rounded-[var(--radius-lg)] hover:border-border-accent"
      } ${className}`.trim()}
    >
      <ImageFrame
        variant={featured ? "featured" : "art"}
        rounded={featured ? "lg" : "md"}
        singleFrame
        className={`relative ${
          featured
            ? "featured-image-frame w-full rounded-[14px]"
            : "m-3 mb-0 w-[calc(100%-1.5rem)] rounded-[var(--radius-md)]"
        }`}
        style={aspectStyle}
      >
        <SmartImage
          src={artwork.imageSrc}
          alt={alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          imgClassName={`object-contain transition-transform duration-[var(--duration-slow)] group-hover:scale-[1.015] ${
            featured ? "p-2 md:p-5" : "p-3"
          }`}
        />
        {showFeaturedBadge && artwork.featured && (
          <div className={`absolute z-10 ${featured ? "left-4 top-4" : "left-3 top-3"}`}>
            <Badge variant="highlight" size="sm">
              {featuredLabel}
            </Badge>
          </div>
        )}
      </ImageFrame>

      {!isFeaturedGalleryCard && (
        <div className="flex flex-1 flex-col gap-2 p-5">
          <h3 className="heading-h3 text-[1rem] leading-snug text-text-primary">
            {title}
          </h3>
          {note ? (
            <p className="body-sm text-text-secondary">{note}</p>
          ) : null}
        </div>
      )}
    </article>
  );
}

/**
 * Editorial row variant — image on one side, content on the other,
 * alternates per `index` (even = image left, odd = image right).
 */
export function ArtworkRow({
  artwork,
  index = 0,
  locale = "en",
  enableSecretSpin = false,
}) {
  const title = pickLocale(artwork.title, locale);
  const alt = pickLocale(artwork.alt, locale) || title;
  const note = pickLocale(artwork.artistComment, locale);
  const width = artwork.width ?? 4;
  const height = artwork.height ?? 5;
  const aspectStyle = { aspectRatio: `${width} / ${height}` };
  const frameClass = FRAME_TILTS[index % FRAME_TILTS.length];
  const noteClass = getDesktopNoteClass(index);

  const imageFrame = (
    <ImageFrame
      className={`relative z-0 w-full overflow-hidden ${frameClass}`}
      style={aspectStyle}
    >
      <SmartImage
        src={artwork.imageSrc}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 55vw"
        imgClassName="object-contain p-2 md:p-4"
      />
    </ImageFrame>
  );

  return (
    <article className="cascade-row cascade-row-motion">
      <div className="portfolio-stage relative min-w-0 w-full">
        {enableSecretSpin ? (
          <Link
            href={`/${locale}/spin`}
            prefetch={false}
            className="block cursor-pointer focus-visible-ring rounded-[var(--radius-md)]"
            aria-label={
              locale === "ru"
                ? "открыть скрытое колесо студии"
                : "open secret studio wheel"
            }
          >
            {imageFrame}
          </Link>
        ) : (
          imageFrame
        )}
        <div
          className={`portfolio-note scrap-caption mt-2 space-y-1.5 px-2.5 py-2 md:mt-0 md:space-y-2 md:px-4 md:py-3 ${noteClass}`}
        >
          <h3 className="heading-h2 text-[1.05rem] leading-tight text-text-primary md:text-[1.1rem]">
            {title}
          </h3>
          {note ? (
            <p className="body-sm min-w-0 max-w-[min(100%,42ch)] max-md:text-[0.8125rem] max-md:leading-relaxed md:max-w-[min(100%,40ch)]">
              {note}
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}

const FRAME_TILTS = [
  "md:rotate-[-0.7deg]",
  "md:rotate-[0.55deg]",
  "md:rotate-[0.3deg]",
  "md:rotate-[-0.45deg]",
];

const NOTE_CORNERS = ["br", "tl", "tr", "bl"];

function cornerShape(corner) {
  return {
    vertical: corner[0] === "t" ? "top" : "bottom",
    horizontal: corner[1] === "l" ? "left" : "right",
  };
}

function isValidCorner(corner, leftCorner, aboveCorner) {
  const current = cornerShape(corner);

  if (leftCorner) {
    const left = cornerShape(leftCorner);
    const touchSameRowSeam =
      left.horizontal === "right" &&
      current.horizontal === "left" &&
      left.vertical === current.vertical;
    if (touchSameRowSeam) return false;
  }

  if (aboveCorner) {
    const above = cornerShape(aboveCorner);
    const touchSameColumnSeam =
      above.vertical === "bottom" &&
      current.vertical === "top" &&
      above.horizontal === current.horizontal;
    if (touchSameColumnSeam) return false;
  }

  return true;
}

function getDesktopNoteClass(index) {
  const columns = 2;
  const placements = [];

  for (let i = 0; i <= index; i += 1) {
    const hasLeft = i % columns !== 0;
    const leftCorner = hasLeft ? placements[i - 1] : null;
    const aboveCorner = i >= columns ? placements[i - columns] : null;

    const selected =
      NOTE_CORNERS.find((corner) => isValidCorner(corner, leftCorner, aboveCorner)) ??
      NOTE_CORNERS[i % NOTE_CORNERS.length];

    placements.push(selected);
  }

  return `portfolio-note--${placements[index]}`;
}
