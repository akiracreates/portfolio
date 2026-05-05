import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { ArtworkCard } from "@/components/gallery/artwork-card";
import { getFeaturedArtworks } from "@/lib/content/artworks";

function categoryAnchor(category) {
  return `category-${category.toLowerCase().replace(/\s+/g, "-")}`;
}

/**
 * Spec: 3 featured pieces. The card with `isSecret: true` links to /{locale}/spin
 * with prefetch={false}, but is visually indistinguishable from its siblings.
 * Default cards link to /{locale}/portfolio#category-{cat}.
 */
export function FeaturedWorkSection({ dict, locale = "en" }) {
  const t = dict.featured;
  const featured = getFeaturedArtworks().slice(0, 3);

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
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((artwork) => {
            const href = artwork.isSecret
              ? `/${locale}/spin`
              : `/${locale}/portfolio#${categoryAnchor(artwork.category)}`;
            return (
              <Link
                key={artwork.id}
                href={href}
                prefetch={artwork.isSecret ? false : undefined}
                className="block rounded-[var(--radius-lg)] focus-visible-ring"
                aria-label={
                  artwork.isSecret ? undefined : `${artwork.category}`
                }
              >
                <ArtworkCard artwork={artwork} locale={locale} />
              </Link>
            );
          })}
        </div>
      </Section>
    </Container>
  );
}
