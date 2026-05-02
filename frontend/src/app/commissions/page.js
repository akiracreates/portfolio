import { ContactForm } from "@/components/forms/contact-form";
import { PageNav } from "@/components/layout/page-nav";
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
      <main className="w-full space-y-4 p-3 sm:p-4">
        <PageNav />
        <div className="content-column space-y-4">
        <SectionShell id="commissions-page" eyebrow="commissions" title="work with me">
          <div className="grid gap-3 md:grid-cols-2">
            {commissionOfferings.map((item) => (
              <article key={item.id} className="inner-card space-y-2 p-3">
                <h3 className="text-sm font-medium">{item.title}</h3>
                <p className="text-xs text-text-muted">{item.description}</p>
                <p className="text-[0.7rem] text-text-dim">pricing: {item.pricePlaceholder}</p>
                <ul className="list-disc space-y-1 pl-4 text-[0.7rem] text-text-muted">
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
                className={`inner-card p-3 ${item.highlighted ? "border-[#f2c19b] ring-1 ring-[#f2c19b]/40" : ""}`}
              >
                <h3 className="text-xs font-medium text-text-primary">{item.title}</h3>
                <p className="mt-1 text-xs text-text-muted">{item.body}</p>
              </article>
            ))}
          </div>
        </SectionShell>

        <SectionShell id="order" eyebrow="order form" title="send your commission request">
          <ContactForm />
        </SectionShell>
        </div>
      </main>
    </SiteFrame>
  );
}
