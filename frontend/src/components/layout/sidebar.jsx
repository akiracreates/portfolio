"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useId, useMemo, useState } from "react";
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

function useSectionObserver(anchors, enabled) {
  const [active, setActive] = useState("");

  useEffect(() => {
    if (!enabled) return undefined;
    if (!anchors.length) return undefined;

    const elements = anchors
      .map((id) => ({ id, el: document.getElementById(id) }))
      .filter((item) => item.el);
    if (!elements.length) return undefined;

    let raf = null;
    const intersections = new Map();

    const computeActive = () => {
      raf = null;
      const viewportHeight = window.innerHeight || 0;

      if (intersections.size > 0) {
        let best = null;
        intersections.forEach((data, id) => {
          const distance = Math.abs(data.top - viewportHeight * 0.3);
          const score = data.ratio * 1000 - distance;
          if (!best || score > best.score) best = { id, score };
        });
        if (best) {
          setActive(best.id);
          return;
        }
      }

      const doc = document.documentElement;
      const atTop = window.scrollY <= 12;
      const atBottom =
        Math.ceil(window.innerHeight + window.scrollY) >= doc.scrollHeight - 6;
      if (atTop) {
        setActive(anchors[0] ?? "");
        return;
      }
      if (atBottom) {
        setActive(anchors[anchors.length - 1] ?? "");
        return;
      }

      let bestByTop = anchors[0] ?? "";
      for (const item of elements) {
        const top = item.el.getBoundingClientRect().top;
        if (top <= viewportHeight * 0.35) bestByTop = item.id;
      }
      setActive(bestByTop);
    };

    const schedule = () => {
      if (raf !== null) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(computeActive);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            intersections.set(entry.target.id, {
              ratio: entry.intersectionRatio,
              top: entry.boundingClientRect.top,
            });
          } else {
            intersections.delete(entry.target.id);
          }
        });
        schedule();
      },
      {
        root: null,
        threshold: [0, 0.1, 0.2, 0.35, 0.5, 0.7, 1],
        rootMargin: "-20% 0px -55% 0px",
      },
    );

    elements.forEach(({ el }) => observer.observe(el));
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("hashchange", schedule);
    schedule();

    return () => {
      if (raf !== null) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("hashchange", schedule);
      observer.disconnect();
    };
  }, [anchors, enabled]);

  return enabled ? active : "";
}

