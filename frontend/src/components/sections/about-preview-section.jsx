import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { ImageFrame } from "@/components/ui/image-frame";
import { SmartImage } from "@/components/ui/smart-image";
import { getArtworkById } from "@/lib/content/artworks";
import { pickLocale } from "@/lib/i18n/config";

export function AboutPreviewSection({ dict, locale = "en" }) {
  const t = dict.aboutPreview;
  const introArtwork = getArtworkById("portrait-05") ?? getArtworkById("portrait-01");
  const aspectStyle = introArtwork
    ? { aspectRatio: `${introArtwork.width ?? 4} / ${introArtwork.height ?? 5}` }
    : undefined;

  return (
    <section
      id="about-preview"
      className="section-scrap scroll-mt-header border-t border-dashed border-border-subtle bg-bg-base"
      aria-labelledby="about-heading"
    >
      <Container className="py-16 md:py-24">
        <div className="grid gap-9 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            {introArtwork && (
              <ImageFrame
                className="relative w-full max-w-md md:rotate-[-0.45deg]"
                style={aspectStyle}
              >
                <SmartImage
                  src={introArtwork.imageSrc}
                  alt={pickLocale(introArtwork.alt, locale) || t.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 420px"
                  imgClassName="object-contain p-3 md:p-4"
                />
              </ImageFrame>
            )}
          </div>
          <div className="scrap-note space-y-6 p-5 md:p-7 lg:col-span-7 lg:mt-8">
            <Eyebrow>{t.eyebrow}</Eyebrow>
            <Heading level="h1" id="about-heading">
              {t.title}
            </Heading>
            <p className="body-lg">{t.body1}</p>
            <p className="body">{t.body2}</p>
            <Link
              href={`/${locale}/about`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-2 transition-colors hover:text-text-primary focus-visible-ring rounded-md"
            >
              {t.cta}
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
