import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { whatToExpect } from "@/lib/content/commissions";
import { pickLocale } from "@/lib/i18n/config";

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
          >
            {t.cta}
          </Button>
        }
      >
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
          {homepageExpectations.map((item) => (
            <li
              key={item.id}
              className="scrap-note expect-card process-card soft-glow-hover flex flex-col gap-2 p-5 transition-colors duration-[var(--duration-base)] hover:border-border-accent"
            >
              <p className="heading-h3 text-[0.95rem] text-text-primary">
                {pickLocale(item.short, locale)}
              </p>
              <p className="body-sm">{pickLocale(item.long, locale)}</p>
            </li>
          ))}
        </ul>
      </Section>
    </Container>
  );
}
