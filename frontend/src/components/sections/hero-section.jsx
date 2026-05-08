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
      <Container className="relative py-10 md:py-20 lg:py-24">
        <div className="hero-cover card-surface-warm overflow-hidden p-1 md:p-3">
          <div className="hero-cover-inner">
            <div className="hero-divider grid items-center gap-2 sm:gap-3 lg:grid-cols-[minmax(0,1.34fr)_minmax(400px,0.96fr)] lg:gap-10">
              <div className="hero-copy space-y-5 md:space-y-9">
                <Eyebrow>{t.eyebrow}</Eyebrow>
                <h1
                  id="hero-heading"
                  className="hero-heading-clean heading-display max-w-3xl"
                >
                  {t.titleLeading}{" "}
                  <span className="text-highlight">{t.titleHighlight}</span>
                  {t.titleTrailing}
                </h1>
                <div className="max-w-2xl space-y-2">
                  <p className="body-lg">
                    {t.leadPrefix}
                    <span className="deco-dashed-underline">{t.leadEmphasis}</span>
                  </p>
                  {t.supportingText ? <p className="body">{t.supportingText}</p> : null}
                </div>
                <div className="grid grid-cols-1 gap-2.5 pt-1 sm:grid-cols-2 sm:gap-3 lg:flex lg:flex-wrap lg:items-center">
                  <Button
                    as="link"
                    href={`/${locale}/commissions`}
                    variant="primary"
                    size="lg"
                    className="w-full sm:col-span-2 lg:w-auto"
                  >
                    {t.ctaSecondary}
                  </Button>
                  <Button
                    as="link"
                    href={`/${locale}/about`}
                    variant="warm-outline"
                    size="lg"
                    className="w-full sm:w-auto lg:w-auto"
                  >
                    {t.ctaAbout}
                  </Button>
                  <Button
                    as="link"
                    href={`/${locale}/portfolio`}
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto lg:w-auto"
                  >
                    {t.ctaPrimary}
                  </Button>
                </div>
                <div className="broken-divider max-w-lg opacity-90" aria-hidden />
                <div className="hero-meta-row hidden flex-wrap items-center gap-x-4 gap-y-1.5 pt-0.5 md:flex">
                  <Stat label={t.statCommissions} value={t.statCommissionsValue} />
                  <Sep />
                  <Stat label={t.statResponse} value={t.statResponseValue} />
                </div>
              </div>

              <div className="hero-portrait-wrap">
                <div className="relative mx-auto max-w-[560px] lg:ml-auto">
                  <ImageFrame
                    variant="hero"
                    className="hero-portrait-frame relative w-full md:rotate-[0.4deg]"
                    style={{ aspectRatio: "2500 / 3000" }}
                  >
                    <SmartImage
                      src={imagekitUrl("images/portraits/self")}
                      alt={t.imageAlt}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 560px"
                      className="hero-portrait-art deco-warm-tape"
                      imgClassName="object-contain p-2.5 md:p-6"
                    />
                  </ImageFrame>
                  <p className="mt-1 px-1 text-[0.81rem] leading-snug text-text-secondary/95 sm:absolute sm:-bottom-3 sm:left-2 sm:mt-0 sm:px-0 sm:text-xs sm:text-text-secondary/86">
                    i love experimenting and being expressive in my work
                  </p>
                </div>
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
    <span
      className="hidden h-[5px] w-[5px] rounded-full bg-border-default/70 align-middle sm:inline-block"
      aria-hidden
    />
  );
}
