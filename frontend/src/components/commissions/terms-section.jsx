import { termsGroups } from "@/lib/content/terms";
import { pickLocale } from "@/lib/i18n/config";

export function TermsSection({ locale = "en", calloutText }) {
  return (
    <div className="space-y-4">
      {calloutText && (
        <div className="scrap-note border-border-accent bg-accent-soft px-4 py-3">
          <p className="body-sm text-text-primary">{calloutText}</p>
        </div>
      )}
      <ul className="grid gap-3 md:grid-cols-2">
        {termsGroups.map((group) => (
          <li key={group.id}>
            <article className="scrap-card h-full p-5">
              <header className="mb-3 border-b border-dashed border-border-subtle pb-3">
                <h3 className="heading-h3 text-[0.95rem] text-text-primary">
                  {pickLocale(group.heading, locale)}
                </h3>
              </header>
              <ul className="space-y-2">
                {group.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-[0.875rem] text-text-secondary"
                  >
                    <span
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-highlight"
                      aria-hidden
                    />
                    <span>{pickLocale(item, locale)}</span>
                  </li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
