import { commissionProcess } from "@/lib/content/commissions";
import { pickLocale } from "@/lib/i18n/config";

export function CommissionProcess({ locale = "en" }) {
  return (
    <ol className="grid gap-4 md:grid-cols-2">
      {commissionProcess.map((step, idx) => {
        return (
          <li key={step.step} className="scrap-note flex gap-4 p-5">
            <div className="flex shrink-0 flex-col items-center">
              <span
                className="flex h-9 w-9 items-center justify-center rounded-full border border-dashed border-highlight bg-highlight-soft text-[0.8125rem] font-semibold text-highlight"
                aria-hidden
              >
                {step.step}
              </span>
            </div>
            <div className="flex-1">
              <p className="heading-h3 text-[0.95rem] text-text-primary">
                {pickLocale(step.title, locale)}
              </p>
              <p className="body-sm mt-1.5">{pickLocale(step.body, locale)}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
