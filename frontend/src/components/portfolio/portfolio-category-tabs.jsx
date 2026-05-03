"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { categoryAnchorId } from "@/components/gallery/category-section";

export function PortfolioCategoryTabs({ categories }) {
  const [active, setActive] = useState(categories[0] ?? "");
  const reduced = useReducedMotion();

  useEffect(() => {
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
        { rootMargin: "-40% 0px -40% 0px", threshold: 0.05 },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [categories]);

  const goTo = (cat) => {
    const el = document.getElementById(categoryAnchorId(cat));
    el?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  };

  if (categories.length === 0) return null;

  return (
    <div className="sticky top-[var(--topbar-h)] z-20 -mx-5 mb-12 border-y border-border-subtle bg-bg-app/85 px-5 py-3 backdrop-blur-md md:top-0 md:-mx-8 md:px-8">
      <div
        className="flex flex-wrap items-center gap-1"
        role="tablist"
        aria-label="portfolio categories"
      >
        {categories.map((cat) => {
          const isActive = active === cat;
          return (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`relative rounded-md px-3.5 py-1.5 text-sm font-medium transition-colors duration-[var(--duration-fast)] ${
                isActive
                  ? "text-text-primary"
                  : "text-text-tertiary hover:text-text-secondary"
              }`}
              onClick={() => goTo(cat)}
            >
              {isActive && (
                <motion.span
                  layoutId="portfolio-tab-pill"
                  className="absolute inset-0 -z-10 rounded-md bg-accent-soft"
                  transition={{ type: "spring", stiffness: 500, damping: 38 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
