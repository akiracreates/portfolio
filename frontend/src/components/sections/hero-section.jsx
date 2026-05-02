import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SectionShell } from "@/components/ui/section-shell";

export function HeroSection() {
  return (
    <SectionShell id="hero" eyebrow="digital portrait artist" title="akira's quiet corner of portraits and stories">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-4">
          <p className="section-copy">
            lorem ipsum dolor sit amet, this space holds recent work, personal notes, and commission openings for new
            portraits.
          </p>
          <div className="flex flex-wrap gap-3">
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
        <div className="card-frame relative aspect-[4/5] overflow-hidden p-2">
          <div className="relative h-full w-full overflow-hidden rounded-md border border-border-soft">
            <Image
              src="/placeholders/portrait-01.svg"
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
