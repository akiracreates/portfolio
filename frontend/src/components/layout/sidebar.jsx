"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useState } from "react";
import { navStructure } from "@/lib/content/site-config";
import { socialLinks } from "@/lib/content/socials";
import { NavIcon } from "@/components/layout/nav-icons";
import { LocaleSwitcher } from "@/components/i18n/locale-switcher";
import { useT, useDictLocale } from "@/components/i18n/locale-provider";

const FOOTER_SOCIALS = ["telegram", "vk", "cara"];

function isHomePathname(pathname, locale) {
  if (!pathname) return false;
  return pathname === `/${locale}` || pathname === `/${locale}/`;
}

function isPathActive(pathname, href, locale) {
  if (!pathname) return false;
  const fullHref = `/${locale}${href === "/" ? "" : href}`;
  return pathname === fullHref || pathname.startsWith(`${fullHref}/`);
}

/**
 * Tracks which `homepageSections` anchor is currently in view. Only runs when
 * we're actually on the home route — sub-pages don't get scroll-spy state.
 */
function useScrollSpy(anchors, enabled) {
  const [activeRaw, setActive] = useState("");
  useEffect(() => {
    if (!enabled) return undefined;
    const observers = [];
    anchors.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActive(id);
          });
        },
        { rootMargin: "-45% 0px -45% 0px", threshold: 0.01 },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [anchors, enabled]);
  return enabled ? activeRaw : "";
}

export function Sidebar({ collapsed = false, onNavigate, variant = "fixed" }) {
  const pathname = usePathname();
  const labelId = useId();
  const t = useT();
  const locale = useDictLocale() || "en";
  const isHome = isHomePathname(pathname, locale);

  const anchors = navStructure.homepageSections.map((i) => i.anchor);
  const activeAnchor = useScrollSpy(anchors, isHome);

  const handleClick = useCallback(() => {
    if (onNavigate) onNavigate();
  }, [onNavigate]);

  const sectionItems = navStructure.homepageSections;
  const pageItems = navStructure.pages;

  const visibleSocials = socialLinks.filter((s) =>
    FOOTER_SOCIALS.includes(s.id),
  );

  return (
    <div
      className="flex h-full w-full flex-col overflow-hidden bg-bg-sidebar text-text-secondary"
      aria-labelledby={labelId}
      data-variant={variant}
      data-collapsed={collapsed ? "true" : "false"}
    >
      <span id={labelId} className="sr-only">
        {t("nav.primaryNavigation", "primary navigation")}
      </span>

      {/* brand row */}
      <div className="flex h-[var(--topbar-h)] shrink-0 items-center gap-2.5 border-b border-border-subtle px-4">
        <Link
          href={`/${locale}`}
          onClick={handleClick}
          className="group flex min-w-0 items-center gap-2.5 rounded-md py-1 -mx-1 px-1 transition-colors hover:text-text-primary"
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
          <Label collapsed={collapsed}>
            <span className="font-display truncate text-[0.95rem] font-medium tracking-tight text-text-primary">
              akira
            </span>
          </Label>
        </Link>
      </div>

      {/* nav body */}
      <nav
        className="flex-1 overflow-y-auto overflow-x-hidden px-2 py-4"
        aria-label="primary"
      >
        <NavGroup
          label={t("nav.onThisPage", "on this page")}
          collapsed={collapsed}
        >
          {sectionItems.map((item) => {
            const active = isHome && activeAnchor === item.anchor;
            const href = `/${locale}#${item.anchor}`;
            return (
              <NavItem
                key={item.id}
                href={href}
                iconId={item.icon}
                label={t(item.labelKey)}
                active={active}
                collapsed={collapsed}
                onClick={handleClick}
              />
            );
          })}
        </NavGroup>

        <div className="my-3 mx-3 h-px bg-border-subtle" aria-hidden />

        <NavGroup label={t("nav.more", "more")} collapsed={collapsed}>
          {pageItems.map((item) => {
            const active = isPathActive(pathname, item.href, locale);
            const href = `/${locale}${item.href === "/" ? "" : item.href}`;
            return (
              <NavItem
                key={item.id}
                href={href}
                iconId={item.icon}
                label={t(item.labelKey)}
                active={active}
                collapsed={collapsed}
                onClick={handleClick}
                ariaCurrent={active ? "page" : undefined}
              />
            );
          })}
        </NavGroup>
      </nav>

      {/* footer: language switcher + socials */}
      <div className="shrink-0 border-t border-border-subtle px-4 py-3">
        <div
          className="flex items-center justify-between gap-3 transition-opacity duration-[var(--duration-base)]"
          style={{
            opacity: collapsed ? 0 : 1,
            visibility: collapsed ? "hidden" : "visible",
          }}
          aria-hidden={collapsed}
        >
          <LocaleSwitcher collapsed={false} />
          <div className="flex items-center gap-1">
            {visibleSocials.map((s) => (
              <a
                key={s.id}
                href={s.url}
                target={s.id === "email" ? undefined : "_blank"}
                rel={s.id === "email" ? undefined : "noreferrer noopener"}
                className="flex h-8 w-8 items-center justify-center rounded-md text-text-tertiary transition-colors hover:bg-bg-surface hover:text-text-primary focus-visible-ring"
                aria-label={s.label}
                title={s.label}
                tabIndex={collapsed ? -1 : 0}
              >
                <NavIcon id={s.id} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * `Label` keeps the label always mounted but smoothly fades + shrinks its
 * width when the sidebar is collapsed. This avoids layout flashes that we'd
 * otherwise get from mounting/unmounting on every hover.
 */
function Label({ collapsed, children }) {
  return (
    <span
      className="min-w-0 overflow-hidden transition-[opacity,max-width] duration-[var(--duration-base)] ease-[var(--ease-out)]"
      style={{
        opacity: collapsed ? 0 : 1,
        maxWidth: collapsed ? "0px" : "180px",
      }}
      aria-hidden={collapsed}
    >
      {children}
    </span>
  );
}

function NavGroup({ label, collapsed, children }) {
  return (
    <div>
      <p
        className="mb-2 px-3 text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-text-tertiary transition-opacity duration-[var(--duration-base)]"
        style={{
          opacity: collapsed ? 0 : 1,
          visibility: collapsed ? "hidden" : "visible",
          height: collapsed ? "0" : undefined,
          marginBottom: collapsed ? "0" : undefined,
        }}
        aria-hidden={collapsed}
      >
        {label}
      </p>
      <ul className="space-y-0.5">{children}</ul>
    </div>
  );
}

function NavItem({
  href,
  iconId,
  label,
  active,
  collapsed,
  onClick,
  ariaCurrent,
}) {
  return (
    <li>
      <Link
        href={href}
        onClick={onClick}
        className={`group relative flex items-center gap-3 rounded-md px-3 py-2 text-[0.875rem] transition-colors duration-[var(--duration-fast)] focus-visible-ring ${
          active
            ? "bg-accent-soft text-text-primary"
            : "text-text-secondary hover:bg-bg-surface hover:text-text-primary"
        }`}
        aria-current={ariaCurrent}
        title={collapsed ? label : undefined}
      >
        {active && (
          <span
            className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r-full bg-accent-2"
            aria-hidden
          />
        )}
        <span className="flex h-5 w-5 shrink-0 items-center justify-center">
          <NavIcon id={iconId} />
        </span>
        <Label collapsed={collapsed}>
          <span className="truncate">{label}</span>
        </Label>
        {collapsed && <span className="sr-only">{label}</span>}
      </Link>
    </li>
  );
}
