"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { useT } from "@/components/i18n/locale-provider";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MobileDrawer({ open, onClose }) {
  const reduced = useReducedMotion();
  const panelRef = useRef(null);
  const lastFocusRef = useRef(null);
  const t = useT();

  useEffect(() => {
    if (!open) return undefined;

    lastFocusRef.current =
      typeof document !== "undefined" ? document.activeElement : null;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusFirst = () => {
      const panel = panelRef.current;
      if (!panel) return;
      const focusables = panel.querySelectorAll(FOCUSABLE);
      if (focusables.length > 0) focusables[0].focus();
    };

    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;
      const focusables = Array.from(panel.querySelectorAll(FOCUSABLE)).filter(
        (el) => !el.hasAttribute("aria-hidden"),
      );
      if (focusables.length === 0) {
        e.preventDefault();
        return;
      }
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);

    const t = window.setTimeout(focusFirst, 30);

    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      const last = lastFocusRef.current;
      if (last && typeof last.focus === "function") last.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" id="mobile-drawer">
          <motion.div
            className="absolute inset-0 bg-[var(--bg-overlay)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.15, ease: [0.2, 0, 0, 1] }}
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            ref={panelRef}
            className="absolute left-0 top-0 h-full w-[280px] max-w-[85vw] border-r border-dashed border-border-strong bg-bg-sidebar shadow-lg"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={
              reduced
                ? { duration: 0 }
                : { duration: 0.22, ease: [0.2, 0, 0, 1] }
            }
          >
            <Sidebar
              variant="drawer"
              collapsed={false}
              showCollapseToggle={false}
              onNavigate={onClose}
            />
            <button
              type="button"
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-md border border-dashed border-transparent text-text-tertiary transition-colors hover:border-border-default hover:bg-bg-surface hover:text-text-primary"
              onClick={onClose}
              aria-label={t("common.closeNavigation", "close navigation")}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                aria-hidden
              >
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
