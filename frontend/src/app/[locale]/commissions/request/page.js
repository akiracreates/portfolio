import { CommissionRequestForm } from "@/components/commissions/commission-request-form";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { commissionRequestFormContent } from "@/lib/content/commissions";
import { pickLocale } from "@/lib/i18n/config";

export default async function Page({ params }) {
  const { locale } = await params;
  return (
    <Container>
      <Section
        id="request"
        size="md"
        className="pt-14 md:pt-16"
        eyebrow={pickLocale({ en: "commission request", ru: "запрос на заказ" }, locale)}
        title={pickLocale(commissionRequestFormContent.title, locale)}
        description={pickLocale(commissionRequestFormContent.intro, locale)}
      >
        <article className="commission-flat-card scrap-card border-[color:var(--border-accent)]/38 p-5 md:p-7">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <p className="caption">{pickLocale(commissionRequestFormContent.note, locale)}</p>
            <span className="caption rounded-full border border-dashed border-border-purple bg-accent-soft px-2.5 py-1 text-accent-2">
              {pickLocale(commissionRequestFormContent.fastNote, locale)}
            </span>
          </div>
          <CommissionRequestForm locale={locale} content={commissionRequestFormContent} />
        </article>
      </Section>
    </Container>
  );
}
