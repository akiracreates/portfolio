"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { MobileFab } from "@/components/layout/mobile-fab";
import { MobileDrawer } from "@/components/layout/mobile-drawer";
import { Footer } from "@/components/layout/footer";
import { useNativeReducedMotion } from "@/lib/motion/use-native-reduced-motion";

const CLOSE_DELAY_MS = 120;

export function AppShell({ children }) {
  const reduced = useNativeReducedMotion();
  const pathname = usePathname();
  const [pointerState, setPointerState] = useState({ routeKey: "", value: false });
  const [focusState, setFocusState] = useState({ routeKey: "", value: false });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const closeTimerRef = useRef(null);
  const asideRef = useRef(null);
  const pointerInside =
    pointerState.routeKey === pathname ? pointerState.value : false;
  const focusWithin = focusState.routeKey === pathname ? focusState.value : false;

  const collapsed = !(pointerInside || focusWithin);

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  useEffect(() => () => clearCloseTimer(), [clearCloseTimer]);

  useEffect(() => {
    clearCloseTimer();
  }, [pathname, clearCloseTimer]);

  const onEnter = useCallback(() => {
    clearCloseTimer();
    setPointerState({ routeKey: pathname, value: true });
  }, [clearCloseTimer, pathname]);

  const onLeave = useCallback(() => {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setPointerState({ routeKey: pathname, value: false });
      closeTimerRef.current = null;
    }, CLOSE_DELAY_MS);
  }, [clearCloseTimer, pathname]);

  const sidebarWidth = collapsed
    ? "var(--sidebar-w-collapsed)"
    : "var(--sidebar-w-expanded)";

  const asideTransitionClass = reduced
    ? ""
    : "transition-[width] duration-[240ms] ease-[cubic-bezier(0.22,1,0.36,1)]";

  return (
    <div
      id="top"
      className="min-h-screen bg-bg-app text-text-primary"
      style={{ "--sidebar-w": sidebarWidth }}
    >
      <aside
        ref={asideRef}
        style={{ width: sidebarWidth }}
        className={`sidebar-shell fixed inset-y-0 left-0 z-40 hidden overflow-hidden border-r border-border-strong md:block ${asideTransitionClass}`}
        aria-label="primary sidebar"
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onFocusCapture={() => {
          clearCloseTimer();
          setFocusState({ routeKey: pathname, value: true });
        }}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setFocusState({ routeKey: pathname, value: false });
            onLeave();
          }
        }}
      >
        <Sidebar collapsed={collapsed} variant="fixed" />
      </aside>

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

      <MobileFab open={drawerOpen} onOpenDrawer={() => setDrawerOpen(true)} />

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}
