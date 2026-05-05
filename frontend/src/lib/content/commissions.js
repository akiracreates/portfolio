import { getArtworksByCategory } from "./artworks";

/**
 * Commission data — three datasets:
 *  - commissionTypes: 2 offered types with prices in {usd, rub}
 *  - commissionProcess: 7 numbered steps
 *  - whatToExpect: 6 highlight bullets ({short, long}) shown on home + commissions page
 *
 *  All locale-aware copy uses { en, ru }; pricing uses { usd, rub }.
 */

export const commissionTypes = [
  {
    id: "portrait",
    title:       { en: "portrait",            ru: "портрет" },
    shortTitle:  { en: "portraits",           ru: "портреты" },
    description: {
      en: "a custom portrait painted from your references — calm, considered, story-driven.",
      ru: "индивидуальный портрет по вашим референсам — спокойный, продуманный, с историей.",
    },
    price: { usd: 80, rub: 5500 },
    revisions: 3,
    deliveryFormats: ["png", "jpeg"],
    included: {
      en: ["high-resolution image", "web version", "3 revision rounds"],
      ru: ["изображение в высоком разрешении", "веб-версия", "3 раунда правок"],
    },
    exampleImage: getArtworksByCategory("portraits")[1]?.imageSrc ?? "",
  },
  {
    id: "animal",
    title:       { en: "animal",              ru: "животное" },
    shortTitle:  { en: "animals",             ru: "животные" },
    description: {
      en: "warm and detailed animal-focused composition — pets, wildlife, or imagined creatures.",
      ru: "тёплая и детальная композиция с животными — питомцы, дикие или придуманные.",
    },
    price: { usd: 90, rub: 6000 },
    revisions: 3,
    deliveryFormats: ["png", "jpeg"],
    included: {
      en: ["high-resolution image", "web version", "3 revision rounds"],
      ru: ["изображение в высоком разрешении", "веб-версия", "3 раунда правок"],
    },
    exampleImage: getArtworksByCategory("animals")[0]?.imageSrc ?? "",
  },
];

export const commissionProcess = [
  {
    step: 1,
    title: { en: "request",     ru: "запрос" },
    body:  {
      en: "send your idea, references, and timeline through the form. i'll reply within 48 hours.",
      ru: "пришлите идею, референсы и сроки через форму. отвечу в течение 48 часов.",
    },
  },
  {
    step: 2,
    title: { en: "discussion",  ru: "обсуждение" },
    body:  {
      en: "we talk through the concept, scope, and any specific details that matter to you.",
      ru: "обсуждаем концепцию, объём и любые важные детали.",
    },
  },
  {
    step: 3,
    title: { en: "payment",     ru: "оплата" },
    body:  {
      en: "full payment is collected up front so we can begin without delay.",
      ru: "полная оплата заранее, чтобы начать без задержек.",
    },
  },
  {
    step: 4,
    title: { en: "sketch",      ru: "набросок" },
    body:  {
      en: "i share an early sketch so you can shape direction before painting begins.",
      ru: "присылаю ранний набросок, чтобы вы могли скорректировать направление.",
    },
  },
  {
    step: 5,
    title: { en: "revisions",   ru: "правки" },
    body:  {
      en: "up to 3 revision rounds are included by default. more available on request.",
      ru: "до 3 раундов правок включено по умолчанию. больше — по запросу.",
    },
  },
  {
    step: 6,
    title: { en: "final piece", ru: "финал" },
    body:  {
      en: "i finalise the artwork and prepare delivery files in your preferred format.",
      ru: "финализирую работу и готовлю файлы в нужном формате.",
    },
  },
  {
    step: 7,
    title: { en: "delivery",    ru: "доставка" },
    body:  {
      en: "png or jpeg by default; other formats by request. delivered within ~2 weeks.",
      ru: "png или jpeg по умолчанию; другие форматы по запросу. срок — около 2 недель.",
    },
  },
];

export const whatToExpect = [
  {
    id: "communication",
    short: { en: "clear communication",          ru: "ясная коммуникация" },
    long:  {
      en: "i reply within 48 hours and check in at every stage of the project.",
      ru: "отвечаю в течение 48 часов и держу в курсе на каждом этапе.",
    },
  },
  {
    id: "payment",
    short: { en: "full payment beforehand",      ru: "полная оплата заранее" },
    long:  {
      en: "payment is collected up front before the sketch begins.",
      ru: "оплата собирается заранее до начала наброска.",
    },
  },
  {
    id: "revisions",
    short: { en: "3 revisions by default",       ru: "3 правки в базе" },
    long:  {
      en: "extra revision rounds available if your piece needs them.",
      ru: "дополнительные правки доступны, если работе они нужны.",
    },
  },
  {
    id: "turnaround",
    short: { en: "around 2 week turnaround",     ru: "около 2 недель срок" },
    long:  {
      en: "the typical timeline from sketch to final delivery.",
      ru: "стандартное время от наброска до финальной сдачи.",
    },
  },
  {
    id: "delivery",
    short: { en: "png or jpeg delivery",         ru: "png или jpeg" },
    long:  {
      en: "other formats by request — just ask in the order form.",
      ru: "другие форматы по запросу — просто напишите в форме.",
    },
  },
  {
    id: "scope",
    short: { en: "portraits + animals",          ru: "портреты + животные" },
    long:  {
      en: "still life and other scopes available by arrangement.",
      ru: "натюрморты и другие задачи доступны по договорённости.",
    },
  },
];

export const commissionStatus = {
  open: true,
  label: { en: "commissions are open", ru: "заказы открыты" },
};

/**
 * Returns the carousel preview set for a given commission type. Reuses the
 * first three artworks of the matching gallery category so we never have to
 * duplicate image data — keeping the dataset single-sourced.
 */
export function getCommissionPreviews(typeId) {
  if (typeId === "portrait") {
    return getArtworksByCategory("portraits").slice(0, 3);
  }
  if (typeId === "animal") {
    return getArtworksByCategory("animals").slice(0, 3);
  }
  return [];
}
