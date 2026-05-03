import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { ImageFrame } from "@/components/ui/image-frame";

export function AboutPreviewSection({ dict, locale = "en" }) {
  const t = dict.aboutPreview;
  return (
    <section
      id="about-preview"
      className="scroll-mt-header border-t border-border-subtle bg-bg-base"
      aria-labelledby="about-heading"
    >
      <Container className="py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <ImageFrame className="relative aspect-square w-full max-w-md">
              <Image
                src="https://picsum.photos/id/1005/900/900"
                alt={t.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover"
              />
            </ImageFrame>
          </div>
          <div className="space-y-6 lg:col-span-7 lg:pt-6">
            <Eyebrow>{t.eyebrow}</Eyebrow>
            <Heading level="h1" id="about-heading">
              {t.title}
            </Heading>
            <p className="body-lg">{t.body1}</p>
            <p className="body">{t.body2}</p>
            <Link
              href={`/${locale}/about`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-2 transition-colors hover:text-text-primary focus-visible-ring rounded-md"
            >
              {t.cta}
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
