"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { navStructure } from "@/lib/content/site-config";
import { socialLinks } from "@/lib/content/socials";
import { NavIcon } from "@/components/layout/nav-icons";
import { LocaleSwitcher } from "@/components/i18n/locale-switcher";
import { useT, useDictLocale } from "@/components/i18n/locale-provider";

const FOOTER_SOCIALS = ["telegram-personal", "vk", "cara"];
const ACTIVATION_OFFSET = 48;
const CLICK_LOCK_MS = 800;
const SIDEBAR_EASE = [0.22, 1, 0.36, 1];
const SIDEBAR_TRANSITION = { duration: 0.26, ease: SIDEBAR_EASE };
// Used only for vertical distribution of the collapsed-state submenu dots.
// Expanded text rows now drive their own height via measurement, so we no
// longer rely on a hard-coded estimate to size the open submenu.
const SUBMENU_DOT_ROW_HEIGHT = 34;

function isHomePathname(pathname, locale) {
  if (!pathname) return false;
  return pathname === `/${locale}` || pathname === `/${locale}/`;
}

function isPathActive(pathname, href, locale) {
  if (!pathname) return false;
  const fullHref = `/${locale}${href === "/" ? "" : href}`;
  return pathname === fullHref || pathname.startsWith(`${fullHref}/`);
}

function useSectionObserver(anchors, enabled, routeKey) {
  const [activeState, setActiveState] = useState({ routeKey: "", id: "" });
  const lastEmittedRef = useRef("");
  const active =
    activeState.routeKey === routeKey ? activeState.id : anchors[0] || "";

  useEffect(() => {
    if (!enabled) {
      lastEmittedRef.current = "";
      return undefined;
    }
    if (!anchors.length) return undefined;
    lastEmittedRef.current = anchors[0] || "";

    let raf = null;
    let hasAttachedListeners = false;
    let elements = [];

    const emitIfChanged = (nextId) => {
      if (lastEmittedRef.current === nextId) return;
      lastEmittedRef.current = nextId;
      setActiveState({ routeKey, id: nextId });
    };

    const getElements = () =>
      anchors
        .map((id) => ({ id, el: document.getElementById(id) }))
        .filter((item) => item.el);

    const selectElements = () => {
      elements = getElements();
      return elements.length > 0;
    };

    const computeNextActive = () => {
      raf = null;
      elements = getElements();
      if (!elements.length) return anchors[0] || "";
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

      if (!anyPastLine) return elements[0]?.id || "";
      return bestId;
    };

    const schedule = () => {
      if (raf !== null) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        emitIfChanged(computeNextActive());
      });
    };

    const attachListeners = () => {
      if (hasAttachedListeners) return;
      window.addEventListener("scroll", schedule, { passive: true, capture: true });
      window.addEventListener("resize", schedule, { passive: true });
      hasAttachedListeners = true;
      schedule();
    };

    const trySetup = (attempt = 0) => {
      if (selectElements()) {
        attachListeners();
        return;
      }
      if (attempt >= 9) return;
      raf = requestAnimationFrame(() => {
        trySetup(attempt + 1);
      });
    };

    trySetup();

    return () => {
      if (raf !== null) cancelAnimationFrame(raf);
      if (hasAttachedListeners) {
        window.removeEventListener("scroll", schedule, true);
        window.removeEventListener("resize", schedule);
      }
    };
  }, [anchors, enabled, routeKey]);

  return enabled ? active : "";
}

