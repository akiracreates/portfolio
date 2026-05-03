import { ContactForm } from "@/components/forms/contact-form";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { socialLinks } from "@/lib/content/socials";
import { NavIcon } from "@/components/layout/nav-icons";

export function ContactFooterSection() {
  return (
    <section
      id="contact"
      className="scroll-mt-header border-t border-border-subtle bg-bg-base"
      aria-labelledby="contact-heading"
    >
      <Container className="py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="space-y-7 lg:col-span-5">
            <Eyebrow>contact</Eyebrow>
            <Heading level="h1" id="contact-heading">
              let&apos;s start something quiet.
            </Heading>
            <p className="body">
              send your idea, references, and timeline. i read every message
              personally and reply within 48 hours.
            </p>

            <div className="mt-2 space-y-3">
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
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-[var(--radius-lg)] border border-border-subtle bg-bg-surface p-6 md:p-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
