import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionDividerBleed } from "@/components/ui/divider";
import { Section } from "@/components/ui/section";
import { commissionStatus, commissionTypes } from "@/lib/content/commissions";
import { pickLocale } from "@/lib/i18n/config";

/**
 * Slim homepage preview per spec:
 *  - status pill (commissions are open)
 *  - short copy ("portraits + animals")
 *  - starting price (currency follows locale)
 *  - one CTA → /{locale}/commissions
 */
export function CommissionsPreviewSection({ dict, locale = "en" }) {
  const t = dict.commissionsPreview;

  const homepageStartingPrice = locale === "ru" ? "1 500 ₽" : "$25";

  const typeNames = commissionTypes
    .map((c) => pickLocale(c.shortTitle, locale))
    .join(" + ");

  return (
    <section
      id="commissions-preview"
      className="section-scrap scroll-mt-header bg-bg-base"
      aria-labelledby="commissions-preview-heading"
    >
      <SectionDividerBleed />
      <Container>
        <Section
          eyebrow={t.eyebrow}
          title={t.title}
          description={t.description}
          headingLevel="h2"
          id="commissions-preview-inner"
          action={
            <Button
              as="link"
              href={`/${locale}/commissions`}
              variant="primary"
              size="md"
            >
              {t.cta}
            </Button>
          }
        >
          <div className="scrap-card card-surface-warm flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between md:gap-6 md:p-8">
            {/* status pill + types */}
            <div className="flex flex-col gap-2.5">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-dashed border-[color:var(--success)]/35 bg-[color:var(--success)]/10 px-3 py-1 text-[0.75rem] font-medium text-success">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-success"
                  aria-hidden
                />
                {pickLocale(commissionStatus.label, locale)}
              </span>
              <div>
                <p className="caption">{t.typesLabel}</p>
                <p className="body-lg text-text-primary">{typeNames}</p>
              </div>
            </div>
            {/* starting price */}
            <div className="commissions-preview-price border-t border-dashed border-border-subtle pt-3 md:border-t-0 md:pt-0 md:text-right">
              <p className="caption">{t.startingLabel}</p>
              <p className="heading-h2 text-[1.78rem] leading-tight text-text-primary md:text-[1.75rem]">
                {homepageStartingPrice}
              </p>
            </div>
          </div>
        </Section>
      </Container>
    </section>
  );
}
