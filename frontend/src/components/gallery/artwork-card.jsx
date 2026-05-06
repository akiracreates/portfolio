"use client";

import { motion, useReducedMotion } from "framer-motion";
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
  const note = pickLocale(artwork.artistComment, locale);
  const width = artwork.width ?? 4;
  const height = artwork.height ?? 5;
  const aspectStyle = { aspectRatio: `${width} / ${height}` };
  const featured = variant === "featured";
  const isFeaturedGalleryCard = featured;

  return (
    <motion.article
      className={`soft-glow-hover group flex h-full flex-col overflow-hidden transition-colors duration-[var(--duration-base)] ${
        featured
          ? "scrap-card featured-piece rounded-[18px] border-border-purple bg-bg-surface-raised/90"
          : "scrap-card rounded-[var(--radius-lg)] hover:border-border-accent"
      } ${className}`.trim()}
      whileHover={reduced ? undefined : { y: -3 }}
      transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
    >
      <ImageFrame
        variant={featured ? "featured" : "art"}
        rounded={featured ? "lg" : "md"}
        className={`relative ${
          featured
            ? "m-4 w-[calc(100%-2rem)] rounded-[14px]"
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
export function ArtworkRow({ artwork, index = 0, locale = "en" }) {
  const reduced = useReducedMotion();
  const title = pickLocale(artwork.title, locale);
  const alt = pickLocale(artwork.alt, locale) || title;
  const note = pickLocale(artwork.artistComment, locale);
  const width = artwork.width ?? 4;
  const height = artwork.height ?? 5;
  const aspectStyle = { aspectRatio: `${width} / ${height}` };
  const pattern = ROW_PATTERNS[index % ROW_PATTERNS.length];

  return (
    <motion.article
      className={`grid items-center gap-7 md:grid-cols-12 md:gap-10 ${pattern.row}`}
      initial={reduced ? false : { opacity: 0, y: 16 }}
      animate={reduced ? false : { opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.2, 0, 0, 1] }}
    >
      <div className={`portfolio-stage ${pattern.image}`}>
        <ImageFrame
          className={`relative z-0 w-full overflow-hidden ${pattern.frame}`}
          style={aspectStyle}
        >
          <SmartImage
            src={artwork.imageSrc}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            imgClassName="object-contain p-3 md:p-4"
          />
        </ImageFrame>
        <div
          className={`portfolio-note scrap-caption mt-4 space-y-3 px-5 py-4 md:mt-0 md:p-5 ${pattern.note}`}
        >
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="heading-h2 text-[1.35rem] leading-tight text-text-primary md:text-[1.5rem]">
              {title}
            </h3>
            <span className="art-tag caption shrink-0 text-accent-2">
              {artwork.category}
            </span>
          </div>
          {note && <p className="body max-w-prose">{note}</p>}
        </div>
      </div>
    </motion.article>
  );
}

const ROW_PATTERNS = [
  {
    row: "",
    image: "md:col-span-8",
    frame: "md:rotate-[-0.35deg]",
    note: "portfolio-note--right md:max-w-[24rem] md:-mt-12 md:ml-auto md:-mr-8",
  },
  {
    row: "md:[&>:first-child]:order-2",
    image: "md:col-span-8 md:col-start-5",
    frame: "md:rotate-[0.45deg]",
    note: "portfolio-note--left md:max-w-[23rem] md:-mt-10 md:mr-auto md:-ml-8",
  },
  {
    row: "",
    image: "md:col-span-9",
    frame: "md:rotate-[0.25deg]",
    note: "portfolio-note--right md:max-w-[22rem] md:-mt-16 md:ml-[14%]",
  },
  {
    row: "md:[&>:first-child]:order-2",
    image: "md:col-span-7 md:col-start-6",
    frame: "md:rotate-[-0.5deg]",
    note: "portfolio-note--left md:max-w-[24rem] md:-mt-6 md:mr-auto md:-ml-12",
  },
  {
    row: "",
    image: "md:col-span-8 md:col-start-2",
    frame: "md:rotate-[0.18deg]",
    note: "portfolio-note--right md:max-w-[25rem] md:-mt-14 md:ml-auto md:mr-6",
  },
];
