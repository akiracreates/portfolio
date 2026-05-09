import { CommissionPreviewCarousel } from "@/components/commissions/commission-preview-carousel";
import { getCommissionPreviews } from "@/lib/content/commissions";
import { pickLocale } from "@/lib/i18n/config";

const WARM_OFFER_IDS = new Set(["portrait", "animal"]);

export function CommissionOfferCards({ locale = "en", cards = [] }) {
  return (
    <div className="grid gap-5 max-md:gap-6 md:grid-cols-2">
      {cards.map((card) => (
        <article
          key={card.id}
          className={`scrap-card soft-glow-hover flex flex-col overflow-hidden border-[color:var(--border-accent)]/35 max-md:border-[color:var(--border-accent)]/28 bg-[color:var(--bg-note)] transition-colors hover:border-border-accent ${
            WARM_OFFER_IDS.has(card.id) ? "card-surface-warm" : ""
          }`}
        >
          <CommissionPreviewCarousel
            images={getCommissionPreviews(card.id)}
            locale={locale}
            randomizeInitial
          />
          <div className="flex flex-1 flex-col gap-4 max-md:gap-3.5 p-5 md:p-6">
            <div className="flex items-center justify-between gap-3 max-md:gap-2">
              <span className="caption rounded-full border border-dashed border-border-purple bg-accent-soft px-2.5 py-1 text-accent-2">
                {pickLocale(card.tabLabel, locale)}
              </span>
              <p
                className={`text-sm font-semibold tabular-nums text-highlight max-md:text-[0.9375rem] ${
                  WARM_OFFER_IDS.has(card.id) ? "deco-warm-pin" : ""
                }`}
              >
                {pickLocale(card.startingPriceText, locale)}
              </p>
            </div>
            <div>
              <h3 className="heading-h3 text-text-primary">
                {pickLocale(card.title, locale)}
              </h3>
              <p className="body-sm mt-2 max-md:mt-2.5 max-md:leading-relaxed">
                {pickLocale(card.description, locale)}
              </p>
              <ul className="mt-3 max-md:mt-3.5 grid gap-2 max-md:gap-2.5">
                {pickLocale(card.supportPoints, locale)?.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2 rounded-[var(--radius-md)] border border-dashed border-border-subtle/80 max-md:border-border-subtle/65 bg-highlight-soft/10 max-md:bg-highlight-soft/[0.07] px-3 py-2 max-md:px-3 max-md:py-2.5 text-[0.78rem] max-md:text-[0.8rem] leading-snug max-md:leading-relaxed text-text-secondary"
                  >
                    <span
                      className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-highlight/90"
                      aria-hidden
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
