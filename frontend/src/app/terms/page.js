import { PageNav } from "@/components/layout/page-nav";
import { SiteFrame } from "@/components/layout/site-frame";
import { SectionShell } from "@/components/ui/section-shell";
import { termsItems } from "@/lib/content/terms";

export const metadata = {
  title: "terms | akira",
  description: "commission and usage terms placeholder page for future production policy.",
};

export default function TermsPage() {
  return (
    <SiteFrame>
      <main className="w-full p-3 sm:p-4">
        <PageNav />
        <div className="content-column">
        <SectionShell id="terms-page" eyebrow="terms" title="terms and conditions">
          <div className="space-y-3">
            {termsItems.map((item) => (
              <article key={item.id} className="inner-card p-3">
                <h2 className="text-xs font-medium">{item.title}</h2>
                <p className="mt-2 text-xs text-text-muted">{item.body}</p>
              </article>
            ))}
          </div>
        </SectionShell>
        </div>
      </main>
    </SiteFrame>
  );
}
