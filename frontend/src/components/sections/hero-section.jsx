import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ImageFrame } from "@/components/ui/image-frame";
import { SmartImage } from "@/components/ui/smart-image";
import { imagekitUrl } from "@/lib/images/imagekit";

export function HeroSection({ dict, locale = "en" }) {
  const t = dict.hero;
  return (
    <section
      id="hero"
      className="scroll-mt-header relative overflow-hidden border-b border-dashed border-border-subtle"
      aria-labelledby="hero-heading"
    >
      <Container className="relative py-16 md:py-20 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="scrap-note corner-marks space-y-7 p-5 md:p-7 lg:col-span-6">
            <Eyebrow>{t.eyebrow}</Eyebrow>
            <h1 id="hero-heading" className="heading-display max-w-2xl">
              {t.titleLeading}{" "}
              <span className="text-highlight">{t.titleHighlight}</span>
              {t.titleTrailing}
            </h1>
            <p className="body-lg max-w-xl">{t.lead}</p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button
                as="link"
                href={`/${locale}/portfolio`}
                variant="primary"
                size="lg"
              >
                {t.ctaPrimary}
              </Button>
              <Button
                as="link"
                href={`/${locale}/commissions`}
                variant="outline"
                size="lg"
              >
                {t.ctaSecondary}
              </Button>
            </div>
            <div className="broken-divider" aria-hidden />
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-1">
              <Stat label={t.statCommissions} value={t.statCommissionsValue} />
              <Sep />
              <Stat label={t.statResponse} value={t.statResponseValue} />
              <Sep />
              <Stat label={t.statBased} value={t.statBasedValue} />
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative mx-auto max-w-[560px] lg:ml-auto">
              <ImageFrame
                className="relative w-full shadow-lg md:rotate-[0.45deg]"
                style={{ aspectRatio: "2500 / 3000" }}
              >
                <SmartImage
                  src={imagekitUrl("images/portraits/self")}
                  alt={t.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 480px"
                  imgClassName="object-contain p-3 md:p-5"
                />
              </ImageFrame>
              <div className="scrap-note absolute -bottom-4 -left-3 hidden px-4 py-3 shadow-md sm:block">
                <p className="caption">{t.badgeLabel}</p>
                <p className="body-sm font-medium text-text-primary">
                  {t.badgeTitle}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Stat({ label, value }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="caption">{label}</span>
      <span className="body-sm font-medium text-text-primary">{value}</span>
    </div>
  );
}

function Sep() {
  return (
    <span className="hidden h-3 w-px bg-border-default sm:block" aria-hidden />
  );
}
