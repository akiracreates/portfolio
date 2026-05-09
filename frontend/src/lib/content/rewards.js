/**
 * Spin wheel reward catalog. Single ordered list for all locales; user-facing
 * copy is picked by locale. Each entry includes admin metadata (both currencies
 * for flats) for future email/DB — never render adminLabel in the UI.
 */

/** Segment order is chosen so no two adjacent wheel slices share the same hex (wrap included). */
export const spinRewards = [
  {
    id: "pct-5",
    type: "percent",
    weight: 24,
    value: 5,
    color: "#d06090",
    short: { en: "5% off", ru: "5% скидка" },
    label: {
      en: "5% off your next commission",
      ru: "скидка 5% на следующий заказ",
    },
    adminLabel: "5% off (any locale)",
  },
  {
    id: "surprise-small",
    type: "service",
    weight: 18,
    color: "#a078d0",
    short: { en: "small surprise", ru: "сюрприз" },
    label: {
      en: "a small surprise bonus on your next commission",
      ru: "небольшой сюрприз-бонус к следующему заказу",
    },
    adminLabel: "small surprise bonus (fulfill at artist discretion)",
  },
  {
    id: "flat-5",
    type: "flat",
    weight: 12,
    usdValue: 5,
    rubValue: 400,
    color: "#c84878",
    short: { en: "$5 off", ru: "400 ₽ скидка" },
    label: {
      en: "$5 off your next commission",
      ru: "скидка 400 ₽ на следующий заказ",
    },
    adminLabel: "$5 off / 400 ₽ off",
  },
  {
    id: "pct-10",
    type: "percent",
    weight: 15,
    value: 10,
    color: "#a078d0",
    short: { en: "10% off", ru: "10% скидка" },
    label: {
      en: "10% off your next commission",
      ru: "скидка 10% на следующий заказ",
    },
    adminLabel: "10% off (any locale)",
  },
  {
    id: "flat-8",
    type: "flat",
    weight: 5,
    usdValue: 8,
    rubValue: 700,
    color: "#b88828",
    short: { en: "$8 off", ru: "700 ₽ скидка" },
    label: {
      en: "$8 off your next commission",
      ru: "скидка 700 ₽ на следующий заказ",
    },
    adminLabel: "$8 off / 700 ₽ off",
  },
  {
    id: "free-sketch",
    type: "service",
    weight: 4,
    color: "#a078d0",
    short: { en: "free sketch", ru: "скетч" },
    label: {
      en: "a free sketch with your next commission",
      ru: "бесплатный скетч к следующему заказу",
    },
    adminLabel: "free sketch with commission",
  },
  {
    id: "pct-15",
    type: "percent",
    weight: 8,
    value: 15,
    color: "#b83888",
    short: { en: "15% off", ru: "15% скидка" },
    label: {
      en: "15% off your next commission",
      ru: "скидка 15% на следующий заказ",
    },
    adminLabel: "15% off (any locale)",
  },
  {
    id: "flat-2",
    type: "flat",
    weight: 22,
    usdValue: 2,
    rubValue: 200,
    color: "#c99428",
    short: { en: "$2 off", ru: "200 ₽ скидка" },
    label: {
      en: "$2 off your next commission",
      ru: "скидка 200 ₽ на следующий заказ",
    },
    adminLabel: "$2 off / 200 ₽ off",
  },
  {
    id: "pct-25",
    type: "percent",
    weight: 2,
    value: 25,
    color: "#a02868",
    short: { en: "25% off", ru: "25% скидка" },
    label: {
      en: "25% off your next commission",
      ru: "скидка 25% на следующий заказ",
    },
    adminLabel: "25% off (any locale)",
  },
];

const rewardById = new Map(spinRewards.map((r) => [r.id, r]));

/** Wheel segment order is stable; same slices for en and ru. */
export function getRewardsForLocale(_locale) {
  return spinRewards;
}

/** Weighted random choice; returns the full reward object. */
export function pickWeightedReward(rewards = spinRewards) {
  const total = rewards.reduce((sum, r) => sum + (r.weight ?? 0), 0);
  let roll = Math.random() * total;
  for (let i = 0; i < rewards.length; i += 1) {
    roll -= rewards[i].weight ?? 0;
    if (roll <= 0) return rewards[i];
  }
  return rewards[rewards.length - 1];
}

export function getSpinRewardById(id) {
  return rewardById.get(id) ?? null;
}
