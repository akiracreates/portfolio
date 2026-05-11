import { Section } from "@/components/ui/section";
import { NavIcon } from "@/components/layout/nav-icons";
import { socialLinks } from "@/lib/content/socials";
import { pickLocale } from "@/lib/i18n/config";

const CONTACT_IDS = ["telegram-personal", "vk", "discord", "email"];

export function AlternativeContactSection({ locale = "en", className = "" }) {
  const contacts = socialLinks.filter((s) => CONTACT_IDS.includes(s.id));

  return (
    <Section
      id="contact-alt"
      separator
      eyebrow={pickLocale({ en: "or just say hi", ru: "или просто напишите" }, locale)}
      title={pickLocale({ en: "alternative contact", ru: "альтернативная связь" }, locale)}
      description={pickLocale(
        {
          en: "telegram, email, and vk are always open.",
          ru: "telegram, email и vk всегда открыты для связи.",
        },
        locale,
      )}
      size="md"
      className={className}
    >
      <ul className="grid gap-3 max-md:gap-3.5 sm:grid-cols-2">
        {contacts.map((s) => (
          <li key={s.id}>
            <a
              href={s.url}
              target={s.id === "email" ? undefined : "_blank"}
              rel={s.id === "email" ? undefined : "noreferrer noopener"}
              className={`group social-pill focus-visible-ring flex min-h-[3rem] items-center gap-3 rounded-[var(--radius-lg)] border border-dashed p-4 transition-colors max-md:min-h-[52px] ${
                s.id === "telegram-personal" ? "note-surface-warm " : ""
              }${
                s.primary
                  ? "border-border-accent bg-accent-soft hover:bg-accent-strong"
                  : "border-border-subtle bg-bg-surface hover:border-border-default"
              }`}
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
                <p className="body-sm font-medium text-text-primary">
                  {locale === "ru" ? (s.labelRu ?? s.label) : s.label}
                </p>
                {s.handle ? <p className="caption truncate">{s.handle}</p> : null}
              </div>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
