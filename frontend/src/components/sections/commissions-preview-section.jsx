import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { commissionOfferings } from "@/lib/content/commissions";

export function CommissionsPreviewSection() {
  return (
    <section
      id="commissions"
      className="scroll-mt-header border-t border-border-subtle bg-bg-base"
      aria-labelledby="commissions-heading"
    >
      <Container>
        <Section
          eyebrow="work with me"
          title="commission openings are available"
          description="a few slots each season for considered, story-driven portraits and pieces."
          headingLevel="h2"
          action={
            <Button as="link" href="/commissions" variant="primary" size="md">
              start a commission
            </Button>
          }
        >
          <div className="grid gap-5 sm:grid-cols-2">
            {commissionOfferings.map((item) => (
              <article
                key={item.id}
                className="group flex flex-col gap-4 rounded-[var(--radius-lg)] border border-border-subtle bg-bg-surface p-6 transition-colors duration-[var(--duration-base)] hover:border-border-default hover:bg-bg-surface-raised"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="heading-h3 text-text-primary">{item.title}</h3>
                  <span className="caption">{item.pricePlaceholder}</span>
                </div>
                <p className="body-sm">{item.description}</p>
                <ul className="mt-2 space-y-1.5 border-t border-border-subtle pt-4">
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
                <div className="mt-auto pt-2">
                  <span className="caption">
                    timeline: {item.timelinePlaceholder}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </Section>
      </Container>
    </section>
  );
}
