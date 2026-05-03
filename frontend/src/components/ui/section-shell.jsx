"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeSlideUp } from "@/lib/motion/variants";

export function SectionShell({
  id,
  title,
  eyebrow,
  children,
  action,
  variant = "default",
  template = "default",
  className = "",
  titleUnderline = true,
}) {
  const reduced = useReducedMotion();

  const frameClass =
    variant === "accent"
      ? "card-accent"
      : template === "editorial"
        ? "card-editorial"
        : template === "gallery"
          ? "card-gallery"
          : "card";

  return (
    <motion.section
      id={id}
      className={`${frameClass} px-5 py-6 sm:px-7 sm:py-8 ${className}`}
      aria-labelledby={id ? `${id}-heading` : undefined}
      initial={reduced ? false : "hidden"}
      whileInView={reduced ? undefined : "visible"}
      viewport={
        reduced ? undefined : { once: true, amount: 0.12, margin: "0px 0px -10% 0px" }
      }
      variants={reduced ? undefined : fadeSlideUp}
    >
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          {eyebrow && (
            <p className={`label-sm mb-2 ${titleUnderline ? "title-underline" : ""}`}>{eyebrow}</p>
          )}
          {title && (
            <h2
              id={id ? `${id}-heading` : undefined}
              className={`heading-display ${template === "gallery" ? "heading-md" : "heading-md"}`}
            >
              {title}
            </h2>
          )}
        </div>
        {action}
      </div>
      <div
        className={
          titleUnderline
            ? "mb-6 border-b border-dashed border-primary/25 pb-1"
            : "divider-gradient mb-6"
        }
      />
      {children}
    </motion.section>
  );
}
