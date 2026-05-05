import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";

export function PageHeader({ eyebrow, title, description, action, id }) {
  const headingId = id ? `${id}-heading` : undefined;
  return (
    <header className="section-scrap border-b border-dashed border-border-subtle">
      <Container className="pt-14 pb-10 md:pt-20 md:pb-14">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="scrap-note corner-marks max-w-3xl space-y-4 p-5 md:p-7">
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
    </header>
  );
}
