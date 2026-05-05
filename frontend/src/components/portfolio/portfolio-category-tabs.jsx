"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CategorySection, categoryAnchorId } from "@/components/gallery/category-section";

function categoryFromHash(categories) {
  if (typeof window === "undefined") return categories[0] ?? "";
  const hash = window.location.hash.replace(/^#/, "");
  return categories.find((cat) => categoryAnchorId(cat) === hash) ?? categories[0] ?? "";
}

export function PortfolioCategoryShowcase({
  sections,
  categories,
  jumpToLabel = "jump to",
  locale = "en",
  piecesLabel = "pieces",
  pieceLabel = "piece",
}) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(categories[0] ?? "");

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setActive(categoryFromHash(categories));
    });
    return () => cancelAnimationFrame(frame);
  }, [categories]);

  const selectCategory = useCallback(
    (cat) => {
      setActive(cat);
      if (typeof window !== "undefined") {
        window.history.replaceState(null, "", `#${categoryAnchorId(cat)}`);
      }
    },
    [],
  );

  const activeSection = useMemo(
    () => sections.find((section) => section.category === active) ?? sections[0],
    [active, sections],
  );

  if (!activeSection) return null;

  return (
    <div className="space-y-8">
      <PortfolioCategoryTabs
        categories={categories}
        jumpToLabel={jumpToLabel}
        active={activeSection.category}
        onSelect={selectCategory}
      />

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeSection.category}
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 1 } : { opacity: 0, y: -8 }}
          transition={{ duration: reduced ? 0 : 0.22, ease: [0.2, 0, 0, 1] }}
        >
          <CategorySection
            category={activeSection.category}
            artworks={activeSection.items}
            locale={locale}
            piecesLabel={piecesLabel}
            pieceLabel={pieceLabel}
            startIndex={0}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function PortfolioCategoryTabs({
  categories,
  jumpToLabel = "jump to",
  active,
  onSelect,
}) {
  if (categories.length === 0) return null;

  return (
    <nav
      className="scrap-note sticky top-3 z-30 flex flex-wrap items-center gap-2 p-3 text-[0.8125rem] text-text-tertiary backdrop-blur"
      aria-label={jumpToLabel}
    >
      <span className="caption mr-1">{jumpToLabel}</span>
      {categories.map((cat) => {
        const isActive = active === cat;
        return (
          <a
            key={cat}
            href={`#${categoryAnchorId(cat)}`}
            onClick={(event) => {
              event.preventDefault();
              onSelect(cat);
            }}
            aria-current={isActive ? "true" : undefined}
            className={`relative rounded-[var(--radius-md)] border border-dashed px-3 py-1.5 transition-[background-color,border-color,color,transform] duration-[var(--duration-base)] focus-visible-ring ${
              isActive
                ? "border-highlight bg-highlight-soft text-text-primary shadow-sm"
                : "border-border-subtle bg-bg-inset/55 text-text-secondary hover:border-accent-2 hover:text-text-primary"
            }`}
          >
            {cat}
            {isActive && (
              <span
                aria-hidden
                className="absolute -bottom-1 left-3 right-3 h-px bg-highlight"
              />
            )}
          </a>
        );
      })}
    </nav>
  );
}
