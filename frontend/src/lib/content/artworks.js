import { imagekitUrl } from "@/lib/images/imagekit";
import { getImageMeta } from "@/lib/images/get-image-meta";

/**
 * Locale-aware text fields are `{ en, ru }`. `featured` selects which pieces
 * appear on the homepage. Exactly one piece carries `isSecret: true` — that
 * card is the hidden entry to the spin wheel.
 *
 * `imageSrc` is built from `imagekitUrl(path)`. We keep `path` on the artwork
 * so we can look up natural dimensions from `image-meta.json`.
 */
export const artworkCategories = [
  "portraits",
  "animals",
  "landscapes",
  "still life",
];

const rawArtworks = [
  // ---------------- portraits (6) ----------------
  {
    id: "portrait-01",
    category: "portraits",
    path: "images/portraits/self",
    featured: false,
    title: { en: "self portrait no. 1", ru: "автопортрет №1" },
    alt: { en: "self portrait by akira", ru: "автопортрет akira" },
    artistComment: {
      en: "the first piece in a long thread of self portraits — soft and slightly tired.",
      ru: "первая работа в длинной серии автопортретов — мягкая и слегка уставшая.",
    },
  },
  {
    id: "portrait-02",
    category: "portraits",
    path: "images/portraits/accidental_success",
    featured: true,
    title: { en: "quiet gaze", ru: "тихий взгляд" },
    alt: { en: "portrait with warm lighting", ru: "портрет в тёплом свете" },
    artistComment: {
      en: "a study of pause and memory, painted between sessions.",
      ru: "этюд паузы и памяти, написанный между сессиями.",
    },
  },
  {
    id: "portrait-03",
    category: "portraits",
    path: "images/portraits/some_dude",
    featured: true,
    title: { en: "evening light", ru: "вечерний свет" },
    alt: { en: "portrait at dusk", ru: "портрет в сумерках" },
    artistComment: {
      en: "warm colour study at dusk — a reminder to slow down.",
      ru: "тёплый цветовой этюд в сумерках — напоминание замедлиться.",
    },
  },
  {
    id: "portrait-04",
    category: "portraits",
    path: "images/portraits/flowers_hairstyle_lady",
    featured: false,
    title: { en: "small thought", ru: "маленькая мысль" },
    alt: { en: "introspective portrait", ru: "интроспективный портрет" },
    artistComment: {
      en: "a small thought, rendered carefully and given a frame.",
      ru: "маленькая мысль, аккуратно прорисованная и оформленная.",
    },
  },
  {
    id: "portrait-05",
    category: "portraits",
    path: "images/portraits/winter_portrait",
    featured: false,
    title: { en: "winter portrait", ru: "зимний портрет" },
    alt: { en: "winter portrait study", ru: "зимний портретный этюд" },
    artistComment: {
      en: "a cooler palette with soft edges and patient layering.",
      ru: "более холодная палитра с мягкими краями и терпеливыми слоями.",
    },
  },
  {
    id: "portrait-06",
    category: "portraits",
    path: "images/portraits/owner_pet1",
    featured: false,
    title: { en: "owner + pet", ru: "хозяйка и питомец" },
    alt: { en: "portrait of owner with pet", ru: "портрет хозяйки с питомцем" },
    artistComment: {
      en: "a quiet dual portrait focusing on connection and warmth.",
      ru: "тихий двойной портрет с акцентом на связь и тепло.",
    },
  },

  // ---------------- animals (5) ----------------
  {
    id: "animal-01",
    category: "animals",
    path: "images/animals/silly_kitty",
    featured: true,
    isSecret: true,
    title: { en: "small moon cat", ru: "маленький лунный кот" },
    alt: {
      en: "cat portrait in cool tones",
      ru: "портрет кота в холодных тонах",
    },
    artistComment: {
      en: "playful and dreamy — a winter night sort of cat.",
      ru: "игривый и мечтательный — кот зимней ночи.",
    },
  },
  {
    id: "animal-02",
    category: "animals",
    path: "images/animals/tiger",
    featured: false,
    title: { en: "forest companion", ru: "спутник леса" },
    alt: {
      en: "animal portrait in cool tones",
      ru: "портрет животного в холодных тонах",
    },
    artistComment: {
      en: "painted with gentle contrast and a lot of patience.",
      ru: "написан мягким контрастом и большим количеством терпения.",
    },
  },
  {
    id: "animal-03",
    category: "animals",
    path: "images/animals/silly_birb",
    featured: false,
    title: { en: "old dog, soft afternoon", ru: "старый пёс, мягкий день" },
    alt: { en: "older dog napping", ru: "пожилой пёс отдыхает" },
    artistComment: {
      en: "a slow afternoon with an old friend.",
      ru: "медленный день со старым другом.",
    },
  },
  {
    id: "animal-04",
    category: "animals",
    path: "images/animals/fishies",
    featured: false,
    title: { en: "two birds talking", ru: "две птицы разговаривают" },
    alt: { en: "pair of small birds", ru: "пара маленьких птиц" },
    artistComment: {
      en: "small birds in conversation — i imagined the whole story.",
      ru: "маленькие птицы в разговоре — я придумала всю историю.",
    },
  },
  {
    id: "animal-05",
    category: "animals",
    path: "images/animals/doggo_comm",
    featured: false,
    title: { en: "doggo commission", ru: "портрет пёсика" },
    alt: { en: "commissioned dog portrait", ru: "заказной портрет собаки" },
    artistComment: {
      en: "a commission piece with warm contrast and a playful expression.",
      ru: "заказная работа с тёплым контрастом и игривым выражением.",
    },
  },

  // ---------------- landscapes (5) ----------------
  {
    id: "landscape-01",
    category: "landscapes",
    path: "images/landscapes/cloudscape2",
    featured: false,
    title: { en: "cloudscope ii", ru: "облака ii" },
    alt: { en: "cloud landscape study", ru: "этюд облачного пейзажа" },
    artistComment: {
      en: "a broad sky study focused on shape and atmosphere.",
      ru: "пейзажный этюд неба с фокусом на форме и атмосфере.",
    },
  },
  {
    id: "landscape-02",
    category: "landscapes",
    path: "images/landscapes/cityscape",
    featured: false,
    title: { en: "cityscape", ru: "городской пейзаж" },
    alt: { en: "cityscape painting", ru: "живопись городского пейзажа" },
    artistComment: {
      en: "a city scene built from soft geometry and restrained color.",
      ru: "городская сцена из мягкой геометрии и сдержанного цвета.",
    },
  },
  {
    id: "landscape-03",
    category: "landscapes",
    path: "images/landscapes/oceanscape",
    featured: false,
    title: { en: "oceanscape", ru: "морской пейзаж" },
    alt: { en: "ocean landscape", ru: "морской пейзаж" },
    artistComment: {
      en: "quiet water rhythms and layered blues across the horizon.",
      ru: "тихие ритмы воды и слои синего вдоль горизонта.",
    },
  },
  {
    id: "landscape-04",
    category: "landscapes",
    path: "images/landscapes/cloudscape",
    featured: false,
    title: { en: "cloudscape", ru: "облачный пейзаж" },
    alt: { en: "cloudscape panorama", ru: "панорама облаков" },
    artistComment: {
      en: "a calm cloud massing study with soft transitions.",
      ru: "спокойное исследование облачных масс с мягкими переходами.",
    },
  },
  {
    id: "landscape-05",
    category: "landscapes",
    path: "images/landscapes/mountscape",
    featured: false,
    title: { en: "mountscape", ru: "горный пейзаж" },
    alt: { en: "mountain landscape", ru: "горный пейзаж" },
    artistComment: {
      en: "a mountain composition balancing depth and stillness.",
      ru: "горная композиция с балансом глубины и тишины.",
    },
  },

  // ---------------- still life (5) ----------------
  {
    id: "still-01",
    category: "still life",
    path: "images/still life/ladybugs_awaken",
    featured: false,
    title: { en: "tea and late light", ru: "чай и поздний свет" },
    alt: { en: "still life with tea", ru: "натюрморт с чаем" },
    artistComment: {
      en: "a quiet table scene at the end of a long day.",
      ru: "тихая сцена на столе в конце долгого дня.",
    },
  },
  {
    id: "still-02",
    category: "still life",
    path: "images/still life/bananas",
    featured: false,
    title: { en: "letters and petals", ru: "письма и лепестки" },
    alt: { en: "still life with petals", ru: "натюрморт с лепестками" },
    artistComment: {
      en: "soft palettes layered with texture — slowly, slowly.",
      ru: "мягкие палитры, послойно с текстурой — медленно, медленно.",
    },
  },
  {
    id: "still-03",
    category: "still life",
    path: "images/still life/subsurface_scattering",
    featured: false,
    title: { en: "open book", ru: "открытая книга" },
    alt: { en: "open book on a desk", ru: "открытая книга на столе" },
    artistComment: {
      en: "an open book and the way the spine catches afternoon light.",
      ru: "открытая книга и то, как корешок ловит дневной свет.",
    },
  },
  {
    id: "still-04",
    category: "still life",
    path: "images/still life/color_plant",
    featured: false,
    title: { en: "cup, coin, candle", ru: "чашка, монета, свеча" },
    alt: { en: "small still life trio", ru: "маленький натюрморт-трио" },
    artistComment: {
      en: "three small things on a table, given the same care as a portrait.",
      ru: "три маленькие вещи на столе, с той же заботой, что и портрет.",
    },
  },
  {
    id: "still-05",
    category: "still life",
    path: "images/still life/apple",
    featured: false,
    title: { en: "apple study", ru: "этюд яблока" },
    alt: { en: "still life apple study", ru: "натюрморт с яблоком" },
    artistComment: {
      en: "a focused still life study on form, value, and edge control.",
      ru: "сосредоточенный натюрмортный этюд формы, тона и краёв.",
    },
  },
];

/**
 * Final artwork list with `imageSrc` (CDN URL) and `width`/`height` (natural
 * pixel dimensions, looked up from `image-meta.json`) derived from `path`.
 */
export const artworks = rawArtworks.map((a) => {
  const meta = getImageMeta(a.path);
  return {
    ...a,
    imageSrc: imagekitUrl(a.path),
    width: meta.width,
    height: meta.height,
  };
});

export function getFeaturedArtworks() {
  return artworks.filter((a) => a.featured);
}

export function getSecretArtwork() {
  return artworks.find((a) => a.isSecret);
}

export function getArtworksByCategory(category) {
  return artworks.filter((a) => a.category === category);
}
