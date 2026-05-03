"use client";

import Link from "next/link";
import { motion, useReducedMotion as useFramerReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { homeScrollSectionIds } from "@/lib/content/site-config";
import { NavIcon } from "@/components/layout/nav-icons";

const W_COLLAPSED = 56;
const W_EXPANDED = 200;

function subscribeHoverMql(callback) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getHoverSnapshot() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export function SidebarNav({ items }) {
  const pathname = usePathname();
  const reduceMotion = useFramerReducedMotion();
  const supportsHover = useSyncExternalStore(subscribeHoverMql, getHoverSnapshot, () => true);

  const [hoverOpen, setHoverOpen] = useState(false);
  const [touchOpen, setTouchOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const isHome = pathname === "/";

  const sectionItems = useMemo(
    () => items.filter((item) => item.href.startsWith("/#")),
    [items],
  );
  const pageItems = useMemo(
    () => items.filter((item) => !item.href.startsWith("/#")),
    [items],
  );

  const primaryNavItems = useMemo(() => {
    if (isHome) return sectionItems;
    return pageItems;
  }, [isHome, sectionItems, pageItems]);

  const secondaryNavItems = useMemo(() => {
    if (isHome) return pageItems;
    return sectionItems;
  }, [isHome, sectionItems, pageItems]);

  const expanded = pinned || (supportsHover ? hoverOpen : touchOpen);
  const width = expanded ? W_EXPANDED : W_COLLAPSED;

  useEffect(() => {
    if (!isHome) {
      queueMicrotask(() => setActiveSection(""));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          visible.sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top),
          );
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-38% 0px -38% 0px", threshold: 0.06 },
    );

    homeScrollSectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isHome]);

  const isActive = useCallback(
    (item) => {
      if (item.href.startsWith("/#")) {
        return isHome && activeSection === item.id;
      }
      return pathname === item.href;
    },
    [isHome, activeSection, pathname],
  );

  const handleAsidePointer = () => {
    if (!supportsHover) setTouchOpen((o) => !o);
  };

  return (
    <>
      <motion.aside
        id="sidebar-nav"
        className="hidden md:flex flex-col shrink-0 sticky top-3 z-30 my-0 ml-3 h-[calc(100dvh-1.5rem)] max-h-[calc(100dvh-1.5rem)] self-start rounded-3xl border-2 border-dashed border-primary/35 bg-bg-surface/95 py-2 shadow-lg backdrop-blur-sm"
        initial={false}
        animate={{ width }}
        transition={
          reduceMotion
            ? { duration: 0.18 }
            : { type: "spring", stiffness: 520, damping: 42 }
        }
        onMouseEnter={() => supportsHover && setHoverOpen(true)}
        onMouseLeave={() => supportsHover && !pinned && setHoverOpen(false)}
      >
        <div className="flex shrink-0 items-center justify-between gap-1 border-b border-dashed border-primary/25 px-2.5 pb-2 pt-1">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-2 text-primary"
            onClick={() => {
              if (!supportsHover) setTouchOpen(false);
            }}
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border-2 border-dashed border-primary/60 bg-primary/10 text-sm font-bold text-primary">
              a
            </span>
            <span
              className="min-w-0 truncate text-sm font-medium"
              style={{
                opacity: expanded ? 1 : 0,
                width: expanded ? "auto" : 0,
                overflow: "hidden",
                whiteSpace: "nowrap",
                transition: "opacity 0.2s ease",
              }}
            >
              akira
            </span>
          </Link>
          <div className="flex items-center gap-0.5">
            {!supportsHover && (
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-dashed border-primary/35 text-text-tertiary transition hover:border-primary hover:text-primary"
                aria-expanded={expanded}
                aria-controls="sidebar-nav-links"
                onClick={handleAsidePointer}
              >
                <span className="sr-only">toggle navigation labels</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  {expanded ? (
                    <polyline points="15 18 9 12 15 6" strokeLinecap="round" strokeLinejoin="round" />
                  ) : (
                    <polyline points="9 18 15 12 9 6" strokeLinecap="round" strokeLinejoin="round" />
                  )}
                </svg>
              </button>
            )}
            <button
              type="button"
              className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-dashed transition ${
                pinned
                  ? "border-secondary bg-secondary/15 text-secondary"
                  : "border-primary/30 text-text-tertiary hover:border-primary/55"
              }`}
              aria-pressed={pinned}
              onClick={() => setPinned((p) => !p)}
              title={pinned ? "unpin sidebar" : "pin sidebar open"}
            >
              <span className="sr-only">{pinned ? "unpin sidebar" : "pin sidebar open"}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill={pinned ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M12 17v5M9 14l-5 2 2-5-4-4 5-1 3-5 3 5 5 1-4 4 2 5-5-2z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <nav
          id="sidebar-nav-links"
          className="flex flex-1 flex-col gap-0.5 overflow-x-hidden overflow-y-auto px-2 py-3"
          aria-label="main navigation"
        >
          {primaryNavItems.map((item) => (
            <NavRow key={item.id} item={item} active={isActive(item)} expanded={expanded} />
          ))}

          {secondaryNavItems.length > 0 && (
            <>
              <div className="divider-subtle mx-1 my-2" />
              {secondaryNavItems.map((item) => (
                <NavRow key={item.id} item={item} active={isActive(item)} expanded={expanded} />
              ))}
            </>
          )}
        </nav>
      </motion.aside>

      <MobileBottomNav
        pathname={pathname}
        isHome={isHome}
        activeSection={activeSection}
      />
    </>
  );
}

function NavRow({ item, active, expanded }) {
  return (
    <Link
      href={item.href}
          className={`group relative flex items-center gap-2.5 rounded-full border px-2.5 py-2 text-[0.78rem] font-semibold transition-all duration-[var(--duration-base)] ${
        active
          ? "border-dashed border-primary bg-primary/12 text-primary"
          : "border-transparent text-text-tertiary hover:border-dashed hover:border-primary/35 hover:bg-bg-surface-hover hover:text-text-secondary"
      }`}
    >
      <NavIcon
        id={item.id}
        className={
          active ? "text-primary" : "text-text-tertiary group-hover:text-text-secondary"
        }
      />
      <span className={expanded ? "min-w-0 truncate" : "sr-only"}>{item.label}</span>
    </Link>
  );
}

function MobileBottomNav({ pathname, isHome, activeSection }) {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const reduceMotion = useFramerReducedMotion();

  useEffect(() => {
    if (reduceMotion) return undefined;
    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastY.current + 12 && y > 96) setHidden(true);
      else if (y < lastY.current - 12 || y < 48) setHidden(false);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduceMotion]);

  return (
    <motion.nav
      className={`fixed inset-x-0 bottom-0 z-50 md:hidden rounded-t-3xl border-t-2 border-dashed border-primary/40 bg-bg-surface/95 shadow-[0_-8px_32px_rgba(0,0,0,0.35)] backdrop-blur-md ${
        hidden && !reduceMotion ? "pointer-events-none" : ""
      }`}
      style={{
        paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))",
      }}
      aria-label="mobile navigation"
      initial={false}
      animate={
        reduceMotion
          ? { y: 0, opacity: 1 }
          : { y: hidden ? "100%" : 0, opacity: hidden ? 0 : 1 }
      }
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex h-14 items-center justify-around px-1">
        <MobileNavLink
          href="/"
          label="home"
          active={(pathname === "/" && !activeSection) || activeSection === "hero"}
        />
        <MobileNavLink
          href={isHome ? "/#about-preview" : "/about"}
          label="about"
          active={isHome ? activeSection === "about-preview" : pathname === "/about"}
        />
        <MobileNavLink
          href={isHome ? "/#portfolio-preview" : "/portfolio"}
          label="work"
          active={isHome ? activeSection === "portfolio-preview" : pathname === "/portfolio"}
        />
        <MobileNavLink
          href={isHome ? "/#commissions-preview" : "/commissions"}
          label="order"
          active={isHome ? activeSection === "commissions-preview" : pathname === "/commissions"}
        />
        <MobileNavLink
          href={isHome ? "/#contact" : "/contact"}
          label="contact"
          active={isHome ? activeSection === "contact" : pathname === "/contact"}
        />
      </div>
    </motion.nav>
  );
}

function MobileNavLink({ href, label, active }) {
  return (
    <Link
      href={href}
      className={`flex min-w-0 flex-1 flex-col items-center gap-1 rounded-2xl border border-transparent px-1 py-1.5 text-[0.65rem] font-semibold transition-all duration-150 ${
        active ? "border-dashed border-primary text-primary" : "text-text-tertiary"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full transition-colors duration-150 ${
          active ? "bg-primary" : "bg-border-default"
        }`}
        aria-hidden
      />
      <span className="truncate">{label}</span>
    </Link>
  );
}
