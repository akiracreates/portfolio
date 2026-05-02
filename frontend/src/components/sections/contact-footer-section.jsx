import { ContactForm } from "@/components/forms/contact-form";
import { SectionShell } from "@/components/ui/section-shell";
import { socialLinks } from "@/lib/content/socials";

export function ContactFooterSection() {
  return (
    <SectionShell id="contact" eyebrow="contact" title="let's work together">
      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4">
          <p className="section-copy">
            lorem ipsum dolor sit amet, send your order details, timeline idea, and references. all fields are
            mobile-friendly and accessible.
          </p>
          <ul className="space-y-2 text-sm text-text-muted">
            {socialLinks.map((item) => (
              <li key={item.platform}>
                <a href={item.url} className="underline underline-offset-2">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <ContactForm />
      </div>
    </SectionShell>
  );
}
