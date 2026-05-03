import { ContactForm } from "@/components/forms/contact-form";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHeader } from "@/components/layout/page-header";
import { commissionOfferings } from "@/lib/content/commissions";
import { termsItems } from "@/lib/content/terms";

export const metadata = {
  title: "commissions | akira",
  description:
    "commission process, placeholder pricing, terms, and order form.",
};

export default function CommissionsPage() {
  return (
    <>
      <PageHeader
        id="commissions"
        eyebrow="commissions"
        title="bring your idea into a quiet, careful piece."
        description="a small number of commissions are open each season. choose a type below, send your details, and i&apos;ll be in touch within 48 hours."
        action={
          <Button as="link" href="#order" variant="primary" size="md">
            jump to order form
          </Button>
        }
      />

      <Container>
        <Section
          id="offerings"
          eyebrow="offerings"
          title="two starting points."
          description="every commission is unique, but most fit one of these shapes."
        >
          <div className="grid gap-5 md:grid-cols-2">
            {commissionOfferings.map((item) => (
              <article
                key={item.id}
                className="flex flex-col gap-5 rounded-[var(--radius-lg)] border border-border-subtle bg-bg-surface p-6 transition-colors hover:border-border-default md:p-8"
              >
                <div className="space-y-3">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="heading-h3 text-text-primary">{item.title}</h3>
                    <span className="caption">{item.pricePlaceholder}</span>
                  </div>
                  <p className="body-sm">{item.description}</p>
                </div>
                <div className="space-y-3 border-t border-border-subtle pt-4">
                  <p className="caption">included</p>
                  <ul className="space-y-1.5">
                    {item.deliverables.map((d) => (
                      <li
                        key={d}
                        className="flex items-center gap-2 text-[0.8125rem] text-text-secondary"
                      >
                        <span
                          className="h-1 w-1 rounded-full bg-accent-2"
                          aria-hidden
                        />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-auto flex items-center justify-between border-t border-border-subtle pt-4">
                  <span className="caption">
                    timeline: {item.timelinePlaceholder}
                  </span>
                  <Button as="link" href="#order" variant="outline" size="sm">
                    order now
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Section
          id="terms"
          eyebrow="terms"
          title="terms & conditions"
          description="please read these before submitting an order."
          size="md"
        >
          <div className="grid gap-3 md:grid-cols-3">
            {termsItems.map((item) => (
              <article
                key={item.id}
                className={`rounded-[var(--radius-lg)] border bg-bg-surface p-5 ${
                  item.highlighted
                    ? "border-border-accent"
                    : "border-border-subtle"
                }`}
              >
                <h3 className="heading-h3 text-[1rem] text-text-primary">
                  {item.title}
                </h3>
                <p className="body-sm mt-2">{item.body}</p>
              </article>
            ))}
          </div>
        </Section>
      </Container>

      <section
        id="order"
        className="scroll-mt-header border-t border-border-subtle bg-bg-base"
      >
        <Container>
          <Section
            eyebrow="order form"
            title="send your commission request"
            description="all fields marked with * are required. i&apos;ll reply with a timeline and a quote within 48 hours."
            size="md"
          >
            <div className="rounded-[var(--radius-lg)] border border-border-subtle bg-bg-surface p-6 md:p-8">
              <ContactForm />
            </div>
          </Section>
        </Container>
      </section>
    </>
  );
}
