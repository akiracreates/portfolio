"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { pickLocale } from "@/lib/i18n/config";

export function FaqAccordion({ locale = "en", items = [] }) {
  const [openId, setOpenId] = useState(items[0]?.id ?? null);

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <article
            key={item.id}
            className={`scrap-note overflow-hidden border ${
              isOpen
                ? "border-border-accent bg-highlight-soft/20"
                : "border-border-subtle bg-[color:var(--bg-note)]"
            }`}
          >
            <button
              type="button"
              className="focus-visible-ring flex w-full items-center justify-between gap-4 px-4 py-3 text-left"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              aria-expanded={isOpen}
            >
              <span className="text-sm font-medium text-text-primary">
                {pickLocale(item.question, locale)}
              </span>
              <span className="text-lg leading-none text-highlight" aria-hidden>
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
                  <p className="body-sm px-4 py-3">{pickLocale(item.answer, locale)}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </article>
        );
      })}
    </div>
  );
}
