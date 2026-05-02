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
        <Button as="link" href="/about" variant="secondary" size="sm">
          read more
        </Button>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="card-inner relative aspect-square overflow-hidden p-2">
          <Image
            src="https://picsum.photos/id/1005/900/900"
            alt="placeholder self portrait detail"
            fill
            sizes="(max-width: 1024px) 100vw, 35vw"
            className="rounded-[calc(var(--radius-md)-4px)] border border-border-subtle object-cover"
          />
        </div>
        <div className="card-inner space-y-4 p-5">
          <p className="label-sm">artist note</p>
          <div className="divider-subtle" />
          <p className="text-body text-sm sm:text-[0.95rem]">
            lorem ipsum dolor sit amet, consectetur adipiscing elit. dolor sit amet,
            akira revisits old sketches and transforms them into digital portraits
            that feel calm, dreamy, and intimate.
          </p>
          <p className="text-body text-sm sm:text-[0.95rem]">
            each piece captures a moment of quiet reflection, layered with soft
            palettes and careful brushwork.
          </p>
        </div>
      </div>
    </SectionShell>
  );
}
