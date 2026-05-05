import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { ImageFrame } from "@/components/ui/image-frame";
import { SmartImage } from "@/components/ui/smart-image";
import { PageHeader } from "@/components/layout/page-header";
import { getArtworkById } from "@/lib/content/artworks";
import { pickLocale } from "@/lib/i18n/config";

const HERO_IMAGE_ID = "portrait-01";
const TIMELINE_IMAGE_IDS = ["portrait-04", "portrait-05", "portrait-03"];
const PHASE_IMAGE_IDS = ["portrait-01", "portrait-02", "portrait-05"];

function artworkImage(id) {
  return getArtworkById(id) ?? getArtworkById(HERO_IMAGE_ID);
}

function imageAspect(artwork) {
  if (!artwork) return undefined;
  return { aspectRatio: `${artwork.width ?? 4} / ${artwork.height ?? 5}` };
}

export function AboutPage({ dict, locale = "en" }) {
  const t = dict.about;

  return (
    <>
      <PageHeader
        id="about"
        eyebrow={t.pageEyebrow}
        title={t.pageTitle}
        description={t.pageDescription}
      />

      {/* current self portrait feature */}
      <section className="section-scrap border-b border-dashed border-border-subtle">
        <Container className="py-16 md:py-24">
          <div className="mx-auto max-w-3xl">
            {(() => {
              const art = artworkImage(HERO_IMAGE_ID);
              return (
                <ImageFrame
                  className="relative w-full shadow-lg md:rotate-[0.3deg]"
                  style={imageAspect(art)}
                >
                  <SmartImage
                    src={art.imageSrc}
                    alt={pickLocale(art.alt, locale) || t.pageTitle}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 768px"
                    imgClassName="object-contain p-3 md:p-5"
                  />
                </ImageFrame>
              );
            })()}
          </div>
        </Container>
      </section>

      {/* short current bio */}
      <section className="section-scrap border-b border-dashed border-border-subtle bg-bg-base">
        <Container className="py-16 md:py-24">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="scrap-note h-fit space-y-3 p-5 lg:col-span-4">
              <Eyebrow>{t.bioEyebrow}</Eyebrow>
              <Heading level="h2">{t.bioTitle}</Heading>
            </div>
            <div className="prose scrap-card p-5 md:p-7 lg:col-span-8">
              <p>{t.bio1}</p>
              <p>{t.bio2}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* chronological story */}
      <section className="section-scrap border-b border-dashed border-border-subtle">
        <Container className="py-16 md:py-24">
          <div className="mb-12 max-w-2xl space-y-3">
            <Eyebrow>{t.storyEyebrow}</Eyebrow>
            <Heading level="h2">{t.storyTitle}</Heading>
          </div>

          <ol className="space-y-12 md:space-y-16">
            {t.timeline.map((chapter, index) => {
              const reversed = index % 2 === 1;
              const art = artworkImage(TIMELINE_IMAGE_IDS[index % TIMELINE_IMAGE_IDS.length]);
              return (
                <li
                  key={chapter.era}
                  className={`grid items-center gap-8 md:grid-cols-12 md:gap-10 ${reversed ? "md:[&>:first-child]:order-2" : ""}`}
                >
                  <div className="md:col-span-6">
                    <ImageFrame
                      className={`relative w-full ${reversed ? "md:rotate-[0.45deg]" : "md:rotate-[-0.35deg]"}`}
                      style={imageAspect(art)}
                    >
                      <SmartImage
                        src={art.imageSrc}
                        alt={pickLocale(art.alt, locale) || chapter.imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        imgClassName="object-contain p-3 md:p-4"
                      />
                    </ImageFrame>
                  </div>
                  <div className="scrap-note space-y-3 p-5 md:col-span-6 md:p-6">
                    <Eyebrow>{chapter.era}</Eyebrow>
                    <Heading level="h3">{chapter.title}</Heading>
                    <p className="body">{chapter.body}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </Container>
      </section>

      {/* self portraits over the years */}
      <section className="section-scrap border-b border-dashed border-border-subtle bg-bg-base">
        <Container className="py-16 md:py-24">
          <div className="mb-10 max-w-2xl space-y-3">
            <Eyebrow>{t.portraitsEyebrow}</Eyebrow>
            <Heading level="h2">{t.portraitsTitle}</Heading>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            {t.phases.map((phase, i) => (
              <figure key={phase.caption} className="space-y-3">
                {(() => {
                  const art = artworkImage(PHASE_IMAGE_IDS[i % PHASE_IMAGE_IDS.length]);
                  return (
                    <ImageFrame
                      className="relative w-full"
                      style={imageAspect(art)}
                    >
                      <SmartImage
                        src={art.imageSrc}
                        alt={pickLocale(art.alt, locale) || `${phase.caption} ${phase.note}`}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        imgClassName="object-contain p-3"
                      />
                    </ImageFrame>
                  );
                })()}
                <figcaption className="scrap-note space-y-1 p-3">
                  <p className="caption">{phase.caption}</p>
                  <p className="body-sm">{phase.note}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      {/* closing note + 3 buttons */}
      <section className="section-scrap">
        <Container className="py-16 md:py-24">
          <div className="scrap-note mx-auto max-w-2xl space-y-6 p-6 text-center md:p-8">
            <Heading level="h2">{t.closingTitle}</Heading>
            <p className="body-lg">{t.closingBody}</p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Button
                as="link"
                href={`/${locale}/portfolio`}
                variant="primary"
                size="md"
              >
                {t.ctaArt}
              </Button>
              <Button
                as="link"
                href={`/${locale}/commissions`}
                variant="secondary"
                size="md"
              >
                {t.ctaCommission}
              </Button>
              <Button
                as="link"
                href={`/${locale}`}
                variant="outline"
                size="md"
              >
                {t.ctaHome}
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
