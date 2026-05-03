import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Divider } from "@/components/ui/divider";
import { navGroups, siteConfig } from "@/lib/content/site-config";
import { socialLinks } from "@/lib/content/socials";
import { NavIcon } from "@/components/layout/nav-icons";

export function Footer() {
  const year = new Date().getFullYear();
  const main = navGroups.find((g) => g.id === "main")?.items ?? [];
  const info = navGroups.find((g) => g.id === "info")?.items ?? [];

  return (
    <footer className="mt-16 border-t border-border-subtle bg-bg-app">
      <Container className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5"
              aria-label="akira — home"
            >
              <span
                className="flex h-8 w-8 items-center justify-center rounded-md font-display text-base font-semibold text-text-on-accent"
                style={{
                  background:
                    "linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)",
                }}
                aria-hidden
              >
                a
              </span>
              <span className="font-display text-lg font-medium text-text-primary">
                akira
              </span>
            </Link>
            <p className="body-sm mt-4 max-w-sm">{siteConfig.shortBio}</p>
          </div>

          <div className="lg:col-span-3">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-text-tertiary">
              sitemap
            </p>
            <ul className="mt-4 space-y-2.5">
              {main.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className="body-sm text-text-secondary transition-colors hover:text-text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-text-tertiary">
              info
            </p>
            <ul className="mt-4 space-y-2.5">
              {info.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className="body-sm text-text-secondary transition-colors hover:text-text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-text-tertiary">
              connect
            </p>
            <ul className="mt-4 space-y-2.5">
              {socialLinks.map((s) => (
                <li key={s.platform}>
                  <a
                    href={s.url}
                    target={s.platform === "email" ? undefined : "_blank"}
                    rel={s.platform === "email" ? undefined : "noreferrer noopener"}
                    className="body-sm inline-flex items-center gap-2 text-text-secondary transition-colors hover:text-text-primary"
                  >
                    <NavIcon id={s.platform} className="h-4 w-4" />
                    <span>{s.platform}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Divider className="my-10" />

        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="caption">
            © {year} akira. all rights reserved.
          </p>
          <p className="caption">crafted with care.</p>
        </div>
      </Container>
    </footer>
  );
}
