import { SectionShell } from "@/components/ui/section-shell";

export const metadata = {
  title: "privacy | akira",
  description: "privacy placeholder page for future policy details.",
};

export default function PrivacyPage() {
  return (
    <div className="content-column space-y-8 py-10 sm:py-14">
      <SectionShell
        id="privacy-page"
        eyebrow="privacy"
        title="privacy policy placeholder"
      >
        <div className="card-inner p-5">
          <p className="text-body text-sm">
            lorem ipsum privacy placeholder. replace with approved legal text
            before launch.
          </p>
        </div>
      </SectionShell>
    </div>
  );
}
