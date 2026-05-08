import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { FaqAccordion } from "@/components/commissions/faq-accordion";
import { CommissionOfferCards } from "@/components/commissions/commission-offer-cards";
import { CommissionPricingTable } from "@/components/commissions/commission-pricing-table";
import { ExpectationsSection } from "@/components/commissions/expectations-section";
import { OrderCta } from "@/components/commissions/order-cta";
import { ProcessTimeline } from "@/components/commissions/process-timeline";
import { TermsPanels } from "@/components/commissions/terms-panels";
import { NavIcon } from "@/components/layout/nav-icons";
import {
  commissionExpectations,
  commissionFaq,
  commissionIntro,
  commissionPricingRows,
  commissionProcess,
  commissionTerms,
  commissionStatus,
  commissionTypes,
} from "@/lib/content/commissions";
import { socialLinks } from "@/lib/content/socials";
import { pickLocale } from "@/lib/i18n/config";

const CONTACT_SOCIALS = ["telegram-personal", "vk", "email"];

export function CommissionsPage({ locale = "en" }) {
  const requestPath = `/${locale}/commissions/request`;

  return (
    <>
      <Container>
        <Section id="commissions" size="md" className="pt-14 md:pt-16">
          <article className="commission-flat-card scrap-card border-[color:var(--border-accent)]/40 p-6 md:p-8">
            <span className="caption inline-flex w-fit items-center gap-2 rounded-full border border-dashed border-[color:var(--success)]/35 bg-[color:var(--success)]/10 px-3 py-1 text-success">
              <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden />
              {pickLocale(commissionStatus.label, locale)}
            </span>
            <h1 className="heading-h1 mt-4 text-text-primary">
              {pickLocale(commissionIntro.title, locale)}
            </h1>
            <p className="body mt-3 max-w-3xl">
              {pickLocale(commissionIntro.body, locale)}
            </p>
            <p className="body-sm mt-2">
              {pickLocale(commissionIntro.bodyNote, locale)}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button as="link" href={requestPath} variant="primary" size="lg">
                {pickLocale(commissionIntro.button, locale)}
              </Button>
              <p className="caption">{pickLocale(commissionIntro.smallNote, locale)}</p>
            </div>
          </article>
        </Section>

        <Section
          id="offers"
          separator
          eyebrow={pickLocale({ en: "pricing cards", ru: "карточки с ценами" }, locale)}
          title={pickLocale({ en: "commissions are open", ru: "коммишены открыты" }, locale)}
          size="md"
        >
          <CommissionOfferCards locale={locale} cards={commissionTypes} />
        </Section>

        <Section
          id="prices"
          separator
          title={pickLocale({ en: "detailed pricing breakdown", ru: "детальная разбивка цен" }, locale)}
          size="md"
        >
          <CommissionPricingTable locale={locale} rows={commissionPricingRows} />
          <p className="caption mt-3">
            {pickLocale(
              {
                en: "table's texts to be adjusted later. english shows usd only, russian shows ruble only.",
                ru: "тексты таблицы позже будут уточнены. в english версии только usd, в русской — только рубли.",
              },
              locale,
            )}
          </p>
        </Section>

        <Section
          id="expect"
          separator
          title={pickLocale({ en: "clear expectations from day one", ru: "четкие ожидания с первого дня" }, locale)}
          size="md"
        >
          <ExpectationsSection locale={locale} items={commissionExpectations} />
        </Section>

        <Section
          id="process"
          separator
          title={pickLocale({ en: "how a commission flows", ru: "как проходит заказ" }, locale)}
          size="md"
        >
          <ProcessTimeline locale={locale} steps={commissionProcess} />
        </Section>

        <Section
          id="delivery"
          separator
          eyebrow={pickLocale({ en: "delivery", ru: "доставка" }, locale)}
          title={pickLocale({ en: "delivery details", ru: "детали доставки" }, locale)}
          size="md"
        >
          <div className="grid gap-4 sm:grid-cols-3">
            <Callout
              label={pickLocale({ en: "revisions", ru: "правки" }, locale)}
              value={pickLocale({ en: "3-4 rounds", ru: "3-4 раунда" }, locale)}
              detail={pickLocale(
                {
                  en: "minor adjustments are included before final approval.",
                  ru: "небольшие корректировки включены до финального утверждения.",
                },
                locale,
              )}
            />
            <Callout
              label={pickLocale({ en: "turnaround", ru: "срок" }, locale)}
              value={pickLocale({ en: "1-3 weeks", ru: "1-3 недели" }, locale)}
              detail={pickLocale(
                {
                  en: "timing depends on complexity, queue, and revision rounds.",
                  ru: "срок зависит от сложности, очереди и количества правок.",
                },
                locale,
              )}
            />
            <Callout
              label={pickLocale({ en: "delivery format", ru: "формат передачи" }, locale)}
              value="png / jpeg"
              detail={pickLocale(
                {
                  en: "other non-layered formats are available by request.",
                  ru: "другие неслоистые форматы доступны по запросу.",
                },
                locale,
              )}
            />
          </div>
        </Section>

        <Section id="terms" separator title={pickLocale(commissionTerms.title, locale)} size="md">
          <TermsPanels locale={locale} data={commissionTerms} />
        </Section>

        <Section id="order" separator size="md">
          <OrderCta
            locale={locale}
            route={requestPath}
            text={{
              kicker: { en: "ready to start?", ru: "готовы начать?" },
              button: { en: "order now", ru: "заказать" },
            }}
          />
        </Section>

        <Section
          id="faq"
          separator
          title={pickLocale({ en: "additional information and faq", ru: "дополнительная информация и faq" }, locale)}
          size="md"
        >
          <FaqAccordion locale={locale} items={commissionFaq} />
        </Section>

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
          className="pb-16 md:pb-20"
        >
          <ul className="grid gap-3 sm:grid-cols-3">
            {socialLinks
              .filter((s) => CONTACT_SOCIALS.includes(s.id))
              .map((s) => (
                <li key={s.id}>
                  <a
                    href={s.url}
                    target={s.id === "email" ? undefined : "_blank"}
                    rel={s.id === "email" ? undefined : "noreferrer noopener"}
                    className={`group social-pill focus-visible-ring flex items-center gap-3 rounded-[var(--radius-lg)] border border-dashed p-4 transition-colors ${
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
      </Container>
    </>
  );
}

function Callout({ label, value, detail }) {
  return (
    <div className="scrap-note border-[color:var(--border-accent)]/25 bg-[color:var(--bg-note)] p-5">
      <p className="caption">{label}</p>
      <p className="heading-h3 mt-1 text-text-primary">{value}</p>
      {detail && <p className="body-sm mt-2">{detail}</p>}
    </div>
  );
}
