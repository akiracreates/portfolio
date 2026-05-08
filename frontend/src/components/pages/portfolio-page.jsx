import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionDividerBleed } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { PageHeader } from "@/components/layout/page-header";
import { PortfolioCategoryShowcase } from "@/components/portfolio/portfolio-category-tabs";
import {
  artworkCategories,
  getArtworksByCategory,
} from "@/lib/content/artworks";

export function PortfolioPage({ dict, locale = "en" }) {
  const t = dict.portfolio;

  const sections = [];
  for (const category of artworkCategories) {
    const items = getArtworksByCategory(category);
    sections.push({ category, items });
  }

  return (
    <>
      <PageHeader
        id="portfolio"
        eyebrow={t.pageEyebrow}
        title={t.pageTitle}
        description={t.pageDescription}
        tone="warm"
        contentClassName="w-full max-w-5xl"
      />

      <Container className="pt-8 pb-16 md:pb-24">
        <PortfolioCategoryShowcase
          sections={sections}
          categories={artworkCategories}
          jumpToLabel={t.jumpTo}
          locale={locale}
          piecesLabel={t.pieces}
          pieceLabel={t.piece}
        />
      </Container>

      {/* soft CTA */}
      <section className="section-scrap bg-bg-base">
        <SectionDividerBleed />
        <Container className="py-16 md:py-20">
          <div className="scrap-note note-surface-warm mx-auto max-w-2xl space-y-6 p-6 text-center md:p-8">
            <Heading level="h2">{t.closingTitle}</Heading>
            <p className="body-lg">{t.closingBody}</p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Button
                as="link"
                href={`/${locale}/commissions`}
                variant="primary"
                size="md"
              >
                {dict.common.commissionMe}
              </Button>
              <Button
                as="link"
                href={`/${locale}#socials`}
                variant="outline"
                size="md"
              >
                {dict.socialsFooter.eyebrow}
              </Button>
              <Button
                as="link"
                href={`/${locale}`}
                variant="ghost"
                size="md"
              >
                {dict.common.backHome}
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
