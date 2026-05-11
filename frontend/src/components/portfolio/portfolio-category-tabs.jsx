"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { CategorySection, categoryAnchorId } from "@/components/gallery/category-section";
import { useNativeReducedMotion } from "@/lib/motion/use-native-reduced-motion";
import { categoryLabels } from "@/lib/content/artworks";

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
  const reduced = useNativeReducedMotion();
  const [active, setActive] = useState(categories[0] ?? "");

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setActive(categoryFromHash(categories));
    });
    return () => cancelAnimationFrame(frame);
  }, [categories]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const syncFromHash = () => {
      setActive(categoryFromHash(categories));
    };
    window.addEventListener("hashchange", syncFromHash);
    window.addEventListener("popstate", syncFromHash);
    return () => {
      window.removeEventListener("hashchange", syncFromHash);
      window.removeEventListener("popstate", syncFromHash);
    };
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
    <div className="space-y-6 md:space-y-8">
      <PortfolioCategoryTabs
        categories={categories}
        jumpToLabel={jumpToLabel}
        active={activeSection.category}
        onSelect={selectCategory}
        locale={locale}
      />

      <div
        key={activeSection.category}
        className={
          reduced ? "" : "portfolio-category-panel motion-crossfade-enter"
        }
      >
        <CategorySection
          category={activeSection.category}
          artworks={activeSection.items}
          locale={locale}
          piecesLabel={piecesLabel}
          pieceLabel={pieceLabel}
          startIndex={0}
          enableSecretSpin
        />
      </div>
    </div>
  );
}

export function PortfolioCategoryTabs({
  categories,
  jumpToLabel = "jump to",
  active,
  onSelect,
  locale = "en",
}) {
  if (categories.length === 0) return null;

  return (
    <nav
      className="portfolio-tabs text-[0.8125rem] text-text-tertiary"
      aria-label={jumpToLabel}
    >
      <span className="portfolio-tabs-label caption shrink-0 text-text-tertiary">
        {jumpToLabel}
      </span>
      <div className="portfolio-tabs-inner">
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
              className={`portfolio-tab focus-visible-ring ${
                isActive ? "is-active note-surface-warm deco-warm-pin" : ""
              }`}
            >
              {categoryLabels[cat]?.[locale] ?? cat}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
