"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ImageFrame } from "@/components/ui/image-frame";
import { SmartImage } from "@/components/ui/smart-image";
import { pickLocale } from "@/lib/i18n/config";
import { useNativeReducedMotion } from "@/lib/motion/use-native-reduced-motion";

const ARROW_BIAS_LEFT = "left";
const ARROW_BIAS_RIGHT = "right";
const ARROW_BIAS_NONE = "none";

const SWIPE_THRESHOLD_PX = 52;
const SWIPE_DOMINANCE_RATIO = 1.25;

function carouselUiLabels(locale) {
  if (locale === "ru") {
    return {
      region: "Примеры работ по заказу",
      prev: "Предыдущее изображение",
      next: "Следующее изображение",
      goTo: (n) => `Перейти к изображению ${n}`,
      hint: "Листайте, чтобы увидеть ещё",
    };
  }
  return {
    region: "Commission examples",
    prev: "Previous image",
    next: "Next image",
    goTo: (n) => `Go to image ${n}`,
    hint: "Swipe to see more",
  };
}

function useTouchPrimaryUi() {
  const [touchPrimary, setTouchPrimary] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: none), (pointer: coarse)");
    const apply = () => setTouchPrimary(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return touchPrimary;
}

/**
 * Infinite-loop preview carousel for commission examples (CSS crossfade; no Framer).
 */
