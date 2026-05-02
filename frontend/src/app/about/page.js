import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SectionShell } from "@/components/ui/section-shell";

export const metadata = {
  title: "about | akira",
  description: "about akira and the story behind her self portrait journey.",
};

export default function AboutPage() {
  return (
    <div className="content-column space-y-8 py-10 sm:py-14">
      <SectionShell
        id="about-page"
        eyebrow="about"
        title="a longer story about growth, portraits, and reinterpretation"
        variant="accent"
      >
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="card-inner relative aspect-[4/5] overflow-hidden p-2">
            <Image
              src="https://picsum.photos/id/823/900/1200"
              alt="placeholder hero portrait for about page"
              fill
              className="rounded-[calc(var(--radius-md)-4px)] border border-border-subtle object-cover"
              sizes="(max-width: 1024px) 100vw, 35vw"
            />
          </div>
          <div className="space-y-5">
            <div className="card-inner space-y-4 p-5">
              <p className="label-sm">the story</p>
              <div className="divider-subtle" />
              <p className="text-body">
                lorem ipsum dolor sit amet, consectetur adipiscing elit. this section
                is a placeholder for akira&apos;s full artist story, growth arc, and
                process notes over the years.
              </p>
              <p className="text-body">
                lorem ipsum dolor sit amet, consectetur adipiscing elit. this section
                can hold milestones and reflections without adding invented achievements.
              </p>
            </div>
            <Button as="link" href="/portfolio">
              view full portfolio
            </Button>
          </div>
        </div>
      </SectionShell>

      <SectionShell
        id="portraits-over-time"
        eyebrow="self portraits"
        title="the same face, different chapters"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { src: "https://picsum.photos/id/1027/600/800", alt: "self portrait phase 1" },
            { src: "https://picsum.photos/id/1005/600/800", alt: "self portrait phase 2" },
            { src: "https://picsum.photos/id/823/600/800", alt: "self portrait phase 3" },
          ].map((img) => (
            <div key={img.src} className="card-inner relative aspect-[3/4] overflow-hidden p-1.5">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="rounded-[calc(var(--radius-md)-4px)] border border-border-subtle object-cover"
              />
            </div>
          ))}
        </div>
      </SectionShell>
    </div>
  );
}
