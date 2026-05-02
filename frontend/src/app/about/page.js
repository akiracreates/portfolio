import Image from "next/image";
import { SiteFrame } from "@/components/layout/site-frame";
import { Button } from "@/components/ui/button";
import { SectionShell } from "@/components/ui/section-shell";

export const metadata = {
  title: "about | akira",
  description: "about akira and the story behind her self portrait journey.",
};

export default function AboutPage() {
  return (
    <SiteFrame>
      <main className="w-full p-4 sm:p-6 lg:p-8">
        <SectionShell id="about-page" eyebrow="about" title="a longer story about growth, portraits, and reinterpretation">
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="card-frame relative aspect-[4/5] overflow-hidden p-2">
              <Image
                src="/placeholders/portrait-03.svg"
                alt="placeholder hero portrait for about page"
                fill
                className="rounded-md border border-border-soft object-cover"
                sizes="(max-width: 1024px) 100vw, 35vw"
              />
            </div>
            <div className="space-y-4">
              <p className="section-copy">
                lorem ipsum dolor sit amet, consectetur adipiscing elit. this section is a placeholder for akira&apos;s full
                artist story, growth arc, and process notes over the years.
              </p>
              <p className="section-copy">
                lorem ipsum dolor sit amet, consectetur adipiscing elit. this section can hold milestones and reflections
                without adding invented achievements.
              </p>
              <Button as="link" href="/portfolio">
                view full portfolio
              </Button>
            </div>
          </div>
        </SectionShell>
      </main>
    </SiteFrame>
  );
}