export function CommissionPreviewCarousel({
  images = [],
  locale = "en",
  randomizeInitial = false,
}) {
  const reduced = useNativeReducedMotion();
  const labels = useMemo(() => carouselUiLabels(locale), [locale]);
  const touchPrimary = useTouchPrimaryUi();
  const containerRef = useRef(null);
  const swipePointerRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [bias, setBias] = useState(ARROW_BIAS_NONE);
  const [startIndex, setStartIndex] = useState(0);
  const hasRandomizedRef = useRef(false);

  useEffect(() => {
    hasRandomizedRef.current = false;
  }, [images.length, randomizeInitial]);

  useEffect(() => {
    if (!randomizeInitial || images.length <= 1 || hasRandomizedRef.current)
      return undefined;

    let cancelled = false;
    const run = () => {
      if (cancelled) return;
      hasRandomizedRef.current = true;
      const nextStart = Math.floor(Math.random() * images.length);
      setStartIndex(nextStart);
      setIndex(0);
    };

    let idleId;
    let timeoutId;
    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(run, { timeout: 1600 });
    } else if (typeof window !== "undefined") {
      timeoutId = window.setTimeout(run, 200);
    }

    return () => {
      cancelled = true;
      if (typeof idleId === "number" && typeof window !== "undefined") {
        window.cancelIdleCallback(idleId);
      }
      if (typeof timeoutId === "number") {
        clearTimeout(timeoutId);
      }
    };
  }, [images.length, randomizeInitial]);

  const orderedImages = useMemo(() => {
    if (!randomizeInitial || startIndex === 0) return images;
    return [...images.slice(startIndex), ...images.slice(0, startIndex)];
  }, [images, randomizeInitial, startIndex]);

  const count = orderedImages.length;

  const goNext = useCallback(() => {
    if (count === 0) return;
    setIndex((i) => (i + 1) % count);
  }, [count]);

  const goPrev = useCallback(() => {
    if (count === 0) return;
    setIndex((i) => (i - 1 + count) % count);
  }, [count]);

  const onPointerSwipeStart = useCallback((event) => {
    if (count <= 1) return;
    if (event.button !== 0 && event.pointerType !== "touch") return;
    swipePointerRef.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
    };
  }, [count]);

  const onPointerSwipeEnd = useCallback(
    (event) => {
      const start = swipePointerRef.current;
      if (!start || start.id !== event.pointerId) return;
      swipePointerRef.current = null;
      if (count <= 1) return;
      const dx = event.clientX - start.x;
      const dy = event.clientY - start.y;
      if (
        Math.abs(dx) < SWIPE_THRESHOLD_PX ||
        Math.abs(dx) < Math.abs(dy) * SWIPE_DOMINANCE_RATIO
      ) {
        return;
      }
      if (dx < 0) goNext();
      else goPrev();
    },
    [count, goNext, goPrev],
  );

  const onPointerSwipeCancel = useCallback((event) => {
    if (!event) return;
    const start = swipePointerRef.current;
    if (!start || start.id !== event.pointerId) return;
    swipePointerRef.current = null;
  }, []);

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

  const arrowsActiveForPointer = touchPrimary || hovered;

  if (count === 0) {
    return (
      <div className="relative aspect-[4/3] w-full bg-bg-inset" aria-hidden />
    );
  }

  const current = orderedImages[index];
  const aspectStyle = {
    aspectRatio: `${current.width ?? 4} / ${current.height ?? 3}`,
  };

  const fadeClass = reduced ? "" : "motion-fade-enter";

  return (
    <div
      ref={containerRef}
      className="group relative w-full select-none outline-none focus-visible-ring"
      role="region"
      aria-roledescription="carousel"
      aria-label={labels.region}
      tabIndex={0}
      onKeyDown={onKey}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setBias(ARROW_BIAS_NONE);
      }}
      onMouseMove={onMouseMove}
    >
      <div
        className="relative touch-pan-y"
        onPointerDown={onPointerSwipeStart}
        onPointerUp={onPointerSwipeEnd}
        onPointerCancel={onPointerSwipeCancel}
        onLostPointerCapture={onPointerSwipeCancel}
      >
        <ImageFrame
          rounded="none"
          className="relative w-full overflow-hidden border-0"
          style={aspectStyle}
        >
          <div key={current.id} className={`absolute inset-0 ${fadeClass}`.trim()}>
            <SmartImage
              src={current.imageSrc}
              alt={pickLocale(current.alt, locale) || pickLocale(current.title, locale)}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              showSkeleton={false}
              imgClassName="pointer-events-none object-contain p-3"
              draggable={false}
            />
          </div>
        </ImageFrame>

        <CarouselArrow
          side="left"
          active={arrowsActiveForPointer}
          touchPrimary={touchPrimary}
          prominent={bias === ARROW_BIAS_LEFT}
          onClick={goPrev}
          ariaLabel={labels.prev}
        />
        <CarouselArrow
          side="right"
          active={arrowsActiveForPointer}
          touchPrimary={touchPrimary}
          prominent={bias === ARROW_BIAS_RIGHT}
          onClick={goNext}
          ariaLabel={labels.next}
        />

        {!touchPrimary ? (
          <div className="pointer-events-none absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5">
            {orderedImages.map((img, i) => (
              <button
                key={img.id}
                type="button"
                onClick={() => setIndex(i)}
                className={`pointer-events-auto h-1.5 rounded-full transition-all duration-[var(--duration-base)] focus-visible-ring ${
                  i === index ? "w-5 bg-text-primary" : "w-1.5 bg-text-tertiary/70 hover:bg-text-secondary"
                }`}
                aria-label={labels.goTo(i + 1)}
                aria-current={i === index ? "true" : undefined}
              />
            ))}
          </div>
        ) : null}
      </div>

      {touchPrimary && count > 1 ? (
        <div className="border-t border-[color:var(--border-subtle)]/80 bg-bg-inset/50 px-2 py-2">
          <p className="text-center text-[0.7rem] leading-snug text-text-tertiary">{labels.hint}</p>
          <div className="mt-1.5 flex flex-wrap items-center justify-center gap-2">
            {orderedImages.map((img, i) => (
              <button
                key={img.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={labels.goTo(i + 1)}
                aria-current={i === index ? "true" : undefined}
                className="inline-flex min-h-[44px] min-w-[44px] cursor-pointer touch-manipulation items-center justify-center rounded-md focus-visible-ring"
              >
                <span
                  className={`block h-2 rounded-full transition-all duration-[var(--duration-base)] ${
                    i === index ? "w-8 bg-text-primary" : "w-2 bg-text-tertiary/70 active:bg-text-secondary"
                  }`}
                  aria-hidden
                />
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function CarouselArrow({ side, active, prominent, touchPrimary, onClick, ariaLabel }) {
  const isLeft = side === "left";
  const baseOpacity =
    touchPrimary ? (prominent ? 1 : 0.72) : active ? (prominent ? 1 : 0.55) : 0;
  const xOffset = prominent ? (isLeft ? -2 : 2) : 0;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={`absolute top-1/2 z-10 flex shrink-0 -translate-y-1/2 cursor-pointer touch-manipulation items-center justify-center rounded-full border border-dashed border-border-strong bg-bg-app/80 text-text-primary backdrop-blur transition-[opacity,transform] duration-[var(--duration-base)] focus-visible-ring ${touchPrimary ? "h-11 w-11" : "h-10 w-10"} ${isLeft ? "left-2 md:left-3" : "right-2 md:right-3"}`}
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
