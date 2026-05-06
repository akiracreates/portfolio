"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { MobileFab } from "@/components/layout/mobile-fab";
import { MobileDrawer } from "@/components/layout/mobile-drawer";
import { Footer } from "@/components/layout/footer";

const SIDEBAR_EXPANDED_PX = 240;
const SAFETY_MARGIN_PX = 20;
const CLOSE_DELAY_MS = 120;

export function AppShell({ children }) {
  const reduced = useReducedMotion();
  const pathname = usePathname();
  const [pointerInside, setPointerInside] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const closeTimerRef = useRef(null);
  const asideRef = useRef(null);

  const collapsed = !(pointerInside || focusWithin);

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  useEffect(() => () => clearCloseTimer(), [clearCloseTimer]);

  useEffect(() => {
    setPointerInside(false);
    setFocusWithin(false);
    clearCloseTimer();
  }, [pathname, clearCloseTimer]);

  const onEnter = useCallback(() => {
    clearCloseTimer();
    setPointerInside(true);
  }, [clearCloseTimer]);

  const onLeave = useCallback(() => {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setPointerInside(false);
      closeTimerRef.current = null;
    }, CLOSE_DELAY_MS);
  }, [clearCloseTimer]);

  useEffect(() => {
    const onPointerMove = (e) => {
      if (!pointerInside && !focusWithin) return;
      if (e.clientX > SIDEBAR_EXPANDED_PX + SAFETY_MARGIN_PX) {
        clearCloseTimer();
        setPointerInside(false);
        setFocusWithin(false);
      }
    };
    document.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => document.removeEventListener("pointermove", onPointerMove);
  }, [pointerInside, focusWithin, clearCloseTimer]);

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
        ref={asideRef}
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
          clearCloseTimer();
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
