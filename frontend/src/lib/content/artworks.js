export const artworkCategories = ["portraits", "animals", "still life"];

/**
 * Locale-aware text fields are `{ en, ru }`. `featured` selects which pieces
 * appear on the homepage. Exactly one piece carries `isSecret: true` — that
 * card is the hidden entry to the spin wheel.
 */
export const artworks = [
  // ---------------- portraits (4) ----------------
  {
    id: "portrait-01",
    category: "portraits",
    imageSrc: "https://picsum.photos/id/1027/900/1200",
    featured: true,
    isSecret: true,
    title:         { en: "self portrait no. 1", ru: "автопортрет №1" },
    alt:           { en: "self portrait by akira",   ru: "автопортрет akira" },
    artistComment: {
      en: "the first piece in a long thread of self portraits — soft and slightly tired.",
      ru: "первая работа в длинной серии автопортретов — мягкая и слегка уставшая.",
    },
  },
  {
    id: "portrait-02",
    category: "portraits",
    imageSrc: "https://picsum.photos/id/1005/900/1200",
    featured: true,
    title:         { en: "quiet gaze",                  ru: "тихий взгляд" },
    alt:           { en: "portrait with warm lighting", ru: "портрет в тёплом свете" },
    artistComment: {
      en: "a study of pause and memory, painted between sessions.",
      ru: "этюд паузы и памяти, написанный между сессиями.",
    },
  },
  {
    id: "portrait-03",
    category: "portraits",
    imageSrc: "https://picsum.photos/id/64/900/1200",
    featured: false,
    title:         { en: "evening light",        ru: "вечерний свет" },
    alt:           { en: "portrait at dusk",     ru: "портрет в сумерках" },
    artistComment: {
      en: "warm colour study at dusk — a reminder to slow down.",
      ru: "тёплый цветовой этюд в сумерках — напоминание замедлиться.",
    },
  },
  {
    id: "portrait-04",
    category: "portraits",
    imageSrc: "https://picsum.photos/id/177/900/1200",
    featured: false,
    title:         { en: "small thought",        ru: "маленькая мысль" },
    alt:           { en: "introspective portrait", ru: "интроспективный портрет" },
    artistComment: {
      en: "a small thought, rendered carefully and given a frame.",
      ru: "маленькая мысль, аккуратно прорисованная и оформленная.",
    },
  },

  // ---------------- animals (4) ----------------
  {
    id: "animal-01",
    category: "animals",
    imageSrc: "https://picsum.photos/id/237/900/1200",
    featured: true,
    title:         { en: "small moon cat",                  ru: "маленький лунный кот" },
    alt:           { en: "cat portrait in cool tones",      ru: "портрет кота в холодных тонах" },
    artistComment: {
      en: "playful and dreamy — a winter night sort of cat.",
      ru: "игривый и мечтательный — кот зимней ночи.",
    },
  },
  {
    id: "animal-02",
    category: "animals",
    imageSrc: "https://picsum.photos/id/433/900/1200",
    featured: false,
    title:         { en: "forest companion",                ru: "спутник леса" },
    alt:           { en: "animal portrait in cool tones",   ru: "портрет животного в холодных тонах" },
    artistComment: {
      en: "painted with gentle contrast and a lot of patience.",
      ru: "написан мягким контрастом и большим количеством терпения.",
    },
  },
  {
    id: "animal-03",
    category: "animals",
    imageSrc: "https://picsum.photos/id/40/900/1200",
    featured: false,
    title:         { en: "old dog, soft afternoon",       ru: "старый пёс, мягкий день" },
    alt:           { en: "older dog napping",             ru: "пожилой пёс отдыхает" },
    artistComment: {
      en: "a slow afternoon with an old friend.",
      ru: "медленный день со старым другом.",
    },
  },
  {
    id: "animal-04",
    category: "animals",
    imageSrc: "https://picsum.photos/id/659/900/1200",
    featured: false,
    title:         { en: "two birds talking",            ru: "две птицы разговаривают" },
    alt:           { en: "pair of small birds",          ru: "пара маленьких птиц" },
    artistComment: {
      en: "small birds in conversation — i imagined the whole story.",
      ru: "маленькие птицы в разговоре — я придумала всю историю.",
    },
  },

  // ---------------- still life (4) ----------------
  {
    id: "still-01",
    category: "still life",
    imageSrc: "https://picsum.photos/id/292/900/1200",
    featured: false,
    title:         { en: "tea and late light",       ru: "чай и поздний свет" },
    alt:           { en: "still life with tea",      ru: "натюрморт с чаем" },
    artistComment: {
      en: "a quiet table scene at the end of a long day.",
      ru: "тихая сцена на столе в конце долгого дня.",
    },
  },
  {
    id: "still-02",
    category: "still life",
    imageSrc: "https://picsum.photos/id/1080/900/1200",
    featured: false,
    title:         { en: "letters and petals",         ru: "письма и лепестки" },
    alt:           { en: "still life with petals",     ru: "натюрморт с лепестками" },
    artistComment: {
      en: "soft palettes layered with texture — slowly, slowly.",
      ru: "мягкие палитры, послойно с текстурой — медленно, медленно.",
    },
  },
  {
    id: "still-03",
    category: "still life",
    imageSrc: "https://picsum.photos/id/431/900/1200",
    featured: false,
    title:         { en: "open book",          ru: "открытая книга" },
    alt:           { en: "open book on a desk", ru: "открытая книга на столе" },
    artistComment: {
      en: "an open book and the way the spine catches afternoon light.",
      ru: "открытая книга и то, как корешок ловит дневной свет.",
    },
  },
  {
    id: "still-04",
    category: "still life",
    imageSrc: "https://picsum.photos/id/674/900/1200",
    featured: false,
    title:         { en: "cup, coin, candle",        ru: "чашка, монета, свеча" },
    alt:           { en: "small still life trio",    ru: "маленький натюрморт-трио" },
    artistComment: {
      en: "three small things on a table, given the same care as a portrait.",
      ru: "три маленькие вещи на столе, с той же заботой, что и портрет.",
    },
  },
];

export function getFeaturedArtworks() {
  return artworks.filter((a) => a.featured);
}

export function getSecretArtwork() {
  return artworks.find((a) => a.isSecret);
}

export function getArtworksByCategory(category) {
  return artworks.filter((a) => a.category === category);
}
