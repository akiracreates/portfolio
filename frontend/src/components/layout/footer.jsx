"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Divider } from "@/components/ui/divider";
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

export function Footer() {
  const dict = useDictionary();
  const locale = useDictLocale() || "en";
  const pathname = usePathname() || "";
  const year = new Date().getFullYear();
  const t = dict?.footer ?? {};
  const socialsT = dict?.socialsFooter ?? {};
  const bio = dict?.meta?.bio ?? siteConfig.shortBio;

  const links = socialLinks.filter((s) => FOOTER_SOCIALS.includes(s.id));
  const useCompactFooter = pathname.endsWith("/commissions");

  if (useCompactFooter) {
    return (
      <footer className="site-ending mt-12">
        <Container className="py-8 md:py-9">
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="caption">
              © {year} akira. {t.rights || "all rights reserved."}
            </p>
            <div className="flex items-center gap-5">
              <a
                href="#hero"
                className="caption rounded-md text-text-tertiary transition-colors hover:text-text-primary focus-visible-ring"
              >
                ↑ {dict?.common?.backToTop || "back to top"}
              </a>
              <span className="caption">{t.crafted || "crafted with care."}</span>
            </div>
          </div>
        </Container>
      </footer>
    );
  }

  return (
    <footer id="socials" className="site-ending mt-12">
      <Container className="py-12 md:py-14">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <div className="space-y-5">
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
                href="#hero"
                className="inline-flex items-center gap-1.5 rounded-md text-[0.8125rem] font-medium text-text-tertiary transition-colors hover:text-text-primary focus-visible-ring"
              >
                <span aria-hidden>↑</span>
                {dict?.common?.backToTop || "back to top"}
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ul className="grid gap-3 sm:grid-cols-2">
              {links.map((s) => (
                <li key={s.id}>
                  <a
                    href={s.url}
                    target={s.id === "email" ? undefined : "_blank"}
                    rel={
                      s.id === "email" ? undefined : "noreferrer noopener"
                    }
                    className={`social-pill group flex items-center gap-3 p-4 transition-colors focus-visible-ring ${
                      s.primary
                        ? "border-border-accent bg-accent-soft hover:bg-accent-strong"
                        : "hover:border-border-default hover:bg-bg-surface-raised"
                    }`}
                  >
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-md ${
                        s.primary
                          ? "border border-dashed border-highlight bg-highlight-soft text-highlight"
                          : "border border-dashed border-border-subtle bg-bg-inset text-text-secondary"
                      }`}
                      aria-hidden
                    >
                      <NavIcon id={s.id} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline gap-2">
                        <p className="body-sm font-medium text-text-primary">
                          {s.label}
                        </p>
                        {s.primary && (
                          <span className="caption text-highlight">
                            {dict?.common?.preferred || "preferred"}
                          </span>
                        )}
                      </div>
                      {s.handle && (
                        <p className="caption truncate">{s.handle}</p>
                      )}
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Divider className="my-10" />

        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="caption">
            © {year} akira. {t.rights || "all rights reserved."}
          </p>
          <div className="flex items-center gap-5">
            <a
              href="#hero"
              className="caption text-text-tertiary transition-colors hover:text-text-primary focus-visible-ring rounded-md"
            >
              ↑ {dict?.common?.backToTop || "back to top"}
            </a>
            <span className="caption">{t.crafted || "crafted with care."}</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
