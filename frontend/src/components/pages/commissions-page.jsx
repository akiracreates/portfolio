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
import { AlternativeContactSection } from "@/components/commissions/alternative-contact-section";
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
import { pickLocale } from "@/lib/i18n/config";

export function CommissionsPage({ locale = "en" }) {
  const requestPath = `/${locale}/commissions/request`;

  return (
    <>
      <Container>
        <Section id="commissions" size="md" className="pt-14 md:pt-16">
          <article className="commission-flat-card scrap-card card-surface-warm border-[color:var(--border-accent)]/40 p-6 max-sm:px-5 max-sm:py-7 md:p-8">
            <span className="caption inline-flex w-fit items-center gap-2 rounded-full border border-dashed border-[color:var(--success)]/40 bg-[color:var(--success)]/12 px-3 py-1 text-success max-sm:px-3.5 max-sm:py-1.5 max-sm:text-[0.8125rem] max-sm:font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden />
              {pickLocale(commissionStatus.label, locale)}
            </span>
            <h1 className="heading-h1 mt-4 text-text-primary max-sm:text-[clamp(1.48rem,5.4vw,1.82rem)] max-sm:leading-[1.12]">
              {pickLocale(commissionIntro.title, locale)}
            </h1>
            <p className="body mt-3 max-w-3xl max-sm:leading-relaxed">
              {pickLocale(commissionIntro.body, locale)}
            </p>
            <p className="body-sm mt-2 max-sm:leading-relaxed">
              {pickLocale(commissionIntro.bodyNote, locale)}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3 max-sm:flex-col max-sm:items-stretch max-sm:gap-3.5">
              <Button
                as="link"
                href={requestPath}
                variant="primary"
                size="lg"
                className="max-sm:h-12 max-sm:min-h-[48px] max-sm:w-full max-sm:justify-center max-sm:px-6 max-sm:text-base sm:w-auto"
              >
                {pickLocale(commissionIntro.button, locale)}
              </Button>
              <p className="caption max-sm:text-center sm:text-left">
                {pickLocale(commissionIntro.smallNote, locale)}
              </p>
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
          title={pickLocale({ en: "pricing breakdown", ru: "разбор цен" }, locale)}
          size="md"
        >
          <CommissionPricingTable locale={locale} rows={commissionPricingRows} />
          <p className="caption mt-4 max-md:mt-5 max-md:leading-relaxed text-text-secondary">
            <span className="deco-warm-label mr-2 text-text-tertiary">
              {pickLocale({ en: "note", ru: "заметка" }, locale)}
            </span>
            {pickLocale(
              {
                en: "final price depends on complexity, extra details, and intended usage. i'll confirm the total before payment.",
                ru: "итоговая цена зависит от сложности, деталей и цели использования. я подтвержу сумму до оплаты.",
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
              value={pickLocale({ en: "2+ rounds", ru: "2+ раунда" }, locale)}
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

        <AlternativeContactSection locale={locale} className="pb-16 md:pb-20" />
      </Container>
    </>
  );
}

function Callout({ label, value, detail }) {
  return (
    <div className="scrap-note border-[color:var(--border-accent)]/25 bg-[color:var(--bg-note)] p-5">
      <p className="caption">{label}</p>
      <p className="heading-h3 mt-1 text-text-primary">{value}</p>
      {detail && <p className="body-sm mt-2 max-md:leading-relaxed">{detail}</p>}
    </div>
  );
}
