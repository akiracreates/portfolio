import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { ArtworkCard } from "@/components/gallery/artwork-card";
import { artworks } from "@/lib/content/artworks";

export function FeaturedWorkSection() {
  const featured = artworks.filter((a) => a.featured).slice(0, 3);

  return (
    <Container>
      <Section
        id="featured"
        eyebrow="featured"
        title="recent pieces, freshly made"
        action={
          <Button as="link" href="/portfolio" variant="ghost" size="sm">
            view all →
          </Button>
        }
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork} />
          ))}
        </div>
      </Section>
    </Container>
  );
}
