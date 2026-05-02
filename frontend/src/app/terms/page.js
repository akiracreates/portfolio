import { SectionShell } from "@/components/ui/section-shell";
import { termsItems } from "@/lib/content/terms";

export const metadata = {
  title: "terms | akira",
  description:
    "commission and usage terms placeholder page for future production policy.",
};

export default function TermsPage() {
  return (
    <div className="content-column space-y-8 py-10 sm:py-14">
      <SectionShell id="terms-page" eyebrow="terms" title="terms and conditions">
        <div className="space-y-4">
          {termsItems.map((item) => (
            <article
              key={item.id}
              className={`card-inner p-5 ${
                item.highlighted
                  ? "border-secondary/60 shadow-[0_0_12px_rgba(240,175,129,0.12)]"
                  : ""
              }`}
            >
              <h2 className="text-sm font-medium text-text-primary">
                {item.title}
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-text-secondary">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </SectionShell>
    </div>
  );
}
