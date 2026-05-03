"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ImageFrame } from "@/components/ui/image-frame";

export function ArtworkCard({ artwork, featured = false }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      layout
      className={`card-inner group overflow-hidden transition-shadow duration-[var(--duration-base)] hover:border-primary/45 hover:shadow-[var(--elev-glow)] ${
        featured ? "md:col-span-2" : ""
      }`}
      whileHover={reduceMotion ? undefined : { y: -4 }}
      transition={{ type: "spring", stiffness: 380, damping: 26 }}
    >
      <div
        className={`flex flex-col gap-3 sm:flex-row sm:items-stretch ${
          featured ? "sm:gap-4" : ""
        }`}
      >
        <ImageFrame
          dashed
          className={`relative w-full shrink-0 ${
            featured
              ? "aspect-[4/5] sm:aspect-[16/10] sm:h-56 sm:w-full md:aspect-auto md:h-64 md:w-60"
              : "aspect-[4/5] sm:h-52 sm:w-44 md:aspect-auto md:h-56 md:w-52"
          }`}
        >
          <Image
            src={artwork.imageSrc}
            alt={artwork.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 45vw, 220px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </ImageFrame>
        <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 px-3 pb-3 pt-1 sm:px-4 sm:py-3">
          <h3 className="text-sm font-semibold text-primary">{artwork.title}</h3>
          <p className="text-xs leading-relaxed text-text-secondary md:max-w-[42ch]">
            {artwork.artistComment}
          </p>
        </div>
      </div>
    </motion.article>
  );
}
