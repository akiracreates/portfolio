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
}) {
  const reduced = useReducedMotion();
  const title = pickLocale(artwork.title, locale);
  const alt = pickLocale(artwork.alt, locale) || title;
  const note = pickLocale(artwork.artistComment, locale);
  const width = artwork.width ?? 4;
  const height = artwork.height ?? 5;
  const aspectStyle = { aspectRatio: `${width} / ${height}` };

  return (
    <motion.article
      className="scrap-card soft-glow-hover group flex h-full flex-col overflow-hidden transition-colors duration-[var(--duration-base)] hover:border-border-accent"
      whileHover={reduced ? undefined : { y: -3 }}
      transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
    >
      <ImageFrame
        rounded="md"
        className="relative m-3 mb-0 w-[calc(100%-1.5rem)] rounded-[var(--radius-md)]"
        style={aspectStyle}
      >
        <SmartImage
          src={artwork.imageSrc}
          alt={alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          imgClassName="object-contain p-3 transition-transform duration-[var(--duration-slow)] group-hover:scale-[1.015]"
        />
        {showFeaturedBadge && artwork.featured && (
          <div className="absolute left-3 top-3 z-10">
            <Badge variant="highlight" size="sm">
              {featuredLabel}
            </Badge>
          </div>
        )}
      </ImageFrame>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="heading-h3 text-[1rem] leading-snug text-text-primary">
            {title}
          </h3>
          <span className="caption shrink-0 text-accent-2">{artwork.category}</span>
        </div>
        {note && (
          <p className="body-sm line-clamp-2 text-text-secondary">{note}</p>
        )}
      </div>
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
      <div className={pattern.image}>
        <ImageFrame
          className={`relative w-full overflow-hidden ${pattern.frame}`}
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
      </div>
      <div className={`scrap-note space-y-3 p-5 md:p-6 ${pattern.text}`}>
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="heading-h2 text-[1.5rem] leading-tight text-text-primary">
            {title}
          </h3>
          <span className="caption shrink-0 text-accent-2">{artwork.category}</span>
        </div>
        {note && <p className="body max-w-prose">{note}</p>}
      </div>
    </motion.article>
  );
}

const ROW_PATTERNS = [
  {
    row: "",
    image: "md:col-span-7",
    text: "md:col-span-5 md:translate-y-4",
    frame: "md:rotate-[-0.35deg]",
  },
  {
    row: "md:[&>:first-child]:order-2",
    image: "md:col-span-6 md:col-start-7",
    text: "md:col-span-5 md:col-start-1 md:row-start-1 md:-translate-y-5",
    frame: "md:rotate-[0.45deg]",
  },
  {
    row: "",
    image: "md:col-span-8",
    text: "md:col-span-4 md:-translate-x-4 md:translate-y-8",
    frame: "md:rotate-[0.25deg]",
  },
  {
    row: "md:[&>:first-child]:order-2",
    image: "md:col-span-7 md:col-start-6",
    text: "md:col-span-5 md:col-start-1 md:row-start-1 md:translate-y-2",
    frame: "md:rotate-[-0.5deg]",
  },
];
