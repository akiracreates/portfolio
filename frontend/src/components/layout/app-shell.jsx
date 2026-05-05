"use client";

import { useCallback, useState } from "react";
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
  const [hoverOpen, setHoverOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const collapsed = !hoverOpen;

  const onEnter = useCallback(() => setHoverOpen(true), []);
  const onLeave = useCallback(() => setHoverOpen(false), []);

  const sidebarWidth = collapsed
    ? "var(--sidebar-w-collapsed)"
    : "var(--sidebar-w-expanded)";

  return (
    <div
      className="min-h-screen bg-bg-app text-text-primary"
      style={{ "--sidebar-w": sidebarWidth }}
    >
      {/* desktop fixed sidebar */}
      <aside
        className="fixed inset-y-0 left-0 z-40 hidden border-r border-border-strong md:block"
        style={{
          width: sidebarWidth,
          transition: "width 220ms cubic-bezier(0.2, 0, 0, 1)",
        }}
        aria-label="primary sidebar"
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onFocusCapture={onEnter}
        onBlurCapture={(event) => {
          // Only collapse if focus has left the sidebar entirely.
          if (!event.currentTarget.contains(event.relatedTarget)) onLeave();
        }}
      >
        <Sidebar collapsed={collapsed} variant="fixed" />
      </aside>

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
