"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useId } from "react";
import { navGroups } from "@/lib/content/site-config";
import { socialLinks } from "@/lib/content/socials";
import { NavIcon } from "@/components/layout/nav-icons";

function isActiveRoute(pathname, href) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
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

  const handleClick = useCallback(() => {
    if (onNavigate) onNavigate();
  }, [onNavigate]);

  return (
    <div
      className="flex h-full w-full flex-col bg-bg-sidebar text-text-secondary"
      aria-labelledby={labelId}
      data-variant={variant}
    >
      <span id={labelId} className="sr-only">
        primary navigation
      </span>

      {/* brand row */}
      <div
        className={`flex h-[var(--topbar-h)] shrink-0 items-center border-b border-border-subtle ${
          collapsed ? "justify-center px-2" : "justify-between px-4"
        }`}
      >
        <Link
          href="/"
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
            className="flex h-7 w-7 items-center justify-center rounded-md text-text-tertiary transition-colors hover:bg-bg-surface hover:text-text-primary"
            onClick={onToggleCollapsed}
            aria-label="collapse sidebar"
            title="collapse"
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
              className="flex h-8 w-8 items-center justify-center rounded-md text-text-tertiary transition-colors hover:bg-bg-surface hover:text-text-primary"
              onClick={onToggleCollapsed}
              aria-label="expand sidebar"
              title="expand"
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

        <ul className="space-y-6">
          {navGroups.map((group) => (
            <li key={group.id}>
              {!collapsed && (
                <p className="mb-2 px-3 text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-text-tertiary">
                  {group.label}
                </p>
              )}
              {collapsed && <div className="mb-2 mx-3 h-px bg-border-subtle" />}
              <ul className="space-y-0.5">
                {group.items.map((item) => {
                  const active = isActiveRoute(pathname, item.href);
                  return (
                    <li key={item.id}>
                      <Link
                        href={item.href}
                        onClick={handleClick}
                        className={`group relative flex items-center rounded-md text-[0.875rem] transition-colors duration-[var(--duration-fast)] ${
                          collapsed
                            ? "justify-center px-0 py-2 mx-1"
                            : "gap-3 px-3 py-2"
                        } ${
                          active
                            ? "bg-accent-soft text-text-primary"
                            : "text-text-secondary hover:bg-bg-surface hover:text-text-primary"
                        }`}
                        aria-current={active ? "page" : undefined}
                        title={collapsed ? item.label : undefined}
                      >
                        {active && !collapsed && (
                          <span
                            className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r-full bg-accent-2"
                            aria-hidden
                          />
                        )}
                        <NavIcon id={item.id} />
                        {!collapsed && (
                          <span className="truncate">{item.label}</span>
                        )}
                        {collapsed && (
                          <span className="sr-only">{item.label}</span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>
      </nav>

      {/* footer: socials */}
      <div
        className={`shrink-0 border-t border-border-subtle py-3 ${
          collapsed ? "px-2" : "px-4"
        }`}
      >
        <div
          className={`flex items-center ${
            collapsed ? "flex-col gap-1.5" : "justify-between"
          }`}
        >
          {!collapsed && (
            <span className="text-[0.7rem] font-medium text-text-tertiary">
              connect
            </span>
          )}
          <div
            className={`flex ${collapsed ? "flex-col gap-1.5" : "items-center gap-1"}`}
          >
            {socialLinks.map((s) => (
              <a
                key={s.platform}
                href={s.url}
                target={s.platform === "email" ? undefined : "_blank"}
                rel={s.platform === "email" ? undefined : "noreferrer noopener"}
                className="flex h-8 w-8 items-center justify-center rounded-md text-text-tertiary transition-colors hover:bg-bg-surface hover:text-text-primary"
                aria-label={s.label}
                title={s.label}
              >
                <NavIcon id={s.platform} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
