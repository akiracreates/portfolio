import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Divider } from "@/components/ui/divider";
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
    "md:translate-y-2 md:rotate-[-0.7deg]",
    "md:-translate-y-2 md:rotate-[0.55deg]",
    "md:translate-y-4 md:rotate-[0.35deg]",
    "md:translate-y-1 md:rotate-[-0.45deg]",
  ];

  return (
    <Container>
      <Divider className="mt-2 md:mt-4" />
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
            const href = `/${locale}/portfolio#${categoryAnchor(artwork.category)}`;
            return (
              <Link
                key={artwork.id}
                href={href}
                className={`block rounded-[18px] focus-visible-ring transition-transform duration-[var(--duration-base)] ${layouts[index % layouts.length]}`}
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
  );
}
