import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { whatToExpect } from "@/lib/content/commissions";
import { pickLocale } from "@/lib/i18n/config";

const WARM_EXPECTATION_IDS = new Set(["communication", "revisions"]);

export function WhatToExpectSection({ dict, locale = "en" }) {
  const t = dict.whatToExpect;
  const homepageExpectations = whatToExpect.slice(0, 4);

  return (
    <Container>
      <Section
        id="what-to-expect"
        separator
        separatorClassName="section-divider-mini"
        eyebrow={t.eyebrow}
        title={t.title}
        description={t.description}
        action={
          <Button
            as="link"
            href={`/${locale}/commissions`}
            variant="outline"
            size="md"
            className="hidden md:inline-flex"
          >
            {t.cta}
          </Button>
        }
      >
        <ul className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-2">
          {homepageExpectations.map((item) => (
            <li
              key={item.id}
              className={`scrap-note expect-card process-card flex flex-col gap-2 p-4 md:p-5 transition-colors duration-[var(--duration-base)] ${
                WARM_EXPECTATION_IDS.has(item.id) ? "note-surface-warm" : ""
              } ${item.id === "turnaround" ? "expect-card--turnaround expect-card--turnaround-amber" : ""}`.trim()}
            >
              <p
                className={`heading-h3 text-[0.95rem] text-text-primary ${item.id === "turnaround" ? "expect-card-turnaround-title" : ""}`.trim()}
              >
                {pickLocale(item.short, locale)}
              </p>
              <p className="body-sm leading-[1.6] text-text-secondary/95">
                {pickLocale(item.long, locale)}
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-4 md:hidden">
          <Button as="link" href={`/${locale}/commissions`} variant="outline" size="md">
            {t.cta}
          </Button>
        </div>
      </Section>
    </Container>
  );
}
