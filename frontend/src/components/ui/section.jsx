"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionDividerBleed } from "@/components/ui/divider";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";

const sizes = {
  sm: "py-9 md:py-14",
  md: "py-11 md:py-20",
  lg: "py-13 md:py-24",
};

export function Section({
  id,
  eyebrow,
  title,
  description,
  action,
  children,
  size = "lg",
  headingLevel = "h2",
  className = "",
  align = "left",
  separator = false,
  separatorClassName = "",
}) {
  const reduced = useReducedMotion();
  const headingId = id ? `${id}-heading` : undefined;

  return (
    <>
      {separator ? (
        <SectionDividerBleed
          className={`section-divider-contained ${separatorClassName}`.trim()}
        />
      ) : null}
      <motion.section
        id={id}
        className={`section-scrap scroll-mt-header ${sizes[size] ?? sizes.lg} ${className}`.trim()}
        aria-labelledby={headingId}
        initial={reduced ? false : { opacity: 0, y: 16 }}
        animate={reduced ? false : { opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.2, 0, 0, 1] }}
      >
        {(eyebrow || title || action) && (
          <header
            className={`mb-6 flex flex-col gap-4 md:mb-8 sm:flex-row sm:items-end sm:justify-between ${
              align === "center" ? "sm:items-center sm:text-center" : ""
            }`}
          >
            <div className="space-y-3">
              {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
              {title && (
                <Heading level={headingLevel} id={headingId} className="max-w-2xl">
                  {title}
                </Heading>
              )}
              {description && (
                <p className="body max-w-2xl">{description}</p>
              )}
            </div>
            {action && <div className="shrink-0">{action}</div>}
          </header>
        )}
        {children}
      </motion.section>
    </>
  );
}
