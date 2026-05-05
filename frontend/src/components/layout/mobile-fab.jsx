"use client";

import { useT } from "@/components/i18n/locale-provider";

export function MobileFab({ onOpenDrawer }) {
  const t = useT();
  return (
    <button
      type="button"
      onClick={onOpenDrawer}
      className="fixed bottom-5 right-5 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-dashed border-highlight bg-bg-surface text-highlight shadow-lg transition-colors duration-[var(--duration-base)] hover:bg-highlight-soft focus-visible-ring md:hidden"
      style={{
        bottom: "calc(env(safe-area-inset-bottom, 0px) + 1.25rem)",
      }}
      aria-label={t("common.openNavigation", "open navigation")}
      aria-controls="mobile-drawer"
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
  );
}
