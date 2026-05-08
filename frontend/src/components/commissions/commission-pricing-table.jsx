import { pickLocale } from "@/lib/i18n/config";

/** Rows that should read as formal / contractual on mobile (no playful accent border). */
const SERIOUS_PRICING_ROW_IDS = new Set(["commercial-use"]);

/** Base commission types are shown in offer cards above; mobile cards list add-ons only. */
const MOBILE_PRICING_SKIP_IDS = new Set(["portraits", "animals"]);

export function CommissionPricingTable({
  locale = "en",
  rows = [],
  headers = null,
}) {
  const mobileRows = rows.filter((row) => !MOBILE_PRICING_SKIP_IDS.has(row.id));

  const cols =
    headers ??
    (locale === "ru"
      ? ["тип коммишена", "базовая цена / диапазон", "что входит", "дополнительно"]
      : ["commission type", "base price / range", "includes", "extra cost notes"]);

  const mobileAria =
    locale === "ru" ? "разбивка цен" : "pricing breakdown";

  return (
    <>
      <ul
        className="space-y-3 md:hidden"
        aria-label={mobileAria}
      >
        {mobileRows.map((row) => {
          const serious = SERIOUS_PRICING_ROW_IDS.has(row.id);
          return (
            <li
              key={row.id}
              className={
                serious
                  ? "rounded-[var(--radius-lg)] border border-dashed border-border-subtle/85 bg-[rgba(52,44,60,0.98)] px-4 py-3.5 shadow-[var(--shadow-scrap)]"
                  : "rounded-[var(--radius-lg)] border border-dashed border-[color:var(--border-accent)]/35 bg-[color:var(--bg-note)] px-4 py-3.5 shadow-[var(--shadow-scrap)]"
              }
            >
              <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1">
                <h3 className="heading-h3 min-w-0 flex-1 text-[1.05rem] leading-snug text-text-primary">
                  {pickLocale(row.type, locale)}
                </h3>
                <p className="shrink-0 text-right text-[0.95rem] font-semibold leading-snug text-highlight">
                  {pickLocale(row.price, locale)}
                </p>
              </div>
              <p className="body-sm mt-2.5 leading-relaxed text-text-secondary">
                {pickLocale(row.includes, locale)}
              </p>
              <p className="caption mt-2 leading-snug text-text-tertiary">
                {pickLocale(row.extraNotes, locale)}
              </p>
            </li>
          );
        })}
      </ul>

      <div className="hidden md:block scrap-card overflow-hidden border-[color:var(--border-accent)]/35 bg-[color:var(--bg-note)]">
        <div className="overflow-x-auto overscroll-x-contain [scrollbar-gutter:stable]">
          <table className="w-full min-w-[680px] border-collapse text-left sm:min-w-[720px]">
            <thead className="bg-highlight-soft/60">
              <tr>
                {cols.map((label) => (
                  <th
                    key={label}
                    className="border-b border-dashed border-border-default px-4 py-3 text-[0.75rem] font-semibold text-text-primary first:border-r first:border-dashed first:border-border-subtle [&:not(:last-child)]:border-r [&:not(:last-child)]:border-dashed [&:not(:last-child)]:border-border-subtle"
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="align-top">
                  <td className="border-r border-b border-dashed border-border-subtle px-4 py-3 text-sm font-medium text-text-primary">
                    {pickLocale(row.type, locale)}
                  </td>
                  <td className="border-r border-b border-dashed border-border-subtle px-4 py-3 text-sm font-semibold text-highlight">
                    {pickLocale(row.price, locale)}
                  </td>
                  <td className="border-r border-b border-dashed border-border-subtle px-4 py-3 text-sm text-text-secondary">
                    {pickLocale(row.includes, locale)}
                  </td>
                  <td className="border-b border-dashed border-border-subtle px-4 py-3 text-sm text-text-secondary">
                    {pickLocale(row.extraNotes, locale)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
