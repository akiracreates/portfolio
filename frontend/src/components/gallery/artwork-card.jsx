"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ImageFrame } from "@/components/ui/image-frame";

export function ArtworkCard({ artwork }) {
  const reduced = useReducedMotion();

  return (
    <motion.article
      className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-border-subtle bg-bg-surface transition-colors duration-[var(--duration-base)] hover:border-border-default hover:bg-bg-surface-raised"
      whileHover={reduced ? undefined : { y: -3 }}
      transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
    >
      <ImageFrame
        rounded="md"
        className="relative aspect-[4/5] w-full border-0 rounded-none rounded-t-[var(--radius-lg)]"
      >
        <Image
          src={artwork.imageSrc}
          alt={artwork.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-[var(--duration-slow)] group-hover:scale-[1.04]"
        />
        {artwork.featured && (
          <div className="absolute left-3 top-3">
            <Badge variant="highlight" size="sm">
              featured
            </Badge>
          </div>
        )}
      </ImageFrame>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="heading-h3 text-[1rem] leading-snug text-text-primary">
            {artwork.title}
          </h3>
          <span className="caption shrink-0">{artwork.category}</span>
        </div>
        <p className="body-sm line-clamp-2 text-text-secondary">
          {artwork.artistComment}
        </p>
      </div>
    </motion.article>
  );
}
