/**
 * Spin wheel rewards. Each reward is locale-aware. Some rewards may target a
 * specific audience (e.g. ruble-only); the wheel filters by `audience` against
 * the current locale before spinning.
 */
export const spinRewards = [
  {
    id: "discount-10",
    type: "percent",
    value: 10,
    color: "#9575DE",
    label: { en: "10% off your next commission", ru: "10% скидка на следующий заказ" },
    short: { en: "10% off",                       ru: "10% скидка" },
  },
  {
    id: "discount-15",
    type: "percent",
    value: 15,
    color: "#E966A0",
    label: { en: "15% off your next commission", ru: "15% скидка на следующий заказ" },
    short: { en: "15% off",                       ru: "15% скидка" },
  },
  {
    id: "free-sketch",
    type: "freebie",
    color: "#6554AF",
    label: { en: "free bonus sketch with your commission", ru: "бесплатный бонусный набросок с заказом" },
    short: { en: "free sketch",                            ru: "бесплатный скетч" },
  },
  {
    id: "rub-1000-off",
    type: "rub-amount",
    value: 1000,
    color: "#6BCB99",
    audience: "ru",
    label: { en: "₽1000 off your next commission", ru: "1000 ₽ скидка на следующий заказ" },
    short: { en: "₽1000 off",                       ru: "1000 ₽ скидка" },
  },
  {
    id: "usd-10-off",
    type: "usd-amount",
    value: 10,
    color: "#6BCB99",
    audience: "en",
    label: { en: "$10 off your next commission", ru: "$10 скидка на следующий заказ" },
    short: { en: "$10 off",                       ru: "$10 скидка" },
  },
  {
    id: "extra-revision",
    type: "perk",
    color: "#E9B66B",
    label: { en: "one extra revision round on the house", ru: "дополнительный раунд правок в подарок" },
    short: { en: "+1 revision",                            ru: "+1 правка" },
  },
];

/** Returns the rewards relevant for the active locale. */
export function getRewardsForLocale(locale) {
  return spinRewards.filter((r) => !r.audience || r.audience === locale);
}
