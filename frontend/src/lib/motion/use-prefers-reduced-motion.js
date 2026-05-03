"use client";

import { useReducedMotion as useFramerReducedMotion } from "framer-motion";

export function usePrefersReducedMotion() {
  return useFramerReducedMotion();
}
