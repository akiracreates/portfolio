import { ContactForm } from "@/components/forms/contact-form";
import { SectionShell } from "@/components/ui/section-shell";
import { socialLinks } from "@/lib/content/socials";

export const metadata = {
  title: "contact | akira",
  description: "contact akira for commissions and collaboration requests.",
};

export default function ContactPage() {
  return (
    <div className="content-column space-y-8 py-10 sm:py-14">
      <SectionShell
        id="contact-page"
        eyebrow="contact"
        title="let's talk about your idea"
        variant="accent"
      >
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="card-inner space-y-5 p-5">
            <p className="text-body text-sm">
              lorem ipsum placeholder contact notes and response expectations.
            </p>
            <div className="divider-subtle" />
            <div className="space-y-2">
              <p className="label-sm">socials</p>
              <ul className="space-y-2 text-sm text-text-secondary">
                {socialLinks.map((item) => (
                  <li key={item.platform}>
                    <a
                      className="inline-flex items-center gap-2 transition-colors hover:text-primary"
                      href={item.url}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/60" aria-hidden />
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
          <ContactForm />
        </div>
      </SectionShell>
    </div>
  );
}
