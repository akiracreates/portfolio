import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { ArtworkCard } from "@/components/gallery/artwork-card";
import { getHomepageFeaturedArtworks } from "@/lib/content/artworks";

function categoryAnchor(category) {
  return `category-${category.toLowerCase().replace(/\s+/g, "-")}`;
}

/**
 * Spec: 4 featured pieces. The card with `isSecret: true` links to /{locale}/spin
 * with prefetch={false}, but is visually indistinguishable from its siblings.
 * Default cards link to /{locale}/portfolio#category-{cat}.
 */
export function FeaturedWorkSection({ dict, locale = "en" }) {
  const t = dict.featured;
  const featured = getHomepageFeaturedArtworks();
  const layouts = [
    "md:translate-y-2 md:rotate-[-0.7deg]",
    "md:-translate-y-2 md:rotate-[0.55deg]",
    "md:translate-y-4 md:rotate-[0.35deg]",
    "md:translate-y-1 md:rotate-[-0.45deg]",
  ];

  return (
    <Container>
      <Section
        id="featured"
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
            const href = artwork.isSecret
              ? `/${locale}/spin`
              : `/${locale}/portfolio#${categoryAnchor(artwork.category)}`;
            return (
              <Link
                key={artwork.id}
                href={href}
                prefetch={artwork.isSecret ? false : undefined}
                className={`block rounded-[18px] focus-visible-ring transition-transform duration-[var(--duration-base)] ${layouts[index % layouts.length]}`}
                aria-label={
                  artwork.isSecret ? undefined : `${artwork.category}`
                }
              >
                <ArtworkCard artwork={artwork} locale={locale} variant="featured" />
              </Link>
            );
          })}
        </div>
      </Section>
    </Container>
  );
}
