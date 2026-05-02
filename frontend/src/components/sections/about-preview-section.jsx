import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SectionShell } from "@/components/ui/section-shell";

export function AboutPreviewSection() {
  return (
    <SectionShell
      id="about-preview"
      eyebrow="about the artist"
      title="years of self portraits, memory, and reinterpretation"
      action={
        <Button as="link" href="/about" variant="secondary">
          read more
        </Button>
      }
    >
      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="inner-card relative aspect-square overflow-hidden p-1.5">
          <Image
            src="https://picsum.photos/id/1005/900/900"
            alt="placeholder self portrait detail"
            fill
            sizes="(max-width: 1024px) 100vw, 32vw"
            className="rounded-[0.3rem] border border-[#6e668f] object-cover"
          />
        </div>
        <div className="inner-card p-3">
          <p className="section-copy text-sm">
            lorem ipsum dolor sit amet, consectetur adipiscing elit. dolor sit amet, akira revisits old sketches and
            transforms them into digital portraits that feel calm, dreamy, and intimate.
          </p>
        </div>
      </div>
    </SectionShell>
  );
}
