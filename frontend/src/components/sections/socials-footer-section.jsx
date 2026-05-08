import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { socialLinks } from "@/lib/content/socials";
import { NavIcon } from "@/components/layout/nav-icons";

const VISIBLE = ["telegram-personal", "vk", "cara", "patreon", "email"];

export function SocialsFooterSection({ dict, locale = "en" }) {
  const t = dict.socialsFooter;
  const links = socialLinks.filter((s) => VISIBLE.includes(s.id));

  return (
    <section
      id="socials"
      className="section-scrap scroll-mt-header border-t border-dashed border-border-subtle bg-bg-base"
      aria-labelledby="socials-heading"
    >
      <Container>
        <Section
          id="socials-inner"
          eyebrow={t.eyebrow}
          title={t.title}
          description={t.description}
          headingLevel="h2"
        >
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {links.map((s) => (
              <a
                key={s.id}
                href={s.url}
                target={s.id === "email" ? undefined : "_blank"}
                rel={s.id === "email" ? undefined : "noreferrer noopener"}
                className={`socials-link group flex items-center gap-3 rounded-[var(--radius-lg)] border border-dashed p-4 transition-[background-color,border-color,box-shadow] duration-[var(--duration-base)] focus-visible-ring ${
                  s.primary
                    ? "border-border-accent bg-accent-soft hover:bg-accent-strong"
                    : "border-border-subtle bg-bg-surface hover:border-border-default hover:bg-bg-surface-raised"
                }`}
                aria-label={s.label}
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-md ${
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
                      {locale === "ru" ? (s.labelRu ?? s.label) : s.label}
                    </p>
                    {s.primary && (
                      <span className="caption text-highlight">
                        {dict.common.preferred}
                      </span>
                    )}
                  </div>
                  {s.handle && (
                    <p className="caption truncate">{s.handle}</p>
                  )}
                </div>
              </a>
            ))}
          </div>
          <p className="body-sm mt-6 max-w-prose">{t.contactNote}</p>
          <div className="mt-6">
            <a
              href="#hero"
              className="inline-flex items-center gap-1.5 rounded-md text-[0.8125rem] font-medium text-text-tertiary transition-colors hover:text-text-primary focus-visible-ring"
            >
              <span aria-hidden>↑</span>
              {dict.common.backToTop}
            </a>
          </div>
        </Section>
      </Container>
    </section>
  );
}
