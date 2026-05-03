"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { TopBar } from "@/components/layout/top-bar";
import { MobileDrawer } from "@/components/layout/mobile-drawer";
import { Footer } from "@/components/layout/footer";

const STORAGE_KEY = "akira.sidebar.collapsed.v1";

// External store for sidebar collapsed state, persisted to localStorage.
// To avoid SSR/hydration mismatches, both the server snapshot AND the initial
// client snapshot return `false` (expanded). After mount, an effect syncs
// from localStorage and notifies subscribers, triggering a re-render only on
// the client. Mutating module state inside an effect (without calling
// setState directly) is lint-clean under React 19.
const listeners = new Set();
let cachedCollapsed = false;
let hydratedFromStorage = false;

function readFromStorage() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function getSnapshot() {
  return cachedCollapsed;
}

function getServerSnapshot() {
  return false;
}

function subscribe(callback) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function notify() {
  listeners.forEach((l) => l());
}

function syncFromStorage() {
  if (hydratedFromStorage) return;
  hydratedFromStorage = true;
  const next = readFromStorage();
  if (next !== cachedCollapsed) {
    cachedCollapsed = next;
    notify();
  }
}

function setCollapsed(value) {
  hydratedFromStorage = true;
  cachedCollapsed = value;
  try {
    window.localStorage.setItem(STORAGE_KEY, value ? "1" : "0");
  } catch {
    /* ignore */
  }
  notify();
}

export function AppShell({ children }) {
  const collapsed = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const [drawerOpen, setDrawerOpen] = useState(false);

  // After the first client render, sync from localStorage. Notifying listeners
  // (instead of calling setState directly) keeps the React 19 lint rule happy.
  useEffect(() => {
    syncFromStorage();
  }, []);

  const toggleCollapsed = useCallback(() => {
    setCollapsed(!cachedCollapsed);
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
      <aside
        className="fixed inset-y-0 left-0 z-40 hidden border-r border-border-strong md:block"
        style={{ width: sidebarWidth }}
        aria-label="primary sidebar"
      >
        <Sidebar
          collapsed={collapsed}
          onToggleCollapsed={toggleCollapsed}
          variant="fixed"
        />
      </aside>

      {/* main column — left padding only at md+ to clear the fixed sidebar */}
      <div className="flex min-h-screen flex-col md:pl-[var(--sidebar-w)]">
        <TopBar onOpenDrawer={() => setDrawerOpen(true)} />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </div>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}
