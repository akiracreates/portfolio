"use client";

import Link from "next/link";

export function TopBar({ onOpenDrawer }) {
  return (
    <header
      className="sticky top-0 z-30 flex h-[var(--topbar-h)] items-center justify-between border-b border-border-subtle bg-bg-app/85 px-4 backdrop-blur-md md:hidden"
      role="banner"
    >
      <Link
        href="/"
        className="group flex min-w-0 items-center gap-2.5"
        aria-label="akira — home"
      >
        <span
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md font-display text-[0.95rem] font-semibold text-text-on-accent"
          style={{
            background:
              "linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)",
          }}
          aria-hidden
        >
          a
        </span>
        <span className="font-display text-[0.95rem] font-medium tracking-tight text-text-primary">
          akira
        </span>
      </Link>

      <button
        type="button"
        onClick={onOpenDrawer}
        className="flex h-9 w-9 items-center justify-center rounded-md border border-border-default text-text-secondary transition-colors hover:bg-bg-surface hover:text-text-primary"
        aria-label="open navigation"
        aria-controls="mobile-drawer"
      >
        <svg
          width="18"
          height="18"
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
    </header>
  );
}
