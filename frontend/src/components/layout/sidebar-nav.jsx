"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const SECTION_IDS = ["hero", "about-preview", "portfolio-preview", "commissions-preview", "easter-egg", "contact"];

export function SidebarNav({ items }) {
  const [expanded, setExpanded] = useState(false);
  const [activeId, setActiveId] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pathname] = useState(() => (typeof window === "undefined" ? "" : window.location.pathname));

  const sectionItems = items.filter((item) => item.href.startsWith("/#"));
  const pageItems = items.filter((item) => !item.href.startsWith("/#"));
  const allItems = useMemo(() => [...sectionItems, ...pageItems], [sectionItems, pageItems]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0.1 },
    );

    SECTION_IDS.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <button
        type="button"
        className="fixed bottom-4 right-4 z-50 rounded-[0.3rem] border border-[#f2c19b] bg-accent-peach px-3 py-1.5 text-xs text-[#2a2340] lg:hidden"
        onClick={() => setMobileOpen((current) => !current)}
        aria-expanded={mobileOpen}
        aria-controls="mobile-navigation"
      >
        menu
      </button>

      <aside
        className={`hidden border-r border-[#d9aa88] bg-gradient-to-b from-[#f0af81] to-[#dfa27b] p-2.5 transition-all duration-300 lg:flex ${
          expanded ? "w-52" : "w-14"
        }`}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        onFocus={() => setExpanded(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setExpanded(false);
          }
        }}
      >
        <nav className="flex w-full flex-col gap-1.5" aria-label="section navigation">
          {sectionItems.map((item) => {
            const isActive = activeId && item.id === activeId;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex items-center gap-2 rounded-[0.3rem] border px-2 py-1.5 text-[0.68rem] transition ${
                  isActive
                    ? "border-[#745273] bg-[#3c3458] text-[#f7e6f2]"
                    : "border-transparent text-[#453657] hover:border-[#8f6789] hover:bg-[#4a3e62] hover:text-[#f7e6f2]"
                }`}
              >
                <span className="inline-block h-1.5 w-1.5 rounded-[2px] bg-[#2d2242]" aria-hidden />
                <span className={expanded ? "opacity-100" : "sr-only"}>{item.label}</span>
              </Link>
            );
          })}
          <div className="my-2 h-px bg-[#bc8d77]" />
          {pageItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center gap-2 rounded-[0.3rem] border px-2 py-1.5 text-[0.68rem] transition ${
                pathname === item.href
                  ? "border-[#745273] bg-[#3c3458] text-[#f7e6f2]"
                  : "border-transparent text-[#453657] hover:border-[#8f6789] hover:bg-[#4a3e62] hover:text-[#f7e6f2]"
              }`}
            >
              <span className="inline-block h-1.5 w-1.5 rounded-[2px] bg-[#2d2242]" aria-hidden />
              <span className={expanded ? "opacity-100" : "sr-only"}>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      <div
        id="mobile-navigation"
        className={`fixed inset-x-3 top-3 z-40 rounded-[0.45rem] border border-[#f2c19b] bg-[#2b2548] p-3 transition ${
          mobileOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"
        } lg:hidden`}
      >
        <nav className="grid grid-cols-2 gap-2" aria-label="mobile page navigation">
          {allItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`rounded-[0.3rem] border px-2.5 py-1.5 text-xs ${
                sectionItems.find((entry) => entry.id === activeId)?.href === item.href
                  ? "border-[#d59bbb] text-text-primary"
                  : "border-[#726894] text-text-muted"
              }`}
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
