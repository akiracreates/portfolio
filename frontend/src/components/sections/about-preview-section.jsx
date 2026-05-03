import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ImageFrame } from "@/components/ui/image-frame";
import { SectionShell } from "@/components/ui/section-shell";

export function AboutPreviewSection() {
  return (
    <SectionShell
      id="about-preview"
      eyebrow="about the artist"
      title="years of self portraits, memory, and reinterpretation"
      template="editorial"
      action={
        <Button as="link" href="/about" variant="secondary" size="sm">
          read more
        </Button>
      }
    >
      <div className="flex flex-col gap-6">
        <ImageFrame dashed className="relative aspect-square w-full max-w-sm mx-auto sm:max-w-none">
          <Image
            src="https://picsum.photos/id/1005/900/900"
            alt="placeholder self portrait detail"
            fill
            sizes="(max-width: 640px) 100vw, 32rem"
            className="object-cover"
          />
        </ImageFrame>
        <div className="card-inner space-y-4 p-5">
          <p className="label-sm title-underline">artist note</p>
          <div className="border-b border-dashed border-primary/25" />
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
