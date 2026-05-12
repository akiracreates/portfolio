"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { MobileDrawer } from "@/components/layout/mobile-drawer";

const DESKTOP_NAV_QUERY =
  "(min-width: 1200px) and (hover: hover) and (pointer: fine)";

function subscribeDesktop(cb) {
  const mql = window.matchMedia(DESKTOP_NAV_QUERY);
  mql.addEventListener("change", cb);
  return () => mql.removeEventListener("change", cb);
}

function getDesktopSnapshot() {
  return window.matchMedia(DESKTOP_NAV_QUERY).matches;
}

function getDesktopServerSnapshot() {
  return false;
}

export function NavigationLayer() {
  const isDesktop = useSyncExternalStore(
    subscribeDesktop,
    getDesktopSnapshot,
    getDesktopServerSnapshot,
  );
  const [mounted, setMounted] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (isDesktop || !mounted) return null;

  const portalRoot = document.getElementById("nav-portal-root");
  if (!portalRoot) return null;

  return createPortal(
    <>
      <button
        type="button"
        onClick={() => setDrawerOpen(true)}
        className="mobile-menu-trigger focus-visible-ring h-12 w-12 items-center justify-center rounded-full border border-dashed border-highlight bg-bg-surface text-highlight shadow-lg transition-colors duration-[var(--duration-base)] hover:bg-highlight-soft"
        style={{
          position: "absolute",
          top: "max(1rem, env(safe-area-inset-top, 0px))",
          left: "max(1rem, env(safe-area-inset-left, 0px))",
          zIndex: 10,
          pointerEvents: "auto",
          display: drawerOpen ? "none" : "flex",
        }}
        aria-label="open navigation"
        aria-controls="site-drawer"
        aria-expanded={drawerOpen}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          aria-hidden
        >
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>,
    portalRoot,
  );
}
