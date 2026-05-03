import { ContactForm } from "@/components/forms/contact-form";
import { SectionShell } from "@/components/ui/section-shell";
import { socialLinks } from "@/lib/content/socials";

export function ContactFooterSection() {
  return (
    <>
      <SectionShell id="contact" eyebrow="contact" title="let's work together">
        <div className="flex flex-col gap-8">
          <div className="card-inner space-y-5 p-5">
            <p className="text-body text-sm">
              lorem ipsum dolor sit amet, send your order details, timeline idea,
              and references. all fields are mobile-friendly and accessible.
            </p>
            <div className="divider-subtle" />
            <div className="space-y-2">
              <p className="label-sm">find me</p>
              <ul className="space-y-2 text-sm text-text-secondary">
                {socialLinks.map((item) => (
                  <li key={item.platform}>
                    <a
                      href={item.url}
                      className="inline-flex items-center gap-2 transition-colors duration-[var(--duration-fast)] hover:text-primary"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/60" aria-hidden />
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <ContactForm />
        </div>
      </SectionShell>

      <footer className="py-8 text-center">
        <div className="mx-auto mb-6 max-w-xs border-b border-dashed border-primary/30" />
        <p className="text-xs text-text-tertiary">
          &copy; {new Date().getFullYear()} akira. all rights reserved.
        </p>
      </footer>
    </>
  );
}
