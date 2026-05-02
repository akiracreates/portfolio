import Image from "next/image";
import { PageNav } from "@/components/layout/page-nav";
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
      <main className="w-full p-3 sm:p-4">
        <PageNav />
        <div className="content-column">
        <SectionShell id="about-page" eyebrow="about" title="a longer story about growth, portraits, and reinterpretation">
          <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="inner-card relative aspect-[4/5] overflow-hidden p-1.5">
              <Image
                src="https://picsum.photos/id/823/900/1200"
                alt="placeholder hero portrait for about page"
                fill
                className="rounded-[0.3rem] border border-[#665f89] object-cover"
                sizes="(max-width: 1024px) 100vw, 35vw"
              />
            </div>
            <div className="inner-card space-y-4 p-3">
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
        </div>
      </main>
    </SiteFrame>
  );
}
