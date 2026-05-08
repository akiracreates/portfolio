"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
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
  const reduced = useReducedMotion();
  const title = pickLocale(artwork.title, locale);
  const alt = pickLocale(artwork.alt, locale) || title;
  const note =
    locale === "ru"
      ? "заметка под работой пока в разработке."
      : "notes under art are still under construction.";
  const width = artwork.width ?? 4;
  const height = artwork.height ?? 5;
  const aspectStyle = { aspectRatio: `${width} / ${height}` };
  const featured = variant === "featured";
  const isFeaturedGalleryCard = featured;

  return (
    <motion.article
      className={`group flex h-full flex-col overflow-hidden transition-colors duration-[var(--duration-base)] ${
        featured
          ? "rounded-[18px]"
          : "soft-glow-hover scrap-card rounded-[var(--radius-lg)] hover:border-border-accent"
      } ${className}`.trim()}
      whileHover={reduced ? undefined : { y: -3 }}
      transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
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
            featured ? "p-4 md:p-5" : "p-3"
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
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="heading-h3 text-[1rem] leading-snug text-text-primary">
              {title}
            </h3>
            <span className="art-tag caption shrink-0 text-accent-2">
              {artwork.category}
            </span>
          </div>
          {note && (
            <p className="body-sm line-clamp-2 text-text-secondary">
              {note}
            </p>
          )}
        </div>
      )}
    </motion.article>
  );
}

/**
 * Editorial row variant — image on one side, content on the other,
 * alternates per `index` (even = image left, odd = image right).
 *
 * Uses the artwork's natural aspect ratio (from `artwork.width`/`artwork.height`)
 * so portfolio rows never crop.
 *
 * Animates on mount (no scroll-gating) — see plan note about whileInView race.
 */
export function ArtworkRow({
  artwork,
  index = 0,
  locale = "en",
  enableSecretSpin = false,
}) {
  const reduced = useReducedMotion();
  const router = useRouter();
  const title = pickLocale(artwork.title, locale);
  const alt = pickLocale(artwork.alt, locale) || title;
  const note =
    locale === "ru"
      ? "заметка под работой пока в разработке."
      : "notes under art are still under construction.";
  const width = artwork.width ?? 4;
  const height = artwork.height ?? 5;
  const aspectStyle = { aspectRatio: `${width} / ${height}` };
  const frameClass = FRAME_TILTS[index % FRAME_TILTS.length];
  const noteClass = getDesktopNoteClass(index);

  return (
    <motion.article
      className="cascade-row"
      initial={reduced ? false : { opacity: 0, y: 16 }}
      animate={reduced ? false : { opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.2, 0, 0, 1] }}
    >
      <div className="portfolio-stage relative min-w-0 w-full">
        <ImageFrame
          className={`relative z-0 w-full overflow-hidden ${frameClass}`}
          style={aspectStyle}
          onClick={
            enableSecretSpin
              ? () => {
                  router.push(`/${locale}/spin`);
                }
              : undefined
          }
        >
          <SmartImage
            src={artwork.imageSrc}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 55vw"
            imgClassName="object-contain p-3 md:p-4"
          />
        </ImageFrame>
        <div className={`portfolio-note scrap-caption space-y-2 px-4 py-3 ${noteClass}`}>
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="heading-h2 text-[1.1rem] leading-tight text-text-primary">
              {title}
            </h3>
            <span className="art-tag caption shrink-0 text-accent-2">
              {artwork.category}
            </span>
          </div>
          {note && <p className="body-sm max-w-[22ch]">{note}</p>}
        </div>
      </div>
    </motion.article>
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
