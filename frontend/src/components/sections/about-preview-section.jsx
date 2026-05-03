import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { ImageFrame } from "@/components/ui/image-frame";

export function AboutPreviewSection() {
  return (
    <section
      id="about"
      className="scroll-mt-header border-t border-border-subtle bg-bg-base"
      aria-labelledby="about-heading"
    >
      <Container className="py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <ImageFrame className="relative aspect-square w-full max-w-md">
              <Image
                src="https://picsum.photos/id/1005/900/900"
                alt="akira's studio detail"
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover"
              />
            </ImageFrame>
          </div>
          <div className="space-y-6 lg:col-span-7 lg:pt-6">
            <Eyebrow>about</Eyebrow>
            <Heading level="h1" id="about-heading">
              years of self portraits, memory, and reinterpretation.
            </Heading>
            <p className="body-lg">
              i revisit old sketches and transform them into digital portraits
              that feel calm, dreamy, and intimate — each piece capturing a
              moment of quiet reflection layered with soft palettes and careful
              brushwork.
            </p>
            <p className="body">
              my work moves between portraits, animal studies, and small still
              life scenes. i take a small number of commissions each season so i
              can give every piece the attention it deserves.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-2 transition-colors hover:text-text-primary"
            >
              read the full story
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
