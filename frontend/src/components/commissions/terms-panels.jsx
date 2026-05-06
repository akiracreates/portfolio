import { pickLocale } from "@/lib/i18n/config";

export function TermsPanels({ locale = "en", data }) {
  if (!data) return null;
  return (
    <div className="scrap-card border-[1.5px] border-dashed border-border-accent bg-[color:var(--bg-note)] p-4 md:p-6">
      <div className="mb-4">
        <span className="caption inline-flex rounded-full border border-dashed border-border-purple bg-accent-soft px-2.5 py-1 text-accent-2">
          {pickLocale(data.label, locale)}
        </span>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {data.groups.map((group) => (
          <article
            key={group.id}
            className="scrap-note border-[color:var(--border-accent)]/35 bg-[color:var(--bg-surface)] p-5"
          >
            <h3 className="heading-h3 text-text-primary">
              {pickLocale(group.title, locale)}
            </h3>
            <ul className="mt-3 space-y-2">
              {group.items.map((item, idx) => (
                <li key={idx} className="flex gap-2 text-sm text-text-secondary">
                  <span className="mt-2 h-1 w-1 rounded-full bg-highlight" aria-hidden />
                  <span>{pickLocale(item, locale)}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <div className="mt-4 rounded-[var(--radius-md)] border border-dashed border-border-default bg-bg-inset px-4 py-2.5 text-sm text-text-primary">
        {pickLocale(data.agreement, locale)}
      </div>
    </div>
  );
}
