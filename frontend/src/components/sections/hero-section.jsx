import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ImageFrame } from "@/components/ui/image-frame";

export function HeroSection() {
  return (
    <section id="hero" className="relative py-12 sm:py-16 lg:py-20" aria-labelledby="hero-heading">
      <div className="content-column">
        <div className="flex flex-col gap-10">
          <div className="space-y-6 animate-fade-in-up">
            <div className="space-y-3">
              <p className="label-sm title-underline animate-fade-in animate-delay-1">
                digital portrait artist
              </p>
              <h1 id="hero-heading" className="heading-display heading-xl">
                akira&apos;s quiet corner of portraits and stories
              </h1>
            </div>

            <p className="text-body animate-fade-in animate-delay-2 text-sm sm:text-base">
              lorem ipsum dolor sit amet, this space holds recent work, personal notes,
              and commission openings for new portraits.
            </p>

            <div className="card-inner max-w-md space-y-3 p-4 animate-fade-in animate-delay-3">
              <p className="label-sm">archive entry no. 01</p>
              <div className="border-b border-dashed border-primary/25" />
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

          <div className="card-inner relative animate-fade-in animate-delay-4 overflow-hidden p-3">
            <div className="absolute left-4 top-4 z-10">
              <span className="label-sm inline-block rounded-full border-2 border-dashed border-primary/55 bg-bg-base/85 px-3 py-1 text-primary backdrop-blur-sm">
                featured self portrait
              </span>
            </div>
            <ImageFrame dashed className="relative aspect-[4/5] w-full">
              <Image
                src="https://picsum.photos/id/1027/900/1200"
                alt="placeholder for recent self portrait"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 32rem"
                className="object-cover"
              />
            </ImageFrame>
          </div>
        </div>
      </div>
    </section>
  );
}
