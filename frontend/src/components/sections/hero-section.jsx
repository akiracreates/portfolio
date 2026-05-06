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
      className="scroll-mt-header relative overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <Container className="relative py-16 md:py-20 lg:py-24">
        <div className="hero-cover overflow-hidden p-2 md:p-3">
          <div className="hero-divider grid items-center gap-6 lg:grid-cols-[minmax(0,1.34fr)_minmax(400px,0.96fr)] lg:gap-10">
            <div className="hero-copy space-y-8 md:space-y-9">
              <Eyebrow>{t.eyebrow}</Eyebrow>
              <h1 id="hero-heading" className="heading-display max-w-3xl">
                {t.titleLeading}{" "}
                <span className="text-highlight">{t.titleHighlight}</span>
                {t.titleTrailing}
              </h1>
              <p className="body-lg max-w-2xl">{t.lead}</p>
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
                <Button
                  as="link"
                  href={`/${locale}/about`}
                  variant="ghost"
                  size="lg"
                >
                  {t.ctaAbout}
                </Button>
              </div>
              <div className="broken-divider max-w-lg" aria-hidden />
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-1">
                <Stat label={t.statCommissions} value={t.statCommissionsValue} />
                <Sep />
                <Stat label={t.statResponse} value={t.statResponseValue} />
              </div>
            </div>

            <div className="hero-portrait-wrap">
              <div className="relative mx-auto max-w-[620px] lg:ml-auto">
                <ImageFrame
                  variant="hero"
                  className="relative w-full shadow-lg md:rotate-[0.4deg]"
                  style={{ aspectRatio: "2500 / 3000" }}
                >
                  <SmartImage
                    src={imagekitUrl("images/portraits/self")}
                    alt={t.imageAlt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 560px"
                    imgClassName="object-contain p-4 md:p-6"
                  />
                </ImageFrame>
                <p className="absolute -bottom-4 left-3 text-xs text-text-tertiary/80 sm:left-2">
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