export function Sidebar({ collapsed = false, onNavigate, variant = "fixed" }) {
  const pathname = usePathname();
  const labelId = useId();
  const t = useT();
  const reducedMotion = useReducedMotion();
  const locale = useDictLocale() || "en";
  const isHome = isHomePathname(pathname, locale);
  const [openSubmenuState, setOpenSubmenuState] = useState({
    routeKey: "",
    id: null,
  });
  const [clickLockState, setClickLockState] = useState({
    routeKey: "",
    anchor: "",
  });
  const clickLockTimerRef = useRef(null);
  const openSubmenuId =
    openSubmenuState.routeKey === pathname ? openSubmenuState.id : null;
  const clickLockedSection =
    clickLockState.routeKey === pathname ? clickLockState.anchor : "";

  useEffect(() => {
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
  const activeSection = useSectionObserver(
    activeAnchors,
    activeAnchors.length > 0,
    pathname,
  );
  const resolvedActiveSection = clickLockedSection || activeSection;

  const handleClick = useCallback(() => {
    if (onNavigate) onNavigate();
  }, [onNavigate]);

  const handleSectionClick = useCallback(
    (e, anchor) => {
      const el = document.getElementById(anchor);
      if (el) {
        e.preventDefault();
        setClickLockState({ routeKey: pathname, anchor });
        if (clickLockTimerRef.current) clearTimeout(clickLockTimerRef.current);
        clickLockTimerRef.current = setTimeout(
          () => setClickLockState({ routeKey: pathname, anchor: "" }),
          CLICK_LOCK_MS,
        );
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", pathname);
      }
      if (onNavigate) onNavigate();
    },
    [pathname, onNavigate],
  );

  const currentParentId = activePage?.id ?? null;
  const effectiveOpenSubmenuId = openSubmenuId || currentParentId;
  const motionTransition = reducedMotion ? { duration: 0 } : SIDEBAR_TRANSITION;

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

      {/* nav body — flex-1 + min-h-0 makes this the single scroll region
          inside the sidebar (without min-h-0 the flex child grows to fit
          its content instead of allowing overflow-y to scroll). */}
      <nav
        className="sidebar-scroll min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-2 pb-6 pt-4"
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
            const suppressChildren = item.id === "portfolio";
            const childActive = Boolean(
              hasSubmenu &&
                itemPathActive &&
                item.sections.some(
                  (section) => section.anchor === resolvedActiveSection,
                ),
            );
            const active = itemPathActive || childActive;
            const href = `/${locale}${item.href === "/" ? "" : item.href}`;
            const submenuOpenLogical =
              !suppressChildren &&
              hasSubmenu &&
              (effectiveOpenSubmenuId === item.id || itemPathActive || childActive);
            const fallbackActiveAnchor =
              itemPathActive && hasSubmenu ? item.sections[0]?.anchor : "";
            const currentItemActiveSection =
              resolvedActiveSection || fallbackActiveAnchor;
            const showCollapsedChildren = collapsed && submenuOpenLogical;
            const showExpandedChildren = !collapsed && submenuOpenLogical;

            return (
              <li key={item.id} className="space-y-1">
                {hasSubmenu ? (
                  <NavItemToggle
                    iconId={item.icon}
                    label={t(item.labelKey)}
                    active={active}
                    collapsed={collapsed}
                    submenuOpen={submenuOpenLogical}
                    onClick={() => {
                      setOpenSubmenuState((prev) => {
                        const prevId = prev.routeKey === pathname ? prev.id : null;
                        if (prevId === item.id) {
                          return { routeKey: pathname, id: null };
                        }
                        return { routeKey: pathname, id: item.id };
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
                {hasSubmenu && !suppressChildren ? (
                  <SubmenuPanel
                    item={item}
                    href={href}
                    collapsed={collapsed}
                    submenuOpenLogical={submenuOpenLogical}
                    showExpandedChildren={showExpandedChildren}
                    showCollapsedChildren={showCollapsedChildren}
                    motionTransition={motionTransition}
                    reducedMotion={reducedMotion}
                    itemPathActive={itemPathActive}
                    currentItemActiveSection={currentItemActiveSection}
                    handleSectionClick={handleSectionClick}
                    t={t}
                  />
                ) : null}
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
                aria-label={locale === "ru" ? (s.labelRu ?? s.label) : s.label}
                title={locale === "ru" ? (s.labelRu ?? s.label) : s.label}
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
        x: shouldHide ? -4 : 0,
      }}
      transition={{
        duration: 0.18,
        ease: SIDEBAR_EASE,
        delay: shouldHide ? 0 : 0.03,
      }}
      aria-hidden={shouldHide}
      style={{ visibility: shouldHide ? "hidden" : "visible" }}
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
          y: collapsed ? -3 : 0,
          marginBottom: collapsed ? 0 : 8,
        }}
        transition={SIDEBAR_TRANSITION}
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
          transition={SIDEBAR_TRANSITION}
          aria-hidden
        >
          ›
        </motion.span>
      ) : null}
      {collapsed && <span className="sr-only">{label}</span>}
    </Link>
  );
}

function SubmenuPanel({
  item,
  href,
  collapsed,
  submenuOpenLogical,
  showExpandedChildren,
  showCollapsedChildren,
  motionTransition,
  reducedMotion,
  itemPathActive,
  currentItemActiveSection,
  handleSectionClick,
  t,
}) {
  // Measure the expanded list's natural height so the wrapper can animate to
  // the real content height instead of a fixed per-row estimate. The previous
  // fixed estimate clipped longer lists (e.g. About / Work with me).
  const expandedListRef = useRef(null);
  const [naturalHeight, setNaturalHeight] = useState(0);

  useEffect(() => {
    const el = expandedListRef.current;
    if (!el) return undefined;
    const update = () => setNaturalHeight(el.scrollHeight);
    update();
    if (typeof ResizeObserver === "undefined") return undefined;
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const collapsedDotsHeight =
    item.sections.length * SUBMENU_DOT_ROW_HEIGHT;
  const openHeight = collapsed ? collapsedDotsHeight : naturalHeight;

  return (
    <motion.div
      initial={false}
      animate={{
        opacity: submenuOpenLogical ? 1 : 0,
        height: submenuOpenLogical ? openHeight : 0,
      }}
      transition={motionTransition}
      className="relative overflow-hidden"
      aria-hidden={!submenuOpenLogical}
      style={{ pointerEvents: submenuOpenLogical ? "auto" : "none" }}
    >
      <motion.ul
        ref={expandedListRef}
        initial={false}
        animate={{
          opacity: showExpandedChildren ? 1 : 0,
          y: showExpandedChildren ? 0 : -3,
        }}
        transition={{
          ...motionTransition,
          delay: showExpandedChildren && !reducedMotion ? 0.03 : 0,
        }}
        className="pl-8"
        aria-hidden={!showExpandedChildren}
        style={{ pointerEvents: showExpandedChildren ? "auto" : "none" }}
      >
        {item.sections.map((section) => {
          const sectionHref = `${href}#${section.anchor}`;
          const sectionActive =
            itemPathActive && currentItemActiveSection === section.anchor;
          return (
            <li key={section.id}>
              <Link
                href={sectionHref}
                onClick={(e) => handleSectionClick(e, section.anchor)}
                className={`focus-visible-ring block whitespace-nowrap rounded-md border border-dashed px-3 py-1.5 text-[0.8rem] transition-colors duration-[var(--duration-fast)] ${
                  sectionActive
                    ? "border-border-accent bg-highlight-soft text-text-primary"
                    : "border-transparent text-text-tertiary hover:border-border-default hover:bg-bg-surface hover:text-text-primary"
                }`}
                aria-current={sectionActive ? "location" : undefined}
                tabIndex={showExpandedChildren ? 0 : -1}
              >
                {t(section.labelKey)}
              </Link>
            </li>
          );
        })}
      </motion.ul>
      <motion.ul
        initial={false}
        animate={{ opacity: showCollapsedChildren ? 1 : 0 }}
        transition={{
          ...motionTransition,
          delay: showCollapsedChildren && !reducedMotion ? 0.02 : 0,
        }}
        className="absolute inset-x-0 top-0 ml-[18px] flex w-[20px] flex-col items-center justify-between"
        aria-hidden={!showCollapsedChildren}
        style={{
          pointerEvents: showCollapsedChildren ? "auto" : "none",
          height: collapsedDotsHeight,
        }}
      >
        {item.sections.map((section) => {
          const sectionHref = `${href}#${section.anchor}`;
          const sectionActive =
            itemPathActive && currentItemActiveSection === section.anchor;
          return (
            <li
              key={`${section.id}-collapsed`}
              className="flex h-[34px] items-center"
            >
              <Link
                href={sectionHref}
                onClick={(e) => handleSectionClick(e, section.anchor)}
                className={`focus-visible-ring block h-2.5 w-2.5 rounded-full border border-dashed transition-all duration-[var(--duration-fast)] ${
                  sectionActive
                    ? "border-border-accent bg-highlight shadow-[0_0_10px_rgba(233,102,160,0.35)]"
                    : "border-border-default/70 bg-highlight-soft hover:border-border-accent hover:bg-highlight/70"
                }`}
                aria-label={t(section.labelKey)}
                title={t(section.labelKey)}
                aria-current={sectionActive ? "location" : undefined}
              />
            </li>
          );
        })}
      </motion.ul>
    </motion.div>
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
          transition={SIDEBAR_TRANSITION}
          aria-hidden
        >
          ›
        </motion.span>
      ) : null}
      {collapsed && <span className="sr-only">{label}</span>}
    </button>
  );
}
