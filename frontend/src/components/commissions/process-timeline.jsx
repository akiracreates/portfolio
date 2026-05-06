import { pickLocale } from "@/lib/i18n/config";

export function ProcessTimeline({ locale = "en", steps = [] }) {
  return (
    <div className="relative ml-1 pl-8">
      <span
        className="absolute bottom-4 left-[13px] top-4 w-px bg-[repeating-linear-gradient(180deg,rgba(233,102,160,0.65)_0_10px,transparent_10px_16px,rgba(149,117,222,0.55)_16px_24px,transparent_24px_30px)]"
        aria-hidden
      />
      <ol className="space-y-4 md:space-y-5">
        {steps.map((step, idx) => (
          <li
            key={step.step}
            className={`relative ${idx % 2 === 1 ? "md:ml-8 lg:ml-14" : ""}`}
          >
            <span className="absolute -left-8 top-5 flex h-7 w-7 items-center justify-center rounded-full border border-dashed border-border-accent bg-highlight-soft text-xs font-semibold text-highlight shadow-[0_0_0_3px_rgba(233,102,160,0.13),0_0_22px_rgba(149,117,222,0.26)]">
              {step.step}
            </span>
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
