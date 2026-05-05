"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { categoryAnchorId } from "@/components/gallery/category-section";

/**
 * Scroll-spy: tracks which `category-{slug}` section is currently in view.
 * Mirrors the sidebar's strategy — derive the active id from intersection
 * observer state, never set initial state synchronously in the effect body.
 */
function useActiveCategory(categories) {
  const [active, setActive] = useState(categories[0] ?? "");

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const observers = [];
    categories.forEach((cat) => {
      const el = document.getElementById(categoryAnchorId(cat));
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActive(cat);
          });
        },
        { rootMargin: "-40% 0px -50% 0px", threshold: 0.01 },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [categories]);

  return active;
}

/**
 * Slim inline anchor list for jumping between categories. Designed to live
 * inside a sticky shell (handled by the parent page so the tabs follow the
 * scroll). Highlights the active category as the user scrolls.
 */
export function PortfolioCategoryTabs({ categories, jumpToLabel = "jump to" }) {
  const reduced = useReducedMotion();
  const active = useActiveCategory(categories);

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
      {categories.map((cat, idx) => {
        const isActive = active === cat;
        return (
          <span key={cat} className="flex items-center gap-x-4">
            <a
              href={`#${categoryAnchorId(cat)}`}
              onClick={goTo(cat)}
              aria-current={isActive ? "true" : undefined}
              className={`relative rounded-md transition-colors focus-visible-ring ${
                isActive
                  ? "text-text-primary"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              {cat}
              {isActive && (
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-accent-2"
                />
              )}
            </a>
            {idx < categories.length - 1 && (
              <span aria-hidden className="text-text-tertiary">
                ·
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
