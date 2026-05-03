"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { categoryAnchorId } from "@/components/gallery/category-section";

export function PortfolioCategoryTabs({ categories }) {
  const [active, setActive] = useState(categories[0] ?? "");

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
        { rootMargin: "-42% 0px -42% 0px", threshold: 0.08 },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [categories]);

  const goTo = (cat) => {
    const el = document.getElementById(categoryAnchorId(cat));
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (categories.length === 0) return null;

  return (
    <div className="sticky top-0 z-20 mb-10 rounded-b-2xl border-b-2 border-dashed border-primary/30 bg-[color-mix(in_srgb,var(--surface-card)_88%,transparent)] px-1 py-3 backdrop-blur-md sm:px-2">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="portfolio categories">
        {categories.map((cat) => {
          const isActive = active === cat;
          return (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`relative rounded-full border-2 px-3.5 py-1.5 text-xs font-semibold transition-colors duration-[var(--duration-base)] ${
                isActive
                  ? "border-dashed border-primary text-primary"
                  : "border-dashed border-primary/25 text-text-tertiary hover:border-primary/45 hover:text-text-secondary"
              }`}
              onClick={() => goTo(cat)}
            >
              {isActive ? (
                <motion.span
                  layoutId="portfolio-tab-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-primary/12"
                  transition={{ type: "spring", stiffness: 500, damping: 38 }}
                />
              ) : null}
              <span className="relative z-10">{cat}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
