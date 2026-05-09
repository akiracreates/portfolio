import { SectionDividerBleed } from "@/components/ui/divider";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";

const sizes = {
  sm: "py-9 md:py-14",
  md: "py-11 md:py-20",
  lg: "py-13 md:py-24",
};

export function Section({
  id,
  eyebrow,
  title,
  description,
  action,
  children,
  size = "lg",
  headingLevel = "h2",
  className = "",
  align = "left",
  separator = false,
  separatorClassName = "",
}) {
  const headingId = id ? `${id}-heading` : undefined;

  return (
    <>
      {separator ? (
        <SectionDividerBleed
          className={`section-divider-contained ${separatorClassName}`.trim()}
        />
      ) : null}
      <section
        id={id}
        className={`section-scrap section-motion scroll-mt-header ${sizes[size] ?? sizes.lg} ${className}`.trim()}
        aria-labelledby={headingId}
      >
        {(eyebrow || title || action) && (
          <header
            className={`mb-6 flex flex-col gap-4 md:mb-8 sm:flex-row sm:items-end sm:justify-between ${
              align === "center" ? "sm:items-center sm:text-center" : ""
            }`}
          >
            <div className="space-y-3">
              {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
              {title && (
                <Heading level={headingLevel} id={headingId} className="max-w-2xl">
                  {title}
                </Heading>
              )}
              {description && (
                <p className="body max-w-2xl">{description}</p>
              )}
            </div>
            {action && <div className="shrink-0">{action}</div>}
          </header>
        )}
        {children}
      </section>
    </>
  );
}
