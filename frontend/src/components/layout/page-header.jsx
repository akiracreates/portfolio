import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";

export function PageHeader({ eyebrow, title, description, action, id }) {
  const headingId = id ? `${id}-heading` : undefined;
  return (
    <header className="border-b border-border-subtle">
      <Container className="pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="space-y-4 max-w-3xl">
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
