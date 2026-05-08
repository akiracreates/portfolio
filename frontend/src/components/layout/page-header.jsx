import { Container } from "@/components/ui/container";
import { SectionDividerBleed } from "@/components/ui/divider";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
  id,
  tone = "default",
}) {
  const headingId = id ? `${id}-heading` : undefined;
  const warmClass = tone === "warm" ? "note-surface-warm" : "";
  return (
    <header className="section-scrap">
      <Container className="pt-14 pb-10 md:pt-20 md:pb-14">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className={`scrap-note corner-marks max-w-3xl space-y-4 p-5 md:p-7 ${warmClass}`}>
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            <Heading level="h1" id={headingId}>
              {title}
            </Heading>
            {description && (
              <p className="body-lg max-w-2xl">{description}</p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      </Container>
      <SectionDividerBleed />
    </header>
  );
}
