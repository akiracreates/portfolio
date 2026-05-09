"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { pickLocale } from "@/lib/i18n/config";

export function FaqAccordion({ locale = "en", items = [] }) {
  const [openId, setOpenId] = useState(items[0]?.id ?? null);

  return (
    <div className="space-y-3 max-md:space-y-3.5">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <article
            key={item.id}
            className={`scrap-note overflow-hidden border max-md:border-[color:var(--border-accent)]/22 ${
              isOpen
                ? "border-border-accent bg-highlight-soft/20"
                : "border-border-subtle bg-[color:var(--bg-note)]"
            }`}
          >
            <button
              type="button"
              className="focus-visible-ring flex min-h-[3rem] w-full items-center justify-between gap-3 px-4 py-3.5 text-left max-md:gap-3 max-md:py-4 md:min-h-0 md:py-3"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              aria-expanded={isOpen}
            >
              <span className="text-sm font-medium leading-snug text-text-primary max-md:text-[0.9375rem] max-md:leading-relaxed">
                {pickLocale(item.question, locale)}
              </span>
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center text-lg leading-none text-highlight"
                aria-hidden
              >
                {isOpen ? "−" : "+"}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden border-t border-dashed border-border-subtle"
                >
                  <p className="body-sm px-4 py-3 max-md:py-3.5 max-md:leading-relaxed">
                    {pickLocale(item.answer, locale)}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </article>
        );
      })}
    </div>
  );
}
