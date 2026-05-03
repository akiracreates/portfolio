import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { termsItems } from "@/lib/content/terms";

export function TermsHighlightSection() {
  const highlight =
    termsItems.find((t) => t.highlighted) ?? termsItems[0];

  if (!highlight) return null;

  return (
    <section
      id="terms-highlight"
      className="scroll-mt-header"
      aria-labelledby="terms-highlight-heading"
    >
      <Container className="py-12 md:py-16">
        <div className="relative flex flex-col gap-4 overflow-hidden rounded-[var(--radius-lg)] border border-border-subtle bg-bg-surface p-6 md:flex-row md:items-center md:justify-between md:gap-8 md:p-8">
          <div
            className="absolute inset-y-0 left-0 w-[4px] bg-accent"
            aria-hidden
          />
          <div className="space-y-2 pl-3 md:pl-4">
            <Eyebrow>before you order</Eyebrow>
            <h2
              id="terms-highlight-heading"
              className="heading-h3 text-text-primary"
            >
              {highlight.title}
            </h2>
            <p className="body-sm max-w-xl">{highlight.body}</p>
          </div>
          <Link
            href="/terms"
            className="ml-3 inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-accent-2 transition-colors hover:text-text-primary md:ml-0"
          >
            read full terms
            <span aria-hidden>→</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
