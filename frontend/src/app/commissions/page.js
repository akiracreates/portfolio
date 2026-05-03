import { ContactForm } from "@/components/forms/contact-form";
import { SectionShell } from "@/components/ui/section-shell";
import { commissionOfferings } from "@/lib/content/commissions";
import { termsItems } from "@/lib/content/terms";

export const metadata = {
  title: "commissions | akira",
  description: "commission process, placeholder pricing, terms, and order form.",
};

export default function CommissionsPage() {
  return (
    <div className="content-column space-y-8 py-10 sm:py-14">
      <SectionShell
        id="commissions-page"
        eyebrow="commissions"
        title="work with me"
        variant="accent"
      >
        <div className="flex flex-col gap-4">
          {commissionOfferings.map((item) => (
            <article key={item.id} className="card-inner space-y-3 p-5">
              <h3 className="text-sm font-semibold text-primary">
                {item.title}
              </h3>
              <p className="text-xs leading-relaxed text-text-secondary">
                {item.description}
              </p>
              <div className="divider-subtle" />
              <p className="text-xs text-text-tertiary">
                pricing: {item.pricePlaceholder}
              </p>
              <ul className="list-disc space-y-1 pl-4 text-xs text-text-secondary">
                {item.deliverables.map((entry) => (
                  <li key={entry}>{entry}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </SectionShell>

      <SectionShell id="terms" eyebrow="terms and conditions" title="important terms">
        <div className="space-y-3">
          {termsItems.map((item) => (
            <article
              key={item.id}
              className={`card-inner p-4 ${
                item.highlighted
                  ? "border-2 border-dashed border-primary/55 shadow-[var(--elev-glow)]"
                  : ""
              }`}
            >
              <h3 className="text-xs font-medium text-text-primary">
                {item.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-text-secondary">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        id="order"
        eyebrow="order form"
        title="send your commission request"
      >
        <ContactForm />
      </SectionShell>
    </div>
  );
}
