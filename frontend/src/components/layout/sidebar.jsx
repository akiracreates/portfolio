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
 *
 * Derive `active` instead of clearing it via setState in the effect body so
 * React 19's stricter lint rules stay happy.
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

export function Sidebar({
  collapsed = false,
  onToggleCollapsed,
  showCollapseToggle = true,
  onNavigate,
  variant = "fixed",
}) {
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
      className="flex h-full w-full flex-col bg-bg-sidebar text-text-secondary"
      aria-labelledby={labelId}
      data-variant={variant}
    >
      <span id={labelId} className="sr-only">
        {t("nav.primaryNavigation", "primary navigation")}
      </span>

      {/* brand row */}
      <div
        className={`flex h-[var(--topbar-h)] shrink-0 items-center border-b border-border-subtle ${
          collapsed ? "justify-center px-2" : "justify-between px-4"
        }`}
      >
        <Link
          href={`/${locale}`}
          onClick={handleClick}
          className="group flex min-w-0 items-center gap-2.5 rounded-md px-1 py-1 -mx-1 transition-colors hover:text-text-primary"
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
          {!collapsed && (
            <span className="font-display truncate text-[0.95rem] font-medium tracking-tight text-text-primary">
              akira
            </span>
          )}
        </Link>
        {!collapsed && showCollapseToggle && onToggleCollapsed && (
          <button
            type="button"
            className="flex h-7 w-7 items-center justify-center rounded-md text-text-tertiary transition-colors hover:bg-bg-surface hover:text-text-primary focus-visible-ring"
            onClick={onToggleCollapsed}
            aria-label={t("common.collapseSidebar", "collapse sidebar")}
            title={t("common.collapseSidebar", "collapse sidebar")}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M15 6 9 12l6 6" />
            </svg>
          </button>
        )}
      </div>

      {/* nav body */}
      <nav
        className="flex-1 overflow-y-auto overflow-x-hidden px-2 py-4"
        aria-label="primary"
      >
        {collapsed && showCollapseToggle && onToggleCollapsed && (
          <div className="mb-3 flex justify-center">
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-md text-text-tertiary transition-colors hover:bg-bg-surface hover:text-text-primary focus-visible-ring"
              onClick={onToggleCollapsed}
              aria-label={t("common.expandSidebar", "expand sidebar")}
              title={t("common.expandSidebar", "expand sidebar")}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="m9 6 6 6-6 6" />
              </svg>
            </button>
          </div>
        )}

        {/* group 1: on this page */}
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

        {/* divider between groups */}
        <div
          className={`my-3 ${collapsed ? "mx-2" : "mx-3"} h-px bg-border-subtle`}
          aria-hidden
        />

        {/* group 2: pages */}
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
      <div
        className={`shrink-0 border-t border-border-subtle py-3 ${
          collapsed ? "px-2" : "px-4"
        }`}
      >
        <div
          className={`flex ${
            collapsed
              ? "flex-col items-center gap-2"
              : "items-center justify-between gap-3"
          }`}
        >
          <LocaleSwitcher collapsed={collapsed} />
          <div
            className={`flex ${collapsed ? "flex-col gap-1.5" : "items-center gap-1"}`}
          >
            {visibleSocials.map((s) => (
              <a
                key={s.id}
                href={s.url}
                target={s.id === "email" ? undefined : "_blank"}
                rel={s.id === "email" ? undefined : "noreferrer noopener"}
                className="flex h-8 w-8 items-center justify-center rounded-md text-text-tertiary transition-colors hover:bg-bg-surface hover:text-text-primary focus-visible-ring"
                aria-label={s.label}
                title={s.label}
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

function NavGroup({ label, collapsed, children }) {
  return (
    <div>
      {!collapsed && (
        <p className="mb-2 px-3 text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-text-tertiary">
          {label}
        </p>
      )}
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
        className={`group relative flex items-center rounded-md text-[0.875rem] transition-colors duration-[var(--duration-fast)] focus-visible-ring ${
          collapsed
            ? "justify-center px-0 py-2 mx-1"
            : "gap-3 px-3 py-2"
        } ${
          active
            ? "bg-accent-soft text-text-primary"
            : "text-text-secondary hover:bg-bg-surface hover:text-text-primary"
        }`}
        aria-current={ariaCurrent}
        title={collapsed ? label : undefined}
      >
        {active && !collapsed && (
          <span
            className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r-full bg-accent-2"
            aria-hidden
          />
        )}
        <NavIcon id={iconId} />
        {!collapsed && <span className="truncate">{label}</span>}
        {collapsed && <span className="sr-only">{label}</span>}
      </Link>
    </li>
  );
}
