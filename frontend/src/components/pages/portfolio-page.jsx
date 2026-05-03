import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { CategorySection } from "@/components/gallery/category-section";
import { PageHeader } from "@/components/layout/page-header";
import { PortfolioCategoryTabs } from "@/components/portfolio/portfolio-category-tabs";
import {
  artworkCategories,
  getArtworksByCategory,
} from "@/lib/content/artworks";

export function PortfolioPage({ dict, locale = "en" }) {
  const t = dict.portfolio;

  return (
    <>
      <PageHeader
        id="portfolio"
        eyebrow={t.pageEyebrow}
        title={t.pageTitle}
        description={t.pageDescription}
      />

      <Container className="pt-8 pb-16 md:pb-24">
        <div className="mb-12">
          <PortfolioCategoryTabs
            categories={artworkCategories}
            jumpToLabel={t.jumpTo}
          />
        </div>

        <div className="space-y-24 md:space-y-32">
          {artworkCategories.map((category) => (
            <CategorySection
              key={category}
              category={category}
              artworks={getArtworksByCategory(category)}
              locale={locale}
              piecesLabel={t.pieces}
              pieceLabel={t.piece}
            />
          ))}
        </div>
      </Container>

      {/* soft CTA */}
      <section className="border-t border-border-subtle bg-bg-base">
        <Container className="py-16 md:py-20">
          <div className="mx-auto max-w-2xl space-y-6 text-center">
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
