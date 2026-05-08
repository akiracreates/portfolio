import { pickLocale } from "@/lib/i18n/config";

export function ExpectationsSection({ locale = "en", items = [] }) {
  return (
    <div className="grid gap-4 max-md:gap-5 md:grid-cols-2">
      {items.map((item) => (
        <article
          key={item.id}
          className="scrap-note border-[color:var(--border-accent)]/28 max-md:border-[color:var(--border-accent)]/22 bg-[color:var(--bg-note)] p-5 md:p-6 max-md:px-5 max-md:py-5"
        >
          <p className="caption text-accent-2">{pickLocale(item.label, locale)}</p>
          <h3 className="heading-h3 mt-2 text-text-primary">
            {pickLocale(item.title, locale)}
          </h3>
          <p className="body-sm mt-3 max-md:mt-3.5 whitespace-pre-line max-md:leading-[1.65]">
            {pickLocale(item.copy, locale)}
          </p>
        </article>
      ))}
    </div>
  );
}
