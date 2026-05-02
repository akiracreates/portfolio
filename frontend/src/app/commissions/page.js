import { ContactForm } from "@/components/forms/contact-form";
import { SiteFrame } from "@/components/layout/site-frame";
import { SectionShell } from "@/components/ui/section-shell";
import { commissionOfferings } from "@/lib/content/commissions";
import { termsItems } from "@/lib/content/terms";

export const metadata = {
  title: "commissions | akira",
  description: "commission process, placeholder pricing, terms, and order form.",
};

export default function CommissionsPage() {
  return (
    <SiteFrame>
      <main className="w-full space-y-5 p-4 sm:p-6 lg:p-8">
        <SectionShell id="commissions-page" eyebrow="commissions" title="work with me">
          <div className="grid gap-4 md:grid-cols-2">
            {commissionOfferings.map((item) => (
              <article key={item.id} className="card-frame space-y-2 p-4">
                <h3 className="text-base font-medium">{item.title}</h3>
                <p className="text-sm text-text-muted">{item.description}</p>
                <p className="text-xs text-text-dim">pricing: {item.pricePlaceholder}</p>
                <ul className="list-disc space-y-1 pl-4 text-xs text-text-muted">
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
                className={`card-frame p-4 ${item.highlighted ? "border-accent-peach/60 ring-1 ring-accent-peach/30" : ""}`}
              >
                <h3 className="text-sm font-medium text-text-primary">{item.title}</h3>
                <p className="mt-2 text-sm text-text-muted">{item.body}</p>
              </article>
            ))}
          </div>
        </SectionShell>

        <SectionShell id="order" eyebrow="order form" title="send your commission request">
          <ContactForm />
        </SectionShell>
      </main>
    </SiteFrame>
  );
}
