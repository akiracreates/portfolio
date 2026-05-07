import { pickLocale } from "@/lib/i18n/config";

export function CommissionPricingTable({
  locale = "en",
  rows = [],
  headers = null,
}) {
  const cols =
    headers ??
    (locale === "ru"
      ? ["тип коммишена", "базовая цена / диапазон", "что входит", "дополнительно"]
      : ["commission type", "base price / range", "includes", "extra cost notes"]);

  return (
    <div className="scrap-card overflow-hidden border-[color:var(--border-accent)]/35 bg-[color:var(--bg-note)]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left">
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
  );
}
