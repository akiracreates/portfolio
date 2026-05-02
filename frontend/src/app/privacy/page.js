import { SiteFrame } from "@/components/layout/site-frame";
import { SectionShell } from "@/components/ui/section-shell";

export const metadata = {
  title: "privacy | akira",
  description: "privacy placeholder page for future policy details.",
};

export default function PrivacyPage() {
  return (
    <SiteFrame>
      <main className="w-full p-4 sm:p-6 lg:p-8">
        <SectionShell id="privacy-page" eyebrow="privacy" title="privacy policy placeholder">
          <p className="section-copy">
            lorem ipsum privacy placeholder. replace with approved legal text before launch.
          </p>
        </SectionShell>
      </main>
    </SiteFrame>
  );
}
