"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const HOME_SECTIONS = ["hero", "about-preview", "portfolio-preview", "commissions-preview", "contact"];

export function SidebarNav({ items }) {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const sidebarRef = useRef(null);

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

  useEffect(() => {
    if (!isHome) {
      setActiveSection("");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          visible.sort((a, b) =>
            Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top),
          );
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0.05 },
    );

    HOME_SECTIONS.forEach((id) => {
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

  return (
    <>
      {/* ── desktop / tablet sidebar ── */}
      <aside
        ref={sidebarRef}
        className="hidden md:flex flex-col shrink-0 sticky top-0 h-screen border-r border-border-subtle bg-bg-elevated/80 backdrop-blur-sm transition-[width] duration-[250ms]"
        style={{
          width: expanded ? "var(--sidebar-expanded)" : "var(--sidebar-collapsed)",
          transitionTimingFunction: "var(--ease-spring)",
        }}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        onFocus={() => setExpanded(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) setExpanded(false);
        }}
      >
        <div className="flex items-center h-14 px-4 border-b border-border-subtle shrink-0">
          <Link href="/" className="flex items-center gap-2 text-text-primary">
            <span className="flex items-center justify-center w-7 h-7 rounded-md bg-primary/20 text-primary text-xs font-semibold">
              a
            </span>
            <span
              className="text-sm font-medium overflow-hidden whitespace-nowrap transition-opacity duration-200"
              style={{ opacity: expanded ? 1 : 0, width: expanded ? "auto" : 0 }}
            >
              akira
            </span>
          </Link>
        </div>

        <nav className="flex-1 flex flex-col gap-0.5 px-2 py-3 overflow-y-auto overflow-x-hidden" aria-label="main navigation">
          {primaryNavItems.map((item) => (
            <NavLink key={item.id} item={item} active={isActive(item)} expanded={expanded} />
          ))}

          {secondaryNavItems.length > 0 && (
            <>
              <div className="divider-subtle mx-2 my-2" />
              {secondaryNavItems.map((item) => (
                <NavLink key={item.id} item={item} active={isActive(item)} expanded={expanded} />
              ))}
            </>
          )}
        </nav>
      </aside>

      {/* ── mobile bottom nav (fixed, outside flex flow) ── */}
      <nav
        className="fixed bottom-0 inset-x-0 z-50 md:hidden border-t border-border-subtle bg-bg-elevated/90 backdrop-blur-md"
        aria-label="mobile navigation"
      >
        <div className="flex items-center justify-around h-14 px-2 safe-area-bottom">
          <MobileNavLink href="/" label="home" active={(pathname === "/" && !activeSection) || activeSection === "hero"} />
          <MobileNavLink href={isHome ? "/#about-preview" : "/about"} label="about" active={isHome ? activeSection === "about-preview" : pathname === "/about"} />
          <MobileNavLink href={isHome ? "/#portfolio-preview" : "/portfolio"} label="work" active={isHome ? activeSection === "portfolio-preview" : pathname === "/portfolio"} />
          <MobileNavLink href={isHome ? "/#commissions-preview" : "/commissions"} label="order" active={isHome ? activeSection === "commissions-preview" : pathname === "/commissions"} />
          <MobileNavLink href={isHome ? "/#contact" : "/contact"} label="contact" active={isHome ? activeSection === "contact" : pathname === "/contact"} />
        </div>
      </nav>
    </>
  );
}

function NavLink({ item, active, expanded }) {
  return (
    <Link
      href={item.href}
      className={`
        group flex items-center gap-3 rounded-md px-3 py-2 text-[0.8rem] transition-colors duration-150
        ${active
          ? "bg-primary-soft text-text-primary border-l-2 border-primary"
          : "border-l-2 border-transparent text-text-tertiary hover:text-text-secondary hover:bg-bg-surface-hover"
        }
      `}
    >
      <span
        className={`
          flex items-center justify-center w-2 h-2 rounded-full shrink-0 transition-colors duration-150
          ${active ? "bg-secondary" : "bg-border-default group-hover:bg-text-tertiary"}
        `}
        aria-hidden
      />
      <span
        className="overflow-hidden whitespace-nowrap transition-opacity duration-200"
        style={{ opacity: expanded ? 1 : 0 }}
      >
        {item.label}
      </span>
    </Link>
  );
}

function MobileNavLink({ href, label, active }) {
  return (
    <Link
      href={href}
      className={`
        flex flex-col items-center gap-1 px-2 py-1 text-[0.65rem] rounded-md transition-colors duration-150
        ${active ? "text-secondary" : "text-text-tertiary"}
      `}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full transition-colors duration-150 ${active ? "bg-secondary" : "bg-border-default"}`}
        aria-hidden
      />
      {label}
    </Link>
  );
}
