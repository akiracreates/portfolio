import Image from "next/image";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section id="hero" className="relative py-12 sm:py-16 lg:py-20" aria-labelledby="hero-heading">
      <div className="content-column">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6 animate-fade-in-up">
            <div className="space-y-3">
              <p className="label-sm animate-fade-in animate-delay-1">digital portrait artist</p>
              <h1
                id="hero-heading"
                className="heading-display text-[clamp(2rem,1.4rem+2vw,3.25rem)]"
              >
                akira&apos;s quiet corner of portraits and stories
              </h1>
            </div>

            <p className="text-body text-sm sm:text-base animate-fade-in animate-delay-2">
              lorem ipsum dolor sit amet, this space holds recent work, personal notes,
              and commission openings for new portraits.
            </p>

            <div className="card-inner p-4 space-y-3 max-w-md animate-fade-in animate-delay-3">
              <p className="label-sm">archive entry no. 01</p>
              <div className="divider-gradient" />
              <div className="flex flex-wrap gap-3">
                <Button as="link" href="/portfolio">
                  view portfolio
                </Button>
                <Button as="link" href="/commissions" variant="secondary">
                  commissions
                </Button>
                <Button as="link" href="/about" variant="ghost" size="sm">
                  read more
                </Button>
              </div>
            </div>
          </div>

          <div className="card-inner relative overflow-hidden p-2 animate-fade-in animate-delay-4">
            <div className="absolute left-3.5 top-3.5 z-10">
              <span className="inline-block rounded-[var(--radius-sm)] border border-primary/40 bg-bg-base/80 backdrop-blur-sm px-2.5 py-1 label-sm">
                featured self portrait
              </span>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[calc(var(--radius-md)-4px)] border border-border-subtle">
              <Image
                src="https://picsum.photos/id/1027/900/1200"
                alt="placeholder for recent self portrait"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
