import { commissionTypes } from "@/lib/content/commissions";
import { formatPrice, pickLocale } from "@/lib/i18n/config";

export function PriceTable({
  locale = "en",
  typeLabel = "type",
  startingLabel = "starting at",
  includedLabel = "included",
  note,
}) {
  return (
    <div className="overflow-hidden rounded-[var(--radius-lg)] border border-border-subtle bg-bg-surface">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-border-subtle bg-bg-inset/40">
          <tr>
            <th className="px-5 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-text-tertiary">
              {typeLabel}
            </th>
            <th className="px-5 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-text-tertiary">
              {startingLabel}
            </th>
            <th className="hidden px-5 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-text-tertiary sm:table-cell">
              {includedLabel}
            </th>
          </tr>
        </thead>
        <tbody>
          {commissionTypes.map((c, i) => (
            <tr
              key={c.id}
              className={i > 0 ? "border-t border-border-subtle" : ""}
            >
              <td className="px-5 py-4 align-top">
                <p className="body-sm font-medium text-text-primary">
                  {pickLocale(c.title, locale)}
                </p>
                <p className="caption mt-1">{pickLocale(c.description, locale)}</p>
              </td>
              <td className="px-5 py-4 align-top">
                <p className="body-sm font-semibold text-highlight">
                  {formatPrice(c.price, locale)}
                </p>
              </td>
              <td className="hidden px-5 py-4 align-top sm:table-cell">
                <ul className="space-y-1">
                  {pickLocale(c.included, locale).map((line) => (
                    <li
                      key={line}
                      className="flex items-center gap-2 text-[0.8125rem] text-text-secondary"
                    >
                      <span
                        className="h-1 w-1 rounded-full bg-accent-2"
                        aria-hidden
                      />
                      {line}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {note && (
        <div className="border-t border-border-subtle bg-bg-inset/30 px-5 py-3">
          <p className="caption">{note}</p>
        </div>
      )}
    </div>
  );
}
