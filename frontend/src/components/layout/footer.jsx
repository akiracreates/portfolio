"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/container";
import { SectionDividerBleed } from "@/components/ui/divider";
import { siteConfig } from "@/lib/content/site-config";
import { socialLinks } from "@/lib/content/socials";
import { NavIcon } from "@/components/layout/nav-icons";
import {
  useDictionary,
  useDictLocale,
} from "@/components/i18n/locale-provider";

const FOOTER_SOCIALS = [
  "telegram-personal",
  "telegram-channel",
  "vk",
  "cara",
  "patreon",
  "email",
];
const PRIMARY_CONTACT_IDS = new Set(["telegram-personal", "email"]);
const SECONDARY_SOCIAL_IDS = new Set(["telegram-channel", "vk", "cara", "patreon"]);

export function Footer() {
  const dict = useDictionary();
  const locale = useDictLocale() || "en";
  const pathname = usePathname() || "";
  const year = new Date().getFullYear();
  const t = dict?.footer ?? {};
  const socialsT = dict?.socialsFooter ?? {};
  const bio = dict?.meta?.bio ?? siteConfig.shortBio;
  const isHomeRoute = pathname === `/${locale}` || pathname === `/${locale}/`;
  const footerMetaTextClass = isHomeRoute
    ? "caption text-[0.875rem] text-text-secondary/95 md:text-[0.75rem]"
    : "caption max-md:text-[0.8125rem] max-md:text-text-secondary md:text-text-tertiary";
  const footerMetaLinkClass = isHomeRoute
    ? "caption rounded-md text-[0.875rem] text-text-secondary/95 transition-colors hover:text-text-primary focus-visible-ring md:text-[0.75rem]"
    : "caption rounded-md text-text-tertiary transition-colors hover:text-text-primary focus-visible-ring max-md:text-[0.8125rem] max-md:text-text-secondary";

  const links = socialLinks.filter((s) => FOOTER_SOCIALS.includes(s.id));
  const useCompactFooter = pathname.endsWith("/commissions");

  if (useCompactFooter) {
    return (
      <footer className="site-ending">
        <div className="site-ending-zone">
          <SectionDividerBleed className="mt-0" />
          <Container className="pt-6 pb-8 md:pt-7 md:pb-9">
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className={footerMetaTextClass}>
                © {year} akira. {t.rights || "all rights reserved."}
              </p>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                <a
                  href="#top"
                  className={footerMetaLinkClass}
                >
                  ↑ {dict?.common?.backToTop || "back to top"}
                </a>
                <span className={footerMetaTextClass}>
                  {t.crafted || "crafted with care."}
                </span>
              </div>
            </div>
          </Container>
        </div>
      </footer>
    );
  }

  const contactLinks = links.filter((s) => PRIMARY_CONTACT_IDS.has(s.id));
  const secondaryLinks = links.filter((s) => SECONDARY_SOCIAL_IDS.has(s.id));

  return (
    <footer id="socials" className="site-ending">
      <div className="site-ending-zone">
        <SectionDividerBleed className="mt-0" />
        <Container className="pt-7 pb-12 md:pt-8 md:pb-14">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <div className={`${isHomeRoute ? "space-y-4 md:space-y-5" : "space-y-5"}`}>
                <p className="eyebrow">{socialsT.eyebrow || t.connect || "connect"}</p>
                <div className="space-y-3">
                  <Link
                    href={`/${locale}`}
                    className="inline-flex items-center gap-2.5 rounded-md focus-visible-ring"
                    aria-label="akira — home"
                  >
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-md border border-dashed border-highlight bg-highlight-soft font-display text-base font-semibold text-highlight"
                      aria-hidden
                    >
                      a
                    </span>
                    <span className="font-display text-[1.2rem] font-medium text-text-primary">
                      akira
                    </span>
                  </Link>
                  <h2 className="heading-h2 max-w-md">
                    {socialsT.title || "let's stay in touch."}
                  </h2>
                  {socialsT.description && (
                    <p className="body max-w-md">{socialsT.description}</p>
                  )}
                </div>
                <p className="caption max-w-sm">{bio}</p>
                <a
                  href="#top"
                  className="inline-flex items-center gap-1.5 rounded-md text-[0.8125rem] font-medium text-text-tertiary transition-colors hover:text-text-primary focus-visible-ring"
                >
                  <span aria-hidden>↑</span>
                  {dict?.common?.backToTop || "back to top"}
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <>
                <div className="space-y-3 md:hidden">
                  <ul className="grid items-stretch gap-2.5">
                    {contactLinks.map((s) => {
                      const label = locale === "ru" ? (s.labelRu ?? s.label) : s.label;
                      return (
                        <li key={s.id} className="min-w-0">
                          <a
                            href={s.url}
                            target={s.id === "email" ? undefined : "_blank"}
                            rel={s.id === "email" ? undefined : "noreferrer noopener"}
                            className={`social-pill group flex h-full min-h-[76px] items-center gap-3 p-4 transition-[background-color,border-color,box-shadow,color] duration-[var(--duration-base)] focus-visible-ring ${
                              s.id === "telegram-personal"
                                ? "note-surface-warm border-border-accent bg-accent-soft hover:bg-accent-strong"
                                : "border-border-subtle hover:border-border-default hover:bg-bg-surface-raised"
                            }`}
                            aria-label={label}
                            title={label}
                          >
                            <span
                              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${
                                s.id === "telegram-personal"
                                  ? "border border-dashed border-highlight bg-highlight-soft text-highlight"
                                  : "border border-dashed border-border-subtle bg-bg-inset text-text-secondary"
                              }`}
                              aria-hidden
                            >
                              <NavIcon id={s.id} />
                            </span>
                            <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
                              <div className="flex items-center justify-between gap-2">
                                <p className="body-sm font-medium text-text-primary">{label}</p>
                                {s.id === "telegram-personal" && (
                                  <span className="caption shrink-0 text-highlight">
                                    {dict?.common?.preferred || "preferred"}
                                  </span>
                                )}
                              </div>
                              {s.handle && <p className="caption truncate">{s.handle}</p>}
                            </div>
                          </a>
                        </li>
                      );
                    })}
                  </ul>

                  <ul className="grid grid-cols-2 gap-2.5">
                    {secondaryLinks.map((s) => {
                      const label = locale === "ru" ? (s.labelRu ?? s.label) : s.label;
                      const shortLabel =
                        s.id === "telegram-channel"
                          ? "channel"
                          : s.id === "vk"
                            ? "vk"
                            : s.id === "cara"
                              ? "cara"
                              : "patreon";
                      return (
                        <li key={s.id} className="min-w-0">
                          <a
                            href={s.url}
                            target="_blank"
                            rel="noreferrer noopener"
                            className={`social-pill group flex min-h-[64px] items-center gap-2.5 rounded-[12px] border border-dashed px-3 py-2.5 transition-[background-color,border-color,box-shadow,color] duration-[var(--duration-base)] focus-visible-ring ${
                              s.id === "cara"
                                ? "border-[color:var(--accent-warm-muted)] bg-[color:var(--surface-warm-paper)] hover:border-[color:var(--accent-warm)] hover:bg-[color:var(--bg-surface-warm)]"
                                : "border-border-subtle bg-bg-surface hover:border-border-default hover:bg-bg-surface-raised"
                            }`}
                            aria-label={label}
                            title={label}
                          >
                            <span
                              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-dashed ${
                                s.id === "cara"
                                  ? "border-[color:var(--accent-warm-muted)] bg-[color:var(--accent-warm-faint)] text-accent-warm"
                                  : "border-border-subtle bg-bg-inset text-text-secondary"
                              }`}
                              aria-hidden
                            >
                              <NavIcon id={s.id} />
                            </span>
                            <span className="body-sm truncate text-text-primary">
                              {shortLabel}
                            </span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <ul className="hidden items-stretch gap-3 md:grid sm:grid-cols-2">
                {links.map((s) => (
                  <li key={s.id} className="min-w-0">
                    {(() => {
                      const label = locale === "ru" ? (s.labelRu ?? s.label) : s.label;
                      return (
                        <a
                          href={s.url}
                          target={s.id === "email" ? undefined : "_blank"}
                          rel={
                            s.id === "email" ? undefined : "noreferrer noopener"
                          }
                          className={`social-pill group flex h-full min-h-[96px] items-start gap-3 p-4 transition-[background-color,border-color,box-shadow,color] duration-[var(--duration-base)] focus-visible-ring ${
                            s.id === "telegram-personal" ? "note-surface-warm " : ""
                          }${
                            s.primary
                              ? "border-border-accent bg-accent-soft hover:bg-accent-strong"
                              : "hover:border-border-default hover:bg-bg-surface-raised"
                          }`}
                        >
                          <span
                            className={`mt-0.5 flex h-8 w-8 items-center justify-center rounded-md ${
                              s.primary
                                ? "border border-dashed border-highlight bg-highlight-soft text-highlight"
                                : "border border-dashed border-border-subtle bg-bg-inset text-text-secondary"
                            }`}
                            aria-hidden
                          >
                            <NavIcon id={s.id} />
                          </span>
                          <div className="flex min-w-0 flex-1 flex-col justify-between gap-1.5">
                            <div className="flex items-start justify-between gap-2">
                              <p className="body-sm font-medium text-text-primary">
                                {label}
                              </p>
                              {s.primary && (
                                <span className="caption shrink-0 text-highlight">
                                  {dict?.common?.preferred || "preferred"}
                                </span>
                              )}
                            </div>
                            {s.handle && (
                              <p className="caption truncate">{s.handle}</p>
                            )}
                          </div>
                        </a>
                      );
                    })()}
                  </li>
                ))}
                </ul>
              </>
            </div>
          </div>
        </Container>
      </div>

      <SectionDividerBleed className="my-10" />
      <Container className="pb-12 md:pb-14">
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className={footerMetaTextClass}>
            © {year} akira. {t.rights || "all rights reserved."}
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a
              href="#top"
              className={`${footerMetaLinkClass} rounded-md`}
            >
              ↑ {dict?.common?.backToTop || "back to top"}
            </a>
            <span className={footerMetaTextClass}>
              {t.crafted || "crafted with care."}
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
