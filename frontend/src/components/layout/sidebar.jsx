"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { navStructure } from "@/lib/content/site-config";
import { socialLinks } from "@/lib/content/socials";
import { NavIcon } from "@/components/layout/nav-icons";
import { LocaleSwitcher } from "@/components/i18n/locale-switcher";
import { useT, useDictLocale } from "@/components/i18n/locale-provider";

const FOOTER_SOCIALS = ["telegram", "vk", "cara"];
const ACTIVATION_OFFSET = 48;
const CLICK_LOCK_MS = 800;

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
  const lastEmittedRef = useRef("");

  useEffect(() => {
    if (!enabled) {
      lastEmittedRef.current = "";
      setActive("");
      return undefined;
    }
    if (!anchors.length) return undefined;

    const elements = anchors
      .map((id) => ({ id, el: document.getElementById(id) }))
      .filter((item) => item.el);
    if (!elements.length) return undefined;

    let raf = null;

    const emitIfChanged = (nextId) => {
      if (lastEmittedRef.current === nextId) return;
      lastEmittedRef.current = nextId;
      setActive(nextId);
    };

    const computeNextActive = () => {
      raf = null;
      const line = ACTIVATION_OFFSET;
      let bestId = "";
      let bestScore = Number.NEGATIVE_INFINITY;
      let anyPastLine = false;

      for (const { id, el } of elements) {
        const rect = el.getBoundingClientRect();
        const pastLine = rect.top <= line;
        const spansLine = pastLine && rect.bottom >= line;

        if (pastLine) anyPastLine = true;

        let score = -Math.abs(line - rect.top);
        if (pastLine) score += 1000;
        if (spansLine) score += 5000;

        if (score > bestScore) {
          bestScore = score;
          bestId = id;
        }
      }

      if (!anyPastLine) return "";
      return bestId;
    };

    const schedule = () => {
      if (raf !== null) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        emitIfChanged(computeNextActive());
      });
    };

    window.addEventListener("scroll", schedule, { passive: true, capture: true });
    window.addEventListener("resize", schedule, { passive: true });
    schedule();

    return () => {
      if (raf !== null) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule, true);
      window.removeEventListener("resize", schedule);
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
  const [clickLockedSection, setClickLockedSection] = useState("");
  const clickLockTimerRef = useRef(null);

  useEffect(() => {
    setOpenSubmenuId(null);
    setClickLockedSection("");
    if (clickLockTimerRef.current) {
      clearTimeout(clickLockTimerRef.current);
      clickLockTimerRef.current = null;
    }
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (clickLockTimerRef.current) clearTimeout(clickLockTimerRef.current);
    };
  }, []);

  const pageItems = navStructure.pages;
  const sectionItems = navStructure.homepageSections;
  const activePage = useMemo(() => {
    if (isHome) return null;
    return (
      pageItems.find((item) => isPathActive(pathname, item.href, locale)) ?? null
    );
  }, [isHome, locale, pageItems, pathname]);
  const activeAnchors = useMemo(
    () =>
      isHome
        ? sectionItems.map((item) => item.anchor)
        : activePage?.sections?.map((item) => item.anchor) ?? [],
    [activePage?.sections, isHome, sectionItems],
  );
  const activeSection = useSectionObserver(activeAnchors, activeAnchors.length > 0);
  const resolvedActiveSection = clickLockedSection || activeSection;

  const handleClick = useCallback(() => {
    if (onNavigate) onNavigate();
  }, [onNavigate]);

  const handleSectionClick = useCallback(
    (e, anchor) => {
      const el = document.getElementById(anchor);
      if (el) {
        e.preventDefault();
        setClickLockedSection(anchor);
        if (clickLockTimerRef.current) clearTimeout(clickLockTimerRef.current);
        clickLockTimerRef.current = setTimeout(
          () => setClickLockedSection(""),
          CLICK_LOCK_MS,
        );
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", pathname);
      }
      if (onNavigate) onNavigate();
    },
    [pathname, onNavigate],
  );

  const effectiveOpenSubmenuId = useMemo(() => {
    if (collapsed) return null;
    if (openSubmenuId) return openSubmenuId;
    if (activePage?.sections?.length) return activePage.id;
    return null;
  }, [activePage, collapsed, openSubmenuId]);

  const activeSubmenuId = useMemo(() => {
    if (!activePage?.sections?.length) return null;
    const bySection = activePage.sections.find(
      (section) => section.anchor === resolvedActiveSection,
    );
    if (bySection) return activePage.id;
    return null;
  }, [activePage, resolvedActiveSection]);

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
            const active = isHome && resolvedActiveSection === item.anchor;
            const href = `/${locale}#${item.anchor}`;
            return (
              <NavItem
                key={item.id}
                href={href}
                iconId={item.icon}
                label={t(item.labelKey)}
                active={active}
                collapsed={collapsed}
                onClick={(e) => handleSectionClick(e, item.anchor)}
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
                item.sections.some(
                  (section) => section.anchor === resolvedActiveSection,
                ),
            );
            const active = itemPathActive || childActive;
            const href = `/${locale}${item.href === "/" ? "" : item.href}`;
            const submenuOpen =
              effectiveOpenSubmenuId === item.id ||
              activeSubmenuId === item.id ||
              childActive;

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
                      setOpenSubmenuId((prev) => {
                        if (prev === item.id) return null;
                        return item.id;
                      });
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
                          itemPathActive &&
                          resolvedActiveSection === section.anchor;
                        return (
                          <li key={section.id}>
                            <Link
                              href={sectionHref}
                              onClick={(e) =>
                                handleSectionClick(e, section.anchor)
                              }
                              className={`focus-visible-ring block rounded-md border border-dashed px-3 py-1.5 text-[0.8rem] transition-colors duration-[var(--duration-fast)] ${
                                sectionActive
                                  ? "border-border-accent bg-highlight-soft text-text-primary"
                                  : "border-transparent text-text-tertiary hover:border-border-default hover:bg-bg-surface hover:text-text-primary"
                              }`}
                              aria-current={
                                sectionActive ? "location" : undefined
                              }
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
