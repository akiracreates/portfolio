import { ContactForm } from "@/components/forms/contact-form";
import { PageNav } from "@/components/layout/page-nav";
import { SiteFrame } from "@/components/layout/site-frame";
import { SectionShell } from "@/components/ui/section-shell";
import { socialLinks } from "@/lib/content/socials";

export const metadata = {
  title: "contact | akira",
  description: "contact akira for commissions and collaboration requests.",
};

export default function ContactPage() {
  return (
    <SiteFrame>
      <main className="w-full p-3 sm:p-4">
        <PageNav />
        <div className="content-column">
        <SectionShell id="contact-page" eyebrow="contact" title="let's talk about your idea">
          <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <aside className="inner-card p-3">
              <p className="mb-4 text-sm text-text-muted">lorem ipsum placeholder contact notes and response expectations.</p>
              <ul className="space-y-2 text-xs text-text-muted">
                {socialLinks.map((item) => (
                  <li key={item.platform}>
                    <a className="underline underline-offset-2" href={item.url}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
            <ContactForm />
          </div>
        </SectionShell>
        </div>
      </main>
    </SiteFrame>
  );
}
