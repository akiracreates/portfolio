import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ImageFrame } from "@/components/ui/image-frame";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="scroll-mt-header relative overflow-hidden border-b border-border-subtle"
      aria-labelledby="hero-heading"
    >
      {/* subtle ambient glow — secondary accent, low intensity */}
      <div
        className="pointer-events-none absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full opacity-[0.18] blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, var(--accent-secondary) 0%, transparent 70%)",
        }}
        aria-hidden
      />
      <Container className="relative py-20 md:py-28 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="space-y-7 lg:col-span-7">
            <Eyebrow>digital portrait artist</Eyebrow>
            <h1
              id="hero-heading"
              className="heading-display max-w-2xl"
            >
              quiet portraits, <span className="text-highlight">soft stories</span>, drawn with intention.
            </h1>
            <p className="body-lg max-w-xl">
              akira&apos;s studio for digital portraits, animal studies, and still life.
              browse recent work or commission a piece made just for you.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button as="link" href="/portfolio" variant="primary" size="lg">
                view portfolio
              </Button>
              <Button as="link" href="/commissions" variant="outline" size="lg">
                commission a piece
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-4">
              <Stat label="commissions" value="open" />
              <Divider />
              <Stat label="response" value="within 48h" />
              <Divider />
              <Stat label="based in" value="online" />
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative">
              <ImageFrame className="relative aspect-[4/5] w-full shadow-lg">
                <Image
                  src="https://picsum.photos/id/1027/900/1200"
                  alt="featured self portrait by akira"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-cover"
                />
              </ImageFrame>
              <div className="absolute -bottom-4 -left-4 hidden rounded-[var(--radius-md)] border border-border-subtle bg-bg-surface px-4 py-3 shadow-md sm:block">
                <p className="caption">latest piece</p>
                <p className="body-sm font-medium text-text-primary">
                  self portrait no. 1
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

function Divider() {
  return (
    <span
      className="hidden h-3 w-px bg-border-default sm:block"
      aria-hidden
    />
  );
}
