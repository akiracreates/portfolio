import { CommissionPreviewCarousel } from "@/components/commissions/commission-preview-carousel";
import { getCommissionPreviews } from "@/lib/content/commissions";
import { pickLocale } from "@/lib/i18n/config";

const WARM_OFFER_IDS = new Set(["portrait", "animal"]);

export function CommissionOfferCards({ locale = "en", cards = [] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {cards.map((card) => (
        <article
          key={card.id}
          className={`scrap-card soft-glow-hover flex flex-col overflow-hidden border-[color:var(--border-accent)]/35 bg-[color:var(--bg-note)] transition-colors hover:border-border-accent ${
            WARM_OFFER_IDS.has(card.id) ? "card-surface-warm" : ""
          }`}
        >
          <CommissionPreviewCarousel
            images={getCommissionPreviews(card.id)}
            locale={locale}
            randomizeInitial
          />
          <div className="flex flex-1 flex-col gap-4 p-5 md:p-6">
            <div className="flex items-center justify-between gap-3">
              <span className="caption rounded-full border border-dashed border-border-purple bg-accent-soft px-2.5 py-1 text-accent-2">
                {pickLocale(card.tabLabel, locale)}
              </span>
              <p
                className={`text-sm font-semibold text-highlight ${
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
              <p className="body-sm mt-2">{pickLocale(card.description, locale)}</p>
              <ul className="mt-3 grid gap-2">
                {pickLocale(card.supportPoints, locale)?.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2 rounded-[var(--radius-md)] border border-dashed border-border-subtle bg-highlight-soft/10 px-3 py-2 text-[0.78rem] leading-snug text-text-secondary"
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
