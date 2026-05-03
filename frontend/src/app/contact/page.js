import { ContactForm } from "@/components/forms/contact-form";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { PageHeader } from "@/components/layout/page-header";
import { socialLinks } from "@/lib/content/socials";
import { NavIcon } from "@/components/layout/nav-icons";

export const metadata = {
  title: "contact | akira",
  description: "contact akira for commissions and collaboration requests.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        id="contact"
        eyebrow="contact"
        title="let's talk about your idea."
        description="for commissions, collaborations, or quiet hellos."
      />

      <Container className="py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <aside className="space-y-8 lg:col-span-4">
            <div className="space-y-3">
              <Eyebrow>response time</Eyebrow>
              <Heading level="h3">within 48 hours, on most days.</Heading>
              <p className="body-sm">
                i read every message personally. for time-sensitive requests,
                please mention your deadline.
              </p>
            </div>

            <div className="space-y-3">
              <p className="caption">find me</p>
              <ul className="space-y-2">
                {socialLinks.map((s) => (
                  <li key={s.platform}>
                    <a
                      href={s.url}
                      target={
                        s.platform === "email" ? undefined : "_blank"
                      }
                      rel={
                        s.platform === "email"
                          ? undefined
                          : "noreferrer noopener"
                      }
                      className="group inline-flex items-center gap-3 text-sm text-text-secondary transition-colors hover:text-text-primary"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-md border border-border-subtle bg-bg-surface text-text-tertiary transition-colors group-hover:border-border-default group-hover:text-text-primary">
                        <NavIcon id={s.platform} />
                      </span>
                      <span>{s.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="lg:col-span-8">
            <div className="rounded-[var(--radius-lg)] border border-border-subtle bg-bg-surface p-6 md:p-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
