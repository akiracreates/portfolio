"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const SECTION_IDS = ["hero", "about-preview", "portfolio-preview", "commissions-preview", "easter-egg", "contact"];

export function SidebarNav({ items }) {
  const [expanded, setExpanded] = useState(false);
  const [activeId, setActiveId] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const sectionItems = items.filter((item) => item.href.startsWith("/#"));
  const pageItems = items.filter((item) => !item.href.startsWith("/#"));

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
        className="fixed bottom-4 right-4 z-50 rounded-full border border-border-strong bg-bg-surface px-4 py-2 text-xs lg:hidden"
        onClick={() => setMobileOpen((current) => !current)}
        aria-expanded={mobileOpen}
        aria-controls="mobile-navigation"
      >
        menu
      </button>

      <aside
        className={`hidden border-r border-border-soft bg-bg-surface/80 p-3 transition-all duration-300 lg:flex ${
          expanded ? "w-56" : "w-16"
        }`}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
      >
        <nav className="flex w-full flex-col gap-2" aria-label="section navigation">
          {sectionItems.map((item) => {
            const isActive = activeId && item.id === activeId;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex items-center gap-3 rounded-md border px-2 py-2 text-xs transition ${
                  isActive
                    ? "border-accent-rose bg-accent-rose/10 text-text-primary"
                    : "border-transparent text-text-dim hover:border-border-strong hover:text-text-primary"
                }`}
              >
                <span className="inline-block h-2 w-2 rounded-full bg-accent-peach" aria-hidden />
                <span className={expanded ? "opacity-100" : "sr-only"}>{item.label}</span>
              </Link>
            );
          })}
          <div className="my-2 h-px bg-border-soft" />
          {pageItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="flex items-center gap-3 rounded-md border border-transparent px-2 py-2 text-xs text-text-dim transition hover:border-border-strong hover:text-text-primary"
            >
              <span className="inline-block h-2 w-2 rounded-full bg-accent-rose" aria-hidden />
              <span className={expanded ? "opacity-100" : "sr-only"}>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      <div
        id="mobile-navigation"
        className={`fixed inset-x-3 top-3 z-40 rounded-xl border border-border-strong bg-bg-surface p-4 transition ${
          mobileOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"
        } lg:hidden`}
      >
        <nav className="grid grid-cols-2 gap-2" aria-label="mobile page navigation">
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`rounded-md border px-3 py-2 text-xs ${
                sectionItems.find((entry) => entry.id === activeId)?.href === item.href
                  ? "border-accent-rose text-text-primary"
                  : "border-border-soft text-text-muted"
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
