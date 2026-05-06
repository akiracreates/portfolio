import { CommissionPreviewCarousel } from "@/components/commissions/commission-preview-carousel";
import { getCommissionPreviews } from "@/lib/content/commissions";
import { pickLocale } from "@/lib/i18n/config";

export function CommissionOfferCards({ locale = "en", cards = [] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {cards.map((card) => (
        <article
          key={card.id}
          className="scrap-card soft-glow-hover flex flex-col overflow-hidden border-[color:var(--border-accent)]/35 bg-[color:var(--bg-note)] transition-colors hover:border-border-accent"
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
              <p className="text-sm font-semibold text-highlight">
                {pickLocale(card.startingPriceText, locale)}
              </p>
            </div>
            <div>
              <h3 className="heading-h3 text-text-primary">
                {pickLocale(card.title, locale)}
              </h3>
              <p className="body-sm mt-2">{pickLocale(card.description, locale)}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
