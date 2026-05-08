import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionDividerBleed } from "@/components/ui/divider";
import { Section } from "@/components/ui/section";
import { ArtworkCard } from "@/components/gallery/artwork-card";
import { getHomepageFeaturedArtworks } from "@/lib/content/artworks";

function categoryAnchor(category) {
  return `category-${category.toLowerCase().replace(/\s+/g, "-")}`;
}

export function FeaturedWorkSection({ dict, locale = "en" }) {
  const t = dict.featured;
  const featured = getHomepageFeaturedArtworks();
  const layouts = [
    "md:translate-y-2 md:rotate-[-0.85deg]",
    "md:-translate-y-2 md:rotate-[0.7deg]",
    "md:translate-y-3 md:rotate-[-0.35deg]",
    "md:-translate-y-1 md:rotate-[0.95deg]",
  ];

  return (
    <>
      <SectionDividerBleed className="mt-2 md:mt-4" />
      <Container>
      <Section
        id="featured"
        className="featured-section"
        eyebrow={t.eyebrow}
        title={t.title}
        action={
          <Button
            as="link"
            href={`/${locale}/portfolio`}
            variant="ghost"
            size="sm"
          >
            {t.cta} →
          </Button>
        }
      >
        <div className="featured-curation grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {featured.map((artwork, index) => {
            const href = `/${locale}/portfolio#${categoryAnchor(artwork.category)}`;
            return (
              <Link
                key={artwork.id}
                href={href}
                className={`featured-item block rounded-[18px] focus-visible-ring transition-transform duration-[var(--duration-base)] ${layouts[index % layouts.length]} ${index === 1 ? "featured-item--taped" : ""}`}
                aria-label={`${artwork.category}`}
              >
                <ArtworkCard
                  artwork={artwork}
                  locale={locale}
                  variant="featured"
                  showFeaturedBadge={false}
                />
              </Link>
            );
          })}
        </div>
      </Section>
      </Container>
    </>
  );
}
