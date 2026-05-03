"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { pageEaseExit, pageEaseTransition } from "@/lib/motion/variants";
import { usePrefersReducedMotion } from "@/lib/motion/use-prefers-reduced-motion";

export function PageTransition({ children }) {
  const pathname = usePathname();
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return children;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: pageEaseTransition,
        }}
        exit={{
          opacity: 0,
          y: -8,
          transition: pageEaseExit,
        }}
        className="min-h-0 flex-1"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
