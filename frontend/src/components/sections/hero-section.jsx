import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SectionShell } from "@/components/ui/section-shell";

export function HeroSection() {
  return (
    <SectionShell id="hero" eyebrow="digital portrait artist" title="akira's quiet corner of portraits and stories">
      <div className="grid gap-4 lg:grid-cols-[1fr_0.78fr] lg:items-start">
        <div className="space-y-4">
          <p className="section-copy">
            lorem ipsum dolor sit amet, this space holds recent work, personal notes, and commission openings for new
            portraits.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button as="link" href="/portfolio">
              view portfolio
            </Button>
            <Button as="link" href="/commissions" variant="secondary">
              commissions
            </Button>
            <Button as="link" href="/about" variant="ghost">
              read more
            </Button>
          </div>
        </div>
        <div className="inner-card relative aspect-[4/5] overflow-hidden p-1.5">
          <div className="relative h-full w-full overflow-hidden rounded-[0.3rem] border border-[#6e668f]">
            <Image
              src="https://picsum.photos/id/1027/900/1200"
              alt="placeholder for recent self portrait"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 35vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
