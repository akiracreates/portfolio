import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHeader } from "@/components/layout/page-header";
import { ContactForm } from "@/components/forms/contact-form";
import { CommissionProcess } from "@/components/commissions/commission-process";
import { CommissionPreviewCarousel } from "@/components/commissions/commission-preview-carousel";
import { PriceTable } from "@/components/commissions/price-table";
import { TermsSection } from "@/components/commissions/terms-section";
import { NavIcon } from "@/components/layout/nav-icons";
import {
  commissionStatus,
  commissionTypes,
  getCommissionPreviews,
  whatToExpect,
} from "@/lib/content/commissions";
import { socialLinks } from "@/lib/content/socials";
import { formatPrice, pickLocale } from "@/lib/i18n/config";

const CONTACT_SOCIALS = ["telegram", "vk", "email"];

export function CommissionsPage({ dict, locale = "en" }) {
  const t = dict.commissions;
  const we = dict.whatToExpect;

  return (
    <>
      {/* 1. intro / status */}
      <PageHeader
        id="commissions"
        eyebrow={t.pageEyebrow}
        title={t.pageTitle}
        description={t.pageDescription}
        action={
          <Button as="link" href="#order" variant="primary" size="md">
            {t.jumpToOrder}
          </Button>
        }
      />

      <Container>
        <div className="-mt-4 mb-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--success)]/30 bg-[color:var(--success)]/10 px-3 py-1 text-[0.75rem] font-medium text-success">
            <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden />
            {pickLocale(commissionStatus.label, locale)}
          </span>
        </div>

        {/* 2. commission types */}
        <Section
          id="types"
          eyebrow={t.typesEyebrow}
          title={t.typesTitle}
          description={t.typesDescription}
          size="md"
        >
          <div className="grid gap-5 md:grid-cols-2">
            {commissionTypes.map((c) => (
              <article
                key={c.id}
                className="flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-border-subtle bg-bg-surface transition-colors hover:border-border-default"
              >
                <CommissionPreviewCarousel
                  images={getCommissionPreviews(c.id)}
                  locale={locale}
                />
                <div className="flex flex-1 flex-col gap-4 p-6">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="heading-h3 text-text-primary">
                      {pickLocale(c.title, locale)}
                    </h3>
                    <span className="body-sm font-semibold text-highlight">
                      {formatPrice(c.price, locale)}
                    </span>
                  </div>
                  <p className="body-sm">{pickLocale(c.description, locale)}</p>
                  <div className="space-y-3 border-t border-border-subtle pt-4">
                    <p className="caption">{t.includedLabel}</p>
                    <ul className="space-y-1.5">
                      {pickLocale(c.included, locale).map((d) => (
                        <li
                          key={d}
                          className="flex items-center gap-2 text-[0.8125rem] text-text-secondary"
                        >
                          <span
                            className="h-1 w-1 rounded-full bg-accent-2"
                            aria-hidden
                          />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-auto flex items-center justify-between gap-3 border-t border-border-subtle pt-4 text-[0.75rem] text-text-tertiary">
                    <span>
                      {t.revisionsLabel}: {c.revisions}
                    </span>
                    <span>
                      {t.deliveryLabel}: {c.deliveryFormats.join(" / ")}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Section>

        {/* 3. prices */}
        <Section
          id="prices"
          eyebrow={t.pricesEyebrow}
          title={t.pricesTitle}
          description={t.pricesDescription}
          size="md"
        >
          <PriceTable
            locale={locale}
            typeLabel={t.priceTableType}
            startingLabel={t.priceTableStarting}
            includedLabel={t.priceTableIncluded}
            note={t.priceNote}
          />
        </Section>

        {/* 4. what to expect */}
        <Section
          id="expect"
          eyebrow={t.expectEyebrow}
          title={t.expectTitle}
          size="md"
        >
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {whatToExpect.map((item) => {
              const fromDict = we?.items?.[item.id];
              const short =
                fromDict?.short ?? pickLocale(item.short, locale);
              const long =
                fromDict?.long ?? pickLocale(item.long, locale);
              return (
                <li
                  key={item.id}
                  className="flex flex-col gap-2 rounded-[var(--radius-lg)] border border-border-subtle bg-bg-surface p-5"
                >
                  <p className="heading-h3 text-[0.95rem] text-text-primary">
                    {short}
                  </p>
                  <p className="body-sm">{long}</p>
                </li>
              );
            })}
          </ul>
        </Section>

        {/* 5. process */}
        <Section
          id="process"
          eyebrow={t.processEyebrow}
          title={t.processTitle}
          description={t.processDescription}
          size="md"
        >
          <CommissionProcess locale={locale} />
        </Section>

        {/* 6. revisions / turnaround / delivery callouts */}
        <Section
          id="delivery"
          eyebrow={t.deliveryEyebrow}
          title={t.deliveryTitle}
          size="md"
        >
          <div className="grid gap-4 sm:grid-cols-3">
            <Callout
              label={t.revisionsLabel}
              value="3"
              detail={pickLocale(whatToExpect.find((w) => w.id === "revisions")?.long, locale)}
            />
            <Callout
              label={pickLocale({ en: "turnaround", ru: "срок" }, locale)}
              value="~2 weeks"
              detail={pickLocale(whatToExpect.find((w) => w.id === "turnaround")?.long, locale)}
            />
            <Callout
              label={t.deliveryLabel}
              value="png · jpeg"
              detail={pickLocale(whatToExpect.find((w) => w.id === "delivery")?.long, locale)}
            />
          </div>
        </Section>

        {/* 7. terms */}
        <Section
          id="terms"
          eyebrow={t.termsEyebrow}
          title={t.termsTitle}
          description={t.termsDescription}
          size="md"
        >
          <TermsSection locale={locale} calloutText={t.termsCallout} />
        </Section>
      </Container>

      {/* 8. contact form (#order) */}
      <section
        id="order"
        className="scroll-mt-header border-t border-border-subtle bg-bg-base"
      >
        <Container>
          <Section
            eyebrow={t.formEyebrow}
            title={t.formTitle}
            description={t.formIntro}
            size="md"
          >
            <div className="rounded-[var(--radius-lg)] border border-border-subtle bg-bg-surface p-6 md:p-8">
              <ContactForm />
            </div>
          </Section>
        </Container>
      </section>

      {/* 9. contact + socials */}
      <section
        id="contact-alt"
        className="scroll-mt-header border-t border-border-subtle"
      >
        <Container>
          <Section
            eyebrow={t.contactEyebrow}
            title={t.contactTitle}
            description={t.contactNote}
            size="md"
          >
            <ul className="grid gap-3 sm:grid-cols-3">
              {socialLinks
                .filter((s) => CONTACT_SOCIALS.includes(s.id))
                .map((s) => (
                  <li key={s.id}>
                    <a
                      href={s.url}
                      target={s.id === "email" ? undefined : "_blank"}
                      rel={
                        s.id === "email" ? undefined : "noreferrer noopener"
                      }
                      className={`group flex items-center gap-3 rounded-[var(--radius-lg)] border p-4 transition-colors focus-visible-ring ${
                        s.primary
                          ? "border-border-accent bg-accent-soft hover:bg-accent-strong"
                          : "border-border-subtle bg-bg-surface hover:border-border-default"
                      }`}
                    >
                      <span
                        className={`flex h-10 w-10 items-center justify-center rounded-md ${
                          s.primary
                            ? "bg-accent text-text-on-accent"
                            : "bg-bg-inset text-text-secondary"
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
                              {dict.common.preferred}
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
          </Section>
        </Container>
      </section>
    </>
  );
}

function Callout({ label, value, detail }) {
  return (
    <div className="rounded-[var(--radius-lg)] border border-border-subtle bg-bg-surface p-5">
      <p className="caption">{label}</p>
      <p className="heading-h3 mt-1 text-text-primary">{value}</p>
      {detail && <p className="body-sm mt-2">{detail}</p>}
    </div>
  );
}
