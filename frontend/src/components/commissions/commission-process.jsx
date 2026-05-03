import { commissionProcess } from "@/lib/content/commissions";
import { pickLocale } from "@/lib/i18n/config";

export function CommissionProcess({ locale = "en" }) {
  return (
    <ol className="space-y-6">
      {commissionProcess.map((step, idx) => {
        const isLast = idx === commissionProcess.length - 1;
        return (
          <li key={step.step} className="flex gap-5">
            <div className="flex shrink-0 flex-col items-center">
              <span
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border-strong bg-bg-surface text-[0.8125rem] font-semibold text-text-primary"
                aria-hidden
              >
                {step.step}
              </span>
              {!isLast && (
                <span
                  className="mt-2 w-px flex-1 bg-border-subtle"
                  aria-hidden
                />
              )}
            </div>
            <div className="flex-1 pb-4">
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
