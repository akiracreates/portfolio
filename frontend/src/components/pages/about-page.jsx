import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { ImageFrame } from "@/components/ui/image-frame";
import { PageHeader } from "@/components/layout/page-header";

const TIMELINE_IMAGES = [
  "https://picsum.photos/id/64/600/800",
  "https://picsum.photos/id/177/600/800",
  "https://picsum.photos/id/823/600/800",
];

const PHASE_IMAGES = [
  "https://picsum.photos/id/1027/600/800",
  "https://picsum.photos/id/1005/600/800",
  "https://picsum.photos/id/823/600/800",
];

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
      <section className="border-b border-border-subtle">
        <Container className="py-16 md:py-24">
          <div className="mx-auto max-w-3xl">
            <ImageFrame className="relative aspect-[4/5] w-full shadow-lg">
              <Image
                src="https://picsum.photos/id/1027/1200/1500"
                alt={t.pageTitle}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            </ImageFrame>
          </div>
        </Container>
      </section>

      {/* short current bio */}
      <section className="border-b border-border-subtle bg-bg-base">
        <Container className="py-16 md:py-24">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="space-y-3 lg:col-span-4">
              <Eyebrow>{t.bioEyebrow}</Eyebrow>
              <Heading level="h2">{t.bioTitle}</Heading>
            </div>
            <div className="prose lg:col-span-8">
              <p>{t.bio1}</p>
              <p>{t.bio2}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* chronological story */}
      <section className="border-b border-border-subtle">
        <Container className="py-16 md:py-24">
          <div className="mb-12 max-w-2xl space-y-3">
            <Eyebrow>{t.storyEyebrow}</Eyebrow>
            <Heading level="h2">{t.storyTitle}</Heading>
          </div>

          <ol className="space-y-16 md:space-y-24">
            {t.timeline.map((chapter, index) => {
              const reversed = index % 2 === 1;
              const img = TIMELINE_IMAGES[index % TIMELINE_IMAGES.length];
              return (
                <li
                  key={chapter.era}
                  className={`grid items-center gap-8 md:grid-cols-12 md:gap-12 ${reversed ? "md:[&>:first-child]:order-2" : ""}`}
                >
                  <div className="md:col-span-6">
                    <ImageFrame className="relative aspect-[4/5] w-full">
                      <Image
                        src={img}
                        alt={chapter.imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </ImageFrame>
                  </div>
                  <div className="space-y-3 md:col-span-6">
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
      <section className="border-b border-border-subtle bg-bg-base">
        <Container className="py-16 md:py-24">
          <div className="mb-10 max-w-2xl space-y-3">
            <Eyebrow>{t.portraitsEyebrow}</Eyebrow>
            <Heading level="h2">{t.portraitsTitle}</Heading>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            {t.phases.map((phase, i) => (
              <figure key={phase.caption} className="space-y-3">
                <ImageFrame className="relative aspect-[3/4] w-full">
                  <Image
                    src={PHASE_IMAGES[i % PHASE_IMAGES.length]}
                    alt={`${phase.caption} — ${phase.note}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover"
                  />
                </ImageFrame>
                <figcaption className="space-y-1">
                  <p className="caption">{phase.caption}</p>
                  <p className="body-sm">{phase.note}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      {/* closing note + 3 buttons */}
      <section>
        <Container className="py-16 md:py-24">
          <div className="mx-auto max-w-2xl space-y-6 text-center">
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
