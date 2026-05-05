"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useTransition } from "react";
import { locales } from "@/lib/i18n/config";
import { useLocale } from "@/lib/i18n/use-locale";

const LABELS = {
  en: "EN",
  ru: "RU",
};

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

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

export function LocaleSwitcher({ collapsed = false, className = "" }) {
  const router = useRouter();
  const pathname = usePathname();
  const current = useLocale();
  const [isPending, startTransition] = useTransition();

  const onSelect = useCallback(
    (next) => {
      if (next === current) return;
      setLocaleCookie(next);
      const target = swapLocale(pathname || `/${current}`, next);
      startTransition(() => {
        router.push(target);
        router.refresh();
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
        className={`flex h-9 w-full items-center justify-center rounded-md text-[11px] font-semibold uppercase tracking-[0.18em] text-text-secondary transition hover:bg-bg-surface hover:text-text-primary focus-visible-ring disabled:opacity-60 ${className}`.trim()}
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
      className={`inline-flex items-center gap-1 rounded-md border border-border-subtle bg-bg-inset p-0.5 ${className}`.trim()}
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
              "h-7 min-w-[34px] rounded-[6px] px-2 text-[11px] font-semibold uppercase tracking-[0.18em] transition",
              active
                ? "bg-bg-surface-raised text-text-primary shadow-sm"
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
