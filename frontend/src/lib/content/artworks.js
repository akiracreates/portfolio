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

export const homepageFeaturedArtworkIds = [
  "portrait-02",
  "animal-01",
  "landscape-01",
  "still-01",
];

const rawArtworks = [
  // ---------------- portraits (8) ----------------
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
    id: "portrait-07",
    category: "portraits",
    path: "images/portraits/heavily_stylized?updatedAt=1777912076764",
    featured: false,
    title: { en: "heavily stylized", ru: "heavily stylized" },
    alt: {
      en: "heavily stylized portrait by akira",
      ru: "стилизованный портрет akira",
    },
    artistComment: {
      en: "temporary note: portrait note is under construction.",
      ru: "временная заметка: описание портрета пока в разработке.",
    },
  },
  {
    id: "portrait-08",
    category: "portraits",
    path: "images/portraits/fishtank?updatedAt=1778161839934",
    featured: false,
    title: { en: "fishtank", ru: "fishtank" },
    alt: { en: "fishtank portrait by akira", ru: "портрет fishtank от akira" },
    artistComment: {
      en: "temporary note: portrait note is under construction.",
      ru: "временная заметка: описание портрета пока в разработке.",
    },
  },
  {
    id: "portrait-09",
    category: "portraits",
    path: "images/portraits/monthly",
    featured: false,
    title: { en: "monthly", ru: "monthly" },
    alt: { en: "monthly portrait by akira", ru: "портрет monthly от akira" },
    artistComment: {
      en: "temporary note: portrait note is under construction.",
      ru: "временная заметка: описание портрета пока в разработке.",
    },
  },

  // ---------------- animals (8) ----------------
  {
    id: "animal-06",
    category: "animals",
    path: "images/animals/horsey?updatedAt=1777912296674",
    featured: false,
    title: { en: "horsey", ru: "horsey" },
    alt: { en: "horsey animal artwork by akira", ru: "работа horsey от akira" },
    artistComment: {
      en: "temporary note: animal note is under construction.",
      ru: "временная заметка: описание работы пока в разработке.",
    },
  },
  {
    id: "animal-07",
    category: "animals",
    path: "images/animals/sooreekaat?updatedAt=1777912292344",
    featured: false,
    title: { en: "sooreekaat", ru: "sooreekaat" },
    alt: { en: "sooreekaat animal artwork by akira", ru: "работа sooreekaat от akira" },
    artistComment: {
      en: "temporary note: animal note is under construction.",
      ru: "временная заметка: описание работы пока в разработке.",
    },
  },
  {
    id: "animal-08",
    category: "animals",
    path: "images/animals/layin_kitten?updatedAt=1777912292067",
    featured: false,
    title: { en: "layin kitten", ru: "layin kitten" },
    alt: { en: "layin kitten animal artwork by akira", ru: "работа layin kitten от akira" },
    artistComment: {
      en: "temporary note: animal note is under construction.",
      ru: "временная заметка: описание работы пока в разработке.",
    },
  },
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

  // ---------------- landscapes (8) ----------------
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
  {
    id: "landscape-06",
    category: "landscapes",
    path: "images/landscapes/planes?updatedAt=1778163055883",
    imageTransforms: ["f-jpg", "q-auto"],
    featured: false,
    title: { en: "planes", ru: "planes" },
    alt: { en: "planes landscape by akira", ru: "пейзаж planes от akira" },
    artistComment: {
      en: "temporary note: landscape note is under construction.",
      ru: "временная заметка: описание пейзажа пока в разработке.",
    },
  },
  {
    id: "landscape-07",
    category: "landscapes",
    path: "images/landscapes/myuniverse?updatedAt=1778163056828",
    imageTransforms: ["f-jpg", "q-auto"],
    featured: false,
    title: { en: "myuniverse", ru: "myuniverse" },
    alt: { en: "myuniverse landscape by akira", ru: "пейзаж myuniverse от akira" },
    artistComment: {
      en: "temporary note: landscape note is under construction.",
      ru: "временная заметка: описание пейзажа пока в разработке.",
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
    id: "landscape-08",
    category: "landscapes",
    path: "images/landscapes/calm?updatedAt=1778163092135",
    imageTransforms: ["f-jpg", "q-auto"],
    featured: false,
    title: { en: "calm", ru: "calm" },
    alt: { en: "calm landscape by akira", ru: "пейзаж calm от akira" },
    artistComment: {
      en: "temporary note: landscape note is under construction.",
      ru: "временная заметка: описание пейзажа пока в разработке.",
    },
  },

  // ---------------- still life (8) ----------------
  {
    id: "still-06",
    category: "still life",
    path: "images/still life/tomato",
    imageTransforms: ["f-jpg", "q-auto"],
    featured: false,
    title: { en: "tomato", ru: "tomato" },
    alt: { en: "still life tomato study", ru: "натюрморт tomato" },
    artistComment: {
      en: "temporary note: still life note is under construction.",
      ru: "временная заметка: описание натюрморта пока в разработке.",
    },
  },
  {
    id: "still-07",
    category: "still life",
    path: "images/still life/vase_study",
    imageTransforms: ["f-webp", "q-auto"],
    featured: false,
    title: { en: "vase study", ru: "vase study" },
    alt: { en: "still life vase study", ru: "натюрморт vase study" },
    artistComment: {
      en: "temporary note: still life note is under construction.",
      ru: "временная заметка: описание натюрморта пока в разработке.",
    },
  },
  {
    id: "still-08",
    category: "still life",
    path: "images/still life/yay",
    imageTransforms: ["f-jpg", "q-auto"],
    featured: false,
    title: { en: "yay", ru: "yay" },
    alt: { en: "still life yay study", ru: "натюрморт yay" },
    artistComment: {
      en: "temporary note: still life note is under construction.",
      ru: "временная заметка: описание натюрморта пока в разработке.",
    },
  },
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
  const transforms = a.imageTransforms ?? ["f-jpg", "q-auto"];
  return {
    ...a,
    imageSrc: imagekitUrl(a.path, transforms),
    width: meta.width,
    height: meta.height,
  };
});

export function getFeaturedArtworks() {
  return artworks.filter((a) => a.featured);
}

export function getHomepageFeaturedArtworks() {
  return homepageFeaturedArtworkIds
    .map((id) => artworks.find((a) => a.id === id))
    .filter(Boolean);
}

export function getArtworkById(id) {
  return artworks.find((a) => a.id === id);
}

export function getSecretArtwork() {
  return artworks.find((a) => a.isSecret);
}

export function getArtworksByCategory(category) {
  return artworks.filter((a) => a.category === category);
}
