"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useTransition } from "react";
import { locales } from "@/lib/i18n/config";
import { useLocale } from "@/lib/i18n/use-locale";

const LABELS = {
  en: "en",
  ru: "ru",
};

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;
const SCROLL_STATE_KEY = "akira.locale-scroll.v1";

function setLocaleCookie(locale) {
  if (typeof document === "undefined") return;
  document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=${COOKIE_MAX_AGE}; samesite=lax`;
}

function swapLocale(pathname, nextLocale) {
  if (!pathname) return `/${nextLocale}`;
  const segments = pathname.split("/");
  if (segments.length > 1 && locales.includes(segments[1])) {
    segments[1] = nextLocale;
    return segments.join("/") || `/${nextLocale}`;
  }
  return `/${nextLocale}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}

function saveScrollState(targetPath, hash) {
  if (typeof window === "undefined") return;
  const doc = document.documentElement;
  const maxScroll = Math.max(0, doc.scrollHeight - window.innerHeight);
  const payload = {
    targetPath,
    hash,
    scrollY: window.scrollY,
    progress: maxScroll > 0 ? window.scrollY / maxScroll : 0,
  };
  window.sessionStorage.setItem(SCROLL_STATE_KEY, JSON.stringify(payload));
}

function loadScrollState() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(SCROLL_STATE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function clearScrollState() {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(SCROLL_STATE_KEY);
}

export function LocaleSwitcher({ collapsed = false, className = "" }) {
  const router = useRouter();
  const pathname = usePathname();
  const current = useLocale();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const state = loadScrollState();
    if (!state || typeof window === "undefined") return;

    const currentTarget = `${pathname || ""}${window.location.hash || ""}`;
    if (state.targetPath !== currentTarget) return;

    let cancelled = false;
    let attempts = 0;

    const restore = () => {
      if (cancelled) return;

      const hash = state.hash?.replace(/^#/, "");
      if (hash) {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ block: "start" });
          clearScrollState();
          return;
        }
      }

      const doc = document.documentElement;
      const maxScroll = Math.max(0, doc.scrollHeight - window.innerHeight);
      const fallbackY =
        maxScroll > 0
          ? Math.min(maxScroll, Math.round((state.progress ?? 0) * maxScroll))
          : 0;

      window.scrollTo({ top: fallbackY, behavior: "auto" });

      attempts += 1;
      if (attempts >= 4) {
        clearScrollState();
        return;
      }

      window.requestAnimationFrame(restore);
    };

    const startId = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(restore);
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(startId);
    };
  }, [pathname, current]);

  const onSelect = useCallback(
    (next) => {
      if (next === current) return;
      setLocaleCookie(next);
      const hash = typeof window !== "undefined" ? window.location.hash : "";
      const targetBase = swapLocale(pathname || `/${current}`, next);
      const target = `${targetBase}${hash}`;
      saveScrollState(target, hash);
      startTransition(() => {
        router.replace(target, { scroll: false });
      });
    },
    [current, pathname, router],
  );

  if (collapsed) {
    const next = current === "en" ? "ru" : "en";
    return (
      <button
        type="button"
        onClick={() => onSelect(next)}
        disabled={isPending}
        className={`flex h-9 w-full items-center justify-center rounded-md border border-dashed border-transparent text-[11px] font-semibold text-text-secondary transition hover:border-border-default hover:bg-bg-surface hover:text-text-primary focus-visible-ring disabled:opacity-60 ${className}`.trim()}
        aria-label={`switch to ${LABELS[next]}`}
        title={`switch to ${LABELS[next]}`}
      >
        {LABELS[current]}
      </button>
    );
  }

  return (
    <div
      role="group"
      aria-label="language"
      className={`inline-flex items-center gap-1 rounded-md border border-dashed border-border-subtle bg-bg-inset p-0.5 ${className}`.trim()}
    >
      {locales.map((l) => {
        const active = l === current;
        return (
          <button
            key={l}
            type="button"
            onClick={() => onSelect(l)}
            disabled={isPending || active}
            aria-pressed={active}
            className={[
              "h-7 min-w-[34px] rounded-[6px] px-2 text-[11px] font-semibold transition",
              active
                ? "bg-highlight-soft text-highlight shadow-sm"
                : "text-text-tertiary hover:text-text-primary",
              "focus-visible-ring",
            ].join(" ")}
          >
            {LABELS[l]}
          </button>
        );
      })}
    </div>
  );
}
