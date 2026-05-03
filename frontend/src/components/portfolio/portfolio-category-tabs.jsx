"use client";

import { useReducedMotion } from "framer-motion";
import { categoryAnchorId } from "@/components/gallery/category-section";

/**
 * Slim, non-sticky inline anchor list for jumping between categories.
 * Replaces the previous heavy sticky tab bar — the long-scroll editorial
 * layout makes tabs feel noisy.
 */
export function PortfolioCategoryTabs({ categories, jumpToLabel = "jump to" }) {
  const reduced = useReducedMotion();

  if (categories.length === 0) return null;

  const goTo = (cat) => (event) => {
    event.preventDefault();
    const el = document.getElementById(categoryAnchorId(cat));
    if (!el) return;
    el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${categoryAnchorId(cat)}`);
    }
  };

  return (
    <nav className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.8125rem] text-text-tertiary">
      <span className="caption">{jumpToLabel}</span>
      {categories.map((cat, idx) => (
        <span key={cat} className="flex items-center gap-x-4">
          <a
            href={`#${categoryAnchorId(cat)}`}
            onClick={goTo(cat)}
            className="text-text-secondary transition-colors hover:text-text-primary focus-visible-ring rounded-md"
          >
            {cat}
          </a>
          {idx < categories.length - 1 && (
            <span aria-hidden className="text-text-tertiary">
              ·
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
