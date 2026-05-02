import { ContactForm } from "@/components/forms/contact-form";
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
      <main className="w-full p-4 sm:p-6 lg:p-8">
        <SectionShell id="contact-page" eyebrow="contact" title="let's talk about your idea">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <aside className="card-frame p-4">
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
      </main>
    </SiteFrame>
  );
}
