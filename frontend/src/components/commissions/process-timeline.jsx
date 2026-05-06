import { pickLocale } from "@/lib/i18n/config";

export function ProcessTimeline({ locale = "en", steps = [] }) {
  return (
    <div className="relative">
      <span
        className="absolute bottom-5 left-[1.25rem] top-5 z-0 w-px bg-[repeating-linear-gradient(180deg,rgba(233,102,160,0.65)_0_10px,transparent_10px_16px,rgba(149,117,222,0.55)_16px_24px,transparent_24px_30px)] shadow-[0_0_18px_rgba(149,117,222,0.18)] md:left-[1.375rem]"
        aria-hidden
      />
      <ol className="space-y-4 md:space-y-5">
        {steps.map((step) => (
          <li
            key={step.step}
            className="relative z-[1] grid grid-cols-[2.5rem_minmax(0,1fr)] items-start gap-3 md:grid-cols-[2.75rem_minmax(0,1fr)] md:gap-5"
          >
            <div className="relative flex min-h-full justify-center pt-4">
              <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border border-dashed border-border-accent bg-[color:var(--bg-note)] text-xs font-semibold text-highlight shadow-[0_0_0_4px_rgba(49,42,56,0.98),0_0_0_5px_rgba(233,102,160,0.14),0_0_22px_rgba(149,117,222,0.26)]">
                {step.step}
              </span>
            </div>
            <article className="scrap-note border-[color:var(--border-accent)]/28 bg-[color:var(--bg-note)] p-4 md:p-5">
              <h3 className="heading-h3 text-[1rem] text-text-primary">
                {pickLocale(step.title, locale)}
              </h3>
              <p className="body-sm mt-2">{pickLocale(step.body, locale)}</p>
            </article>
          </li>
        ))}
      </ol>
    </div>
  );
}
