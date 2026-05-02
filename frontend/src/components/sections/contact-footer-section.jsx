import { ContactForm } from "@/components/forms/contact-form";
import { SectionShell } from "@/components/ui/section-shell";
import { socialLinks } from "@/lib/content/socials";

export function ContactFooterSection() {
  return (
    <SectionShell id="contact" eyebrow="contact" title="let's work together">
      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="inner-card space-y-4 p-3">
          <p className="section-copy text-sm">
            lorem ipsum dolor sit amet, send your order details, timeline idea, and references. all fields are
            mobile-friendly and accessible.
          </p>
          <ul className="space-y-1.5 text-xs text-text-muted">
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
