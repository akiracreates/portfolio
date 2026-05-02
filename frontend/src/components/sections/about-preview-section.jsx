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
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="card-frame relative aspect-square overflow-hidden p-2">
          <Image
            src="/placeholders/portrait-02.svg"
            alt="placeholder self portrait detail"
            fill
            sizes="(max-width: 1024px) 100vw, 32vw"
            className="rounded-md border border-border-soft object-cover"
          />
        </div>
        <p className="section-copy">
          lorem ipsum dolor sit amet, consectetur adipiscing elit. dolor sit amet, akira revisits old sketches and
          transforms them into digital portraits that feel calm, dreamy, and intimate.
        </p>
      </div>
    </SectionShell>
  );
}
