import { pickLocale } from "@/lib/i18n/config";

export function TermsPanels({ locale = "en", data }) {
  if (!data) return null;
  return (
    <div className="scrap-card relative overflow-visible border-[1px] border-dashed border-border-accent/70 bg-[linear-gradient(180deg,rgba(244,241,248,0.02),transparent_32%),rgba(55,47,64,0.98)] p-4 pt-9 max-md:p-4 max-md:pt-8 md:p-6 md:pt-10">
      <div className="absolute left-5 top-5 z-20 max-md:left-4 max-md:top-4">
        <span className="caption inline-flex rounded-full border border-dashed border-border-purple/80 bg-[rgba(101,84,175,0.14)] px-2.5 py-0.5 text-[0.68rem] text-text-secondary shadow-[0_6px_14px_rgba(10,8,14,0.14)]">
          {pickLocale(data.label, locale)}
        </span>
      </div>
      <div className="relative">
        <div className="grid gap-3 max-md:gap-5 md:grid-cols-2">
          {data.groups.map((group) => (
            <article
              key={group.id}
              className="scrap-note relative min-h-full border-[color:var(--border-accent)]/28 max-md:border-[color:var(--border-accent)]/22 bg-[linear-gradient(180deg,rgba(233,102,160,0.03),transparent_58%),rgba(59,49,68,0.96)] max-md:bg-[color:var(--bg-note)] p-4 max-md:p-5 md:p-5"
            >
              <div className="mb-3 max-md:mb-3.5">
                <span className="text-[1.5rem] font-semibold tracking-[0.01em] text-text-primary max-md:block max-md:text-[1.28rem]">
                  {pickLocale(group.title, locale)}
                </span>
              </div>
              <ul className="space-y-2 max-md:space-y-2.5">
                {group.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex gap-2 text-[0.82rem] leading-5 max-md:text-[0.84rem] max-md:leading-[1.55] text-text-secondary"
                  >
                    <span className="mt-[0.58rem] h-1 w-1 shrink-0 rounded-full bg-highlight" aria-hidden />
                    <span>{pickLocale(item, locale)}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
      <div className="mt-4 max-md:mt-5 rounded-[var(--radius-md)] border border-dashed border-border-default/85 bg-[rgba(29,23,35,0.96)] px-4 py-2 max-md:px-4 max-md:py-3 text-center text-[0.8rem] max-md:text-[0.8125rem] max-md:leading-snug text-text-primary shadow-[0_8px_18px_rgba(10,8,14,0.16)]">
        {pickLocale(data.agreement, locale)}
      </div>
    </div>
  );
}
