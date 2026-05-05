import { termsGroups } from "@/lib/content/terms";
import { pickLocale } from "@/lib/i18n/config";

/**
 * Renders all term groups as native <details> elements (works without JS,
 * accessible by default). Each group has a 4px left bar in the accent color
 * to echo the spec's "subtly highlighted" treatment.
 */
export function TermsSection({ locale = "en", calloutText }) {
  return (
    <div className="space-y-4">
      {calloutText && (
        <div className="rounded-[var(--radius-md)] border border-border-accent bg-accent-soft px-4 py-3">
          <p className="body-sm text-text-primary">{calloutText}</p>
        </div>
      )}
      <ul className="space-y-3">
        {termsGroups.map((group) => (
          <li key={group.id}>
            <details className="group rounded-[var(--radius-lg)] border border-border-subtle bg-bg-surface transition-colors hover:border-border-default">
              <summary className="flex cursor-pointer items-center justify-between gap-3 border-l-[3px] border-accent px-5 py-4 text-text-primary [&::-webkit-details-marker]:hidden">
                <span className="heading-h3 text-[0.95rem]">
                  {pickLocale(group.heading, locale)}
                </span>
                <span
                  className="text-text-tertiary transition-transform duration-[var(--duration-base)] group-open:rotate-180"
                  aria-hidden
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </span>
              </summary>
              <div className="border-t border-border-subtle px-5 py-4">
                <ul className="space-y-2">
                  {group.items.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-[0.875rem] text-text-secondary"
                    >
                      <span
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-2"
                        aria-hidden
                      />
                      <span>{pickLocale(item, locale)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
}
