import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { ImageFrame } from "@/components/ui/image-frame";
import { PageHeader } from "@/components/layout/page-header";

export const metadata = {
  title: "about | akira",
  description: "about akira and the story behind her self portrait journey.",
};

const phases = [
  { src: "https://picsum.photos/id/1027/600/800", alt: "self portrait — early phase", year: "phase i" },
  { src: "https://picsum.photos/id/1005/600/800", alt: "self portrait — middle phase", year: "phase ii" },
  { src: "https://picsum.photos/id/823/600/800", alt: "self portrait — recent phase", year: "phase iii" },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        id="about"
        eyebrow="about"
        title="a longer story about growth, portraits, and reinterpretation."
        description="from old sketchbooks to digital studies — a quiet path that keeps returning to the same face, told differently each time."
        action={
          <Button as="link" href="/portfolio" variant="secondary" size="md">
            view full portfolio
          </Button>
        }
      />

      <Container className="py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <ImageFrame className="relative aspect-[4/5] w-full">
              <Image
                src="https://picsum.photos/id/823/900/1200"
                alt="portrait of akira"
                fill
                sizes="(max-width: 1024px) 100vw, 460px"
                className="object-cover"
              />
            </ImageFrame>
          </div>
          <div className="lg:col-span-7">
            <Eyebrow>the story</Eyebrow>
            <Heading level="h2" className="mt-3">
              the same face, different chapters.
            </Heading>
            <div className="prose mt-6">
              <p>
                i started painting self portraits as a way to remember moments
                that felt too small to write down. they piled up — page after
                page of the same eyes in different light.
              </p>
              <p>
                when i moved to digital, i didn&apos;t leave that practice behind.
                each commission, each personal piece, still holds that same
                quiet attention. soft palettes, careful brushwork, and a lot of
                listening to what the reference is asking for.
              </p>
              <p>
                i take a small number of commissions each season so the same
                care can be given to other people&apos;s stories too.
              </p>
            </div>
          </div>
        </div>
      </Container>

      <section className="border-t border-border-subtle bg-bg-base">
        <Container className="py-16 md:py-24">
          <div className="mb-10 max-w-2xl space-y-3">
            <Eyebrow>self portraits</Eyebrow>
            <Heading level="h2">three phases, one practice.</Heading>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            {phases.map((p) => (
              <figure key={p.src} className="space-y-3">
                <ImageFrame className="relative aspect-[3/4] w-full">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover"
                  />
                </ImageFrame>
                <figcaption className="caption">{p.year}</figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
