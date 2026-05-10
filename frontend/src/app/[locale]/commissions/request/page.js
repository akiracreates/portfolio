import { CommissionRequestForm } from "@/components/commissions/commission-request-form";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { commissionRequestFormContent } from "@/lib/content/commissions";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isLocale, pickLocale } from "@/lib/i18n/config";
import { buildPageMetadata } from "@/lib/seo/page-metadata";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  const m = dict.metaPages.commissionsRequest;
  return buildPageMetadata({
    locale,
    pathSuffix: "/commissions/request",
    title: m.title,
    description: m.description,
    imageAlt: dict.hero.imageAlt,
  });
}

export default async function Page({ params }) {
  const { locale } = await params;
  return (
    <Container>
      <Section
        id="request"
        size="md"
        className="pt-14 md:pt-16"
        headingLevel="h1"
        eyebrow={pickLocale({ en: "commission request", ru: "запрос на заказ" }, locale)}
        title={pickLocale(commissionRequestFormContent.title, locale)}
        description={pickLocale(commissionRequestFormContent.intro, locale)}
      >
        <article className="commission-flat-card scrap-card border-[color:var(--border-accent)]/38 p-5 md:p-7">
          <div className="mb-4 flex flex-wrap items-center justify-end gap-2">
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
