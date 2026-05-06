"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { MobileFab } from "@/components/layout/mobile-fab";
import { MobileDrawer } from "@/components/layout/mobile-drawer";
import { Footer } from "@/components/layout/footer";

/**
 * Desktop sidebar opens on hover (or keyboard focus inside) and collapses
 * back when the cursor leaves. Width is animated via CSS transition on the
 * `--sidebar-w` style. Mobile keeps its FAB-driven drawer.
 */
export function AppShell({ children }) {
  const reduced = useReducedMotion();
  const [hoverOpen, setHoverOpen] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const openTimerRef = useRef(null);
  const closeTimerRef = useRef(null);

  const collapsed = !(hoverOpen || focusWithin);

  const clearTimers = useCallback(() => {
    if (openTimerRef.current) {
      window.clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const onEnter = useCallback(() => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    if (openTimerRef.current) return;
    openTimerRef.current = window.setTimeout(() => {
      setHoverOpen(true);
      openTimerRef.current = null;
    }, 50);
  }, []);

  const onLeave = useCallback(() => {
    if (openTimerRef.current) {
      window.clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
    if (closeTimerRef.current) return;
    closeTimerRef.current = window.setTimeout(() => {
      setHoverOpen(false);
      closeTimerRef.current = null;
    }, 110);
  }, []);

  const sidebarWidth = collapsed
    ? "var(--sidebar-w-collapsed)"
    : "var(--sidebar-w-expanded)";

  return (
    <div
      className="min-h-screen bg-bg-app text-text-primary"
      style={{ "--sidebar-w": sidebarWidth }}
    >
      {/* desktop fixed sidebar */}
      <motion.aside
        layout={false}
        className="fixed inset-y-0 left-0 z-40 hidden border-r border-border-strong md:block"
        initial={false}
        animate={{ width: sidebarWidth }}
        transition={
          reduced
            ? { duration: 0 }
            : { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
        }
        aria-label="primary sidebar"
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onFocusCapture={() => {
          clearTimers();
          setFocusWithin(true);
        }}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setFocusWithin(false);
            onLeave();
          }
        }}
      >
        <Sidebar collapsed={collapsed} variant="fixed" />
      </motion.aside>

      {/* main column — left padding equal to the COLLAPSED width at md+,
          so the page never reflows when the sidebar expands on hover.
          The expanded sidebar simply overlays whatever sits to its right. */}
      <div className="min-h-screen md:pl-[var(--sidebar-w-collapsed)]">
        <div className="world-frame flex min-h-screen flex-col">
          <div className="world-inner flex flex-1 flex-col">
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </div>
      </div>

      {/* mobile floating action button (opens drawer) */}
      <MobileFab onOpenDrawer={() => setDrawerOpen(true)} />

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}