export function Sidebar({ collapsed = false, onNavigate, variant = "fixed" }) {
  const pathname = usePathname();
  const labelId = useId();
  const t = useT();
  const locale = useDictLocale() || "en";
  const isHome = isHomePathname(pathname, locale);
  const [openSubmenuId, setOpenSubmenuId] = useState(null);

  const activeAnchors = useMemo(() => {
    if (isHome) return navStructure.homepageSections.map((item) => item.anchor);
    const activePage = navStructure.pages.find((item) =>
      isPathActive(pathname, item.href, locale),
    );
    return activePage?.sections?.map((item) => item.anchor) ?? [];
  }, [isHome, locale, pathname]);
  const activeAnchor = useSectionObserver(activeAnchors, activeAnchors.length > 0);

  const handleClick = useCallback(() => {
    if (onNavigate) onNavigate();
  }, [onNavigate]);

  const sectionItems = navStructure.homepageSections;
  const pageItems = navStructure.pages;

  const activeSubmenuId = useMemo(() => {
    const activePageWithSubmenuByPath = pageItems.find(
      (item) => item.sections?.length && isPathActive(pathname, item.href, locale),
    );
    const activePageWithSubmenu = pageItems.find(
      (item) =>
        item.sections?.length &&
        isPathActive(pathname, item.href, locale) &&
        item.sections.some((section) => section.anchor === activeAnchor),
    );
    return activePageWithSubmenu?.id ?? activePageWithSubmenuByPath?.id ?? null;
  }, [activeAnchor, locale, pageItems, pathname]);

  const effectiveOpenSubmenuId = activeSubmenuId ?? openSubmenuId;

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
      <div className="flex h-[var(--topbar-h)] shrink-0 items-center gap-2.5 border-b border-dashed border-border-subtle px-4">
        <Link
          href={`/${locale}`}
          onClick={handleClick}
          className="group -mx-1 flex min-w-0 items-center gap-2.5 rounded-md px-1 py-1 transition-colors hover:text-text-primary"
          aria-label="akira — home"
        >
          <span
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-dashed border-highlight bg-highlight-soft font-display text-[0.95rem] font-semibold text-highlight"
            aria-hidden
          >
            a
          </span>
          <Label collapsed={collapsed}>
            <span className="font-display truncate text-[0.95rem] font-medium text-text-primary">
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

        <div className="broken-divider mx-3 my-3" aria-hidden />

        <NavGroup label={t("nav.more", "more")} collapsed={collapsed}>
          {pageItems.map((item) => {
            const hasSubmenu = Boolean(item.sections?.length);
            const itemPathActive = isPathActive(pathname, item.href, locale);
            const childActive = Boolean(
              hasSubmenu &&
                itemPathActive &&
                item.sections.some((section) => section.anchor === activeAnchor),
            );
            const active = itemPathActive || childActive;
            const href = `/${locale}${item.href === "/" ? "" : item.href}`;
            const submenuOpen = effectiveOpenSubmenuId === item.id || childActive;

            return (
              <li key={item.id} className="space-y-1">
                {hasSubmenu ? (
                  <NavItemToggle
                    iconId={item.icon}
                    label={t(item.labelKey)}
                    active={active}
                    collapsed={collapsed}
                    submenuOpen={submenuOpen}
                    onClick={() => {
                      setOpenSubmenuId((prev) => (prev === item.id ? null : item.id));
                    }}
                  />
                ) : (
                  <NavItem
                    href={href}
                    iconId={item.icon}
                    label={t(item.labelKey)}
                    active={active}
                    collapsed={collapsed}
                    onClick={handleClick}
                    ariaCurrent={itemPathActive ? "page" : undefined}
                    hasSubmenu={false}
                    submenuOpen={false}
                  />
                )}
                <AnimatePresence initial={false}>
                  {hasSubmenu && submenuOpen && !collapsed && (
                    <motion.ul
                      key={`${item.id}-submenu`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.24, ease: [0.2, 0, 0, 1] }}
                      className="overflow-hidden pl-8"
                    >
                      {item.sections.map((section) => {
                        const sectionHref = `${href}#${section.anchor}`;
                        const sectionActive =
                          itemPathActive && activeAnchor === section.anchor;
                        return (
                          <li key={section.id}>
                            <Link
                              href={sectionHref}
                              onClick={handleClick}
                              className={`focus-visible-ring block rounded-md border border-dashed px-3 py-1.5 text-[0.8rem] transition-colors duration-[var(--duration-fast)] ${
                                sectionActive
                                  ? "border-border-accent bg-highlight-soft text-text-primary"
                                  : "border-transparent text-text-tertiary hover:border-border-default hover:bg-bg-surface hover:text-text-primary"
                              }`}
                              aria-current={sectionActive ? "true" : undefined}
                            >
                              {t(section.labelKey)}
                            </Link>
                          </li>
                        );
                      })}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </NavGroup>
      </nav>

      {/* footer: language switcher + socials */}
      <div className="shrink-0 border-t border-dashed border-border-subtle px-4 py-3">
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
                className="flex h-8 w-8 items-center justify-center rounded-md border border-dashed border-transparent text-text-tertiary transition-colors hover:border-border-default hover:bg-bg-surface hover:text-text-primary focus-visible-ring"
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
function Label({ collapsed, children, hide = false }) {
  const shouldHide = collapsed || hide;
  return (
    <motion.span
      className="min-w-0 overflow-hidden whitespace-nowrap"
      initial={false}
      animate={{
        opacity: shouldHide ? 0 : 1,
        maxWidth: shouldHide ? 0 : 220,
      }}
      transition={{
        duration: 0.2,
        ease: [0.2, 0, 0, 1],
        delay: shouldHide ? 0 : 0.04,
      }}
      aria-hidden={shouldHide}
    >
      {children}
    </motion.span>
  );
}

function NavGroup({ label, collapsed, children }) {
  return (
    <div>
      <motion.p
        className="mb-2 px-3 text-[0.7rem] font-semibold text-text-tertiary"
        initial={false}
        animate={{
          opacity: collapsed ? 0 : 1,
          maxHeight: collapsed ? 0 : 24,
          marginBottom: collapsed ? 0 : 8,
        }}
        transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
        aria-hidden={collapsed}
        style={{ overflow: "hidden" }}
      >
        {label}
      </motion.p>
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
  hasSubmenu = false,
  submenuOpen = false,
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`group relative grid grid-cols-[20px_minmax(0,1fr)_auto] items-center gap-3 rounded-md border border-dashed px-3 py-2 text-[0.875rem] transition-colors duration-[var(--duration-fast)] focus-visible-ring ${
        active
          ? "border-border-accent bg-highlight-soft text-text-primary"
          : "border-transparent text-text-secondary hover:border-border-default hover:bg-bg-surface hover:text-text-primary"
      }`}
      aria-current={ariaCurrent}
      title={collapsed ? label : undefined}
    >
      {active && (
        <span
          className="absolute bottom-1.5 left-1 top-1.5 w-[3px] rounded-r-full bg-highlight"
          aria-hidden
        />
      )}
      <span className="flex h-5 w-5 shrink-0 items-center justify-center">
        <NavIcon id={iconId} />
      </span>
      <Label collapsed={collapsed}>
        <span className="truncate">{label}</span>
      </Label>
      {hasSubmenu && !collapsed ? (
        <motion.span
          className="text-text-tertiary"
          initial={false}
          animate={{ rotate: submenuOpen ? 90 : 0, opacity: 1 }}
          transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
          aria-hidden
        >
          ›
        </motion.span>
      ) : null}
      {collapsed && <span className="sr-only">{label}</span>}
    </Link>
  );
}

function NavItemToggle({
  iconId,
  label,
  active,
  collapsed,
  submenuOpen,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative grid w-full grid-cols-[20px_minmax(0,1fr)_auto] items-center gap-3 rounded-md border border-dashed px-3 py-2 text-left text-[0.875rem] transition-colors duration-[var(--duration-fast)] focus-visible-ring ${
        active
          ? "border-border-accent bg-highlight-soft text-text-primary"
          : "border-transparent text-text-secondary hover:border-border-default hover:bg-bg-surface hover:text-text-primary"
      }`}
      aria-expanded={submenuOpen}
      title={collapsed ? label : undefined}
    >
      {active && (
        <span
          className="absolute bottom-1.5 left-1 top-1.5 w-[3px] rounded-r-full bg-highlight"
          aria-hidden
        />
      )}
      <span className="flex h-5 w-5 shrink-0 items-center justify-center">
        <NavIcon id={iconId} />
      </span>
      <Label collapsed={collapsed}>
        <span className="truncate">{label}</span>
      </Label>
      {!collapsed ? (
        <motion.span
          className="text-text-tertiary"
          initial={false}
          animate={{ rotate: submenuOpen ? 90 : 0, opacity: 1 }}
          transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
          aria-hidden
        >
          ›
        </motion.span>
      ) : null}
      {collapsed && <span className="sr-only">{label}</span>}
    </button>
  );
}
