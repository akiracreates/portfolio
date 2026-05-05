"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ImageFrame } from "@/components/ui/image-frame";
import { SmartImage } from "@/components/ui/smart-image";
import { pickLocale } from "@/lib/i18n/config";

const ARROW_BIAS_LEFT = "left";
const ARROW_BIAS_RIGHT = "right";
const ARROW_BIAS_NONE = "none";

/**
 * Infinite-loop preview carousel for commission examples.
 *
 *  - Hover on the container fades both arrows in to a base opacity.
 *  - When the cursor is in the left/right 30% of the container, the matching
 *    arrow goes to full opacity and lifts slightly — so the user feels the
 *    arrow "react" to where they're aiming.
 *  - Wraps around at both ends.
 *  - Keyboard arrows when focused. Real <button>s for accessibility.
 */
export function CommissionPreviewCarousel({ images = [], locale = "en" }) {
  const reduced = useReducedMotion();
  const containerRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [bias, setBias] = useState(ARROW_BIAS_NONE);

  const count = images.length;

  const goNext = useCallback(() => {
    if (count === 0) return;
    setIndex((i) => (i + 1) % count);
  }, [count]);

  const goPrev = useCallback(() => {
    if (count === 0) return;
    setIndex((i) => (i - 1 + count) % count);
  }, [count]);

  const onKey = (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrev();
    }
  };

  const onMouseMove = (event) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = event.clientX - rect.left;
    const ratio = x / rect.width;
    if (ratio < 0.35) setBias(ARROW_BIAS_LEFT);
    else if (ratio > 0.65) setBias(ARROW_BIAS_RIGHT);
    else setBias(ARROW_BIAS_NONE);
  };

  if (count === 0) {
    return (
      <div className="relative aspect-[4/3] w-full bg-bg-inset" aria-hidden />
    );
  }

  const current = images[index];
  const aspectStyle = {
    aspectRatio: `${current.width ?? 4} / ${current.height ?? 3}`,
  };

  return (
    <div
      ref={containerRef}
      className="group relative w-full select-none focus-visible-ring outline-none"
      role="region"
      aria-roledescription="carousel"
      aria-label="commission examples"
      tabIndex={0}
      onKeyDown={onKey}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setBias(ARROW_BIAS_NONE);
      }}
      onMouseMove={onMouseMove}
    >
      <ImageFrame
        rounded="none"
        className="relative w-full overflow-hidden border-0"
        style={aspectStyle}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.id}
            className="absolute inset-0"
            initial={reduced ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? { opacity: 1 } : { opacity: 0 }}
            transition={{
              duration: reduced ? 0 : 0.25,
              ease: [0.2, 0, 0, 1],
            }}
          >
            <SmartImage
              src={current.imageSrc}
              alt={pickLocale(current.alt, locale) || pickLocale(current.title, locale)}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              imgClassName="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </ImageFrame>

      {/* arrows */}
      <CarouselArrow
        side="left"
        active={hovered}
        prominent={bias === ARROW_BIAS_LEFT}
        onClick={goPrev}
        ariaLabel="previous example"
      />
      <CarouselArrow
        side="right"
        active={hovered}
        prominent={bias === ARROW_BIAS_RIGHT}
        onClick={goNext}
        ariaLabel="next example"
      />

      {/* dots */}
      <div className="absolute bottom-2 left-1/2 z-10 -translate-x-1/2 flex items-center gap-1.5">
        {images.map((img, i) => (
          <button
            key={img.id}
            type="button"
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-[var(--duration-base)] focus-visible-ring ${
              i === index ? "w-5 bg-text-primary" : "w-1.5 bg-text-tertiary/70 hover:bg-text-secondary"
            }`}
            aria-label={`show example ${i + 1} of ${count}`}
            aria-current={i === index ? "true" : undefined}
          />
        ))}
      </div>
    </div>
  );
}

function CarouselArrow({ side, active, prominent, onClick, ariaLabel }) {
  const isLeft = side === "left";
  const baseOpacity = active ? (prominent ? 1 : 0.55) : 0;
  const xOffset = prominent ? (isLeft ? -2 : 2) : 0;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={`absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border-strong bg-bg-app/70 text-text-primary backdrop-blur transition-all duration-[var(--duration-base)] focus-visible-ring ${
        isLeft ? "left-3" : "right-3"
      }`}
      style={{
        opacity: baseOpacity,
        transform: `translate(${xOffset}px, -50%) scale(${prominent ? 1.05 : 1})`,
        pointerEvents: active ? "auto" : "none",
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        {isLeft ? <path d="M15 6 9 12l6 6" /> : <path d="m9 6 6 6-6 6" />}
      </svg>
    </button>
  );
}
