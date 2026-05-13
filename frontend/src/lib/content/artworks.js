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

export const categoryLabels = {
  portraits: { en: "portraits", ru: "портреты" },
  animals: { en: "animals", ru: "животные" },
  landscapes: { en: "landscapes", ru: "пейзажи" },
  "still life": { en: "still life", ru: "натюрморты" },
};

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
    title: { en: "sketch turned final", ru: "от скетча до финала" },
    alt: { en: "portrait with warm lighting", ru: "портрет в тёплом свете" },
    artistComment: {
      en: "accidentally worked on a sketch enough for it to be called a final piece",
      ru: "случайно довела скетч до уровня, когда его уже можно назвать финалом",
    },
  },
  {
    id: "portrait-06",
    category: "portraits",
    path: "images/portraits/owner_pet1",
    featured: false,
    title: { en: "owner and pet series", ru: "серия «хозяин и питомец»" },
    alt: { en: "portrait of owner with pet", ru: "портрет хозяйки с питомцем" },
    artistComment: {
      en: "two of my favorite subjects in one artwork!!",
      ru: "две мои любимые темы в одной работе!!",
    },
  },
  {
    id: "portrait-04",
    category: "portraits",
    path: "images/portraits/flowers_hairstyle_lady",
    featured: false,
    title: { en: "loved the hairstyle", ru: "обожаю эту причёску" },
    alt: { en: "introspective portrait", ru: "интроспективный портрет" },
    artistComment: {
      en: "it was hard to accomplish the braids feel without overdetailizing",
      ru: "было сложно передать ощущение кос без перегруза деталями",
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
      en: "i love the winter holidays vibes",
      ru: "обожаю настроение зимних праздников",
    },
  },
  {
    id: "portrait-03",
    category: "portraits",
    path: "images/portraits/some_dude",
    featured: true,
    title: { en: "men are difficult to draw", ru: "мужчин сложно рисовать" },
    alt: { en: "portrait at dusk", ru: "портрет в сумерках" },
    artistComment: {
      en: "but i think i succeeded",
      ru: "но мне кажется, у меня получилось",
    },
  },
  {
    id: "portrait-07",
    category: "portraits",
    path: "images/portraits/heavily_stylized?updatedAt=1777912076764",
    featured: false,
    title: { en: "heavy hatching experiment", ru: "эксперимент с плотной штриховкой" },
    alt: {
      en: "heavily stylized portrait by akira",
      ru: "стилизованный портрет akira",
    },
    artistComment: {
      en: "a monthly challenge (from loish) style study",
      ru: "стилевой этюд по месячному челленджу (от loish)",
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
      en: "love love love how stylized it turned out",
      ru: "обожаю-обожаю, как стилизованно это вышло",
    },
  },
  {
    id: "portrait-09",
    category: "portraits",
    path: "images/portraits/monthly",
    featured: false,
    title: { en: "monthly challenge piece", ru: "работа на месячный челлендж" },
    alt: { en: "monthly portrait by akira", ru: "портрет monthly от akira" },
    artistComment: {
      en: "within angel ganev's students server",
      ru: "внутри сервера учеников angel ganev",
    },
  },

  // ---------------- animals (8) ----------------
  {
    id: "animal-06",
    category: "animals",
    path: "images/animals/horsey?updatedAt=1777912296674",
    featured: false,
    title: { en: "horsey", ru: "лошадка" },
    alt: { en: "horsey animal artwork by akira", ru: "работа horsey от akira" },
    artistComment: {
      en: "rough strokes make good movement",
      ru: "грубые мазки хорошо дают движение",
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
      en: "just a cute lil curious fella",
      ru: "просто милый маленький любопытный зверёк",
    },
  },
  {
    id: "animal-08",
    category: "animals",
    path: "images/animals/layin_kitten?updatedAt=1777912292067",
    featured: false,
    title: { en: "layin kitten", ru: "лежащий котёнок" },
    alt: { en: "layin kitten animal artwork by akira", ru: "работа layin kitten от akira" },
    artistComment: {
      en: "my first time trying to apply face-layin i learned from angel ganev, on animals",
      ru: "впервые попробовала face-layin от angel ganev на животных",
    },
  },
  {
    id: "animal-01",
    category: "animals",
    path: "images/animals/silly_kitty",
    featured: true,
    isSecret: true,
    title: { en: "playful cat", ru: "игривый кот" },
    alt: {
      en: "cat portrait in cool tones",
      ru: "портрет кота в холодных тонах",
    },
    artistComment: {
      en: "GIVE IT ATTENTION, NOW!!",
      ru: "ДАЙ ЕМУ ВНИМАНИЯ, СЕЙЧАС!!",
    },
  },
  {
    id: "animal-02",
    category: "animals",
    path: "images/animals/tiger",
    featured: false,
    title: { en: "forest companion", ru: "лесной спутник" },
    alt: {
      en: "animal portrait in cool tones",
      ru: "портрет животного в холодных тонах",
    },
    artistComment: {
      en: "he turned out to be younger looking than i intended",
      ru: "получился моложе, чем я задумывала",
    },
  },
  {
    id: "animal-03",
    category: "animals",
    path: "images/animals/silly_birb",
    featured: false,
    title: { en: "silly birb", ru: "забавный бирб" },
    alt: { en: "silly bird illustration", ru: "смешная птичка" },
    artistComment: {
      en: "gib him treats",
      ru: "дай ему вкусняшек",
    },
  },
  {
    id: "animal-04",
    category: "animals",
    path: "images/animals/fishies",
    featured: false,
    title: { en: "harmony fish", ru: "рыбы в гармонии" },
    alt: { en: "pair of fish swimming", ru: "две рыбки" },
    artistComment: {
      en: "i like to imagine they have some music in the background and they're swimming in sync",
      ru: "люблю представлять, что у них играет музыка на фоне, а они плывут синхронно",
    },
  },
  {
    id: "animal-05",
    category: "animals",
    path: "images/animals/doggo_comm",
    featured: false,
    title: { en: "doggo commission", ru: "коммишен с пёсиком" },
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
    title: { en: "anger", ru: "злость" },
    alt: { en: "ocean landscape", ru: "морской пейзаж" },
    artistComment: {
      en: "an angry oceanscape. just like me >:)",
      ru: "злой океанский пейзаж. прямо как я >:)",
    },
  },
  {
    id: "landscape-01",
    category: "landscapes",
    path: "images/landscapes/cloudscape2",
    featured: false,
    title: { en: "cloudscape", ru: "облачный пейзаж" },
    alt: { en: "cloud landscape study", ru: "этюд облачного пейзажа" },
    artistComment: {
      en: "first time doing clouds after a long break",
      ru: "первый раз рисовала облака после долгого перерыва",
    },
  },
  {
    id: "landscape-04",
    category: "landscapes",
    path: "images/landscapes/cloudscape",
    featured: false,
    title: { en: "sharp sketch", ru: "резкий скетч" },
    alt: { en: "cloudscape panorama", ru: "панорама облаков" },
    artistComment: {
      en: "this one is my ipad's background hehe",
      ru: "это обои на моём ipad хехе",
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
      en: "mountains. the foggy water was the hardest to make",
      ru: "горы. туманная вода далась сложнее всего",
    },
  },
  {
    id: "landscape-06",
    category: "landscapes",
    path: "images/landscapes/planes?updatedAt=1778163055883",
    imageTransforms: ["f-jpg", "q-auto"],
    featured: false,
    title: { en: "planes", ru: "самолёты" },
    alt: { en: "planes landscape by akira", ru: "пейзаж planes от akira" },
    artistComment: {
      en: "i really enjoy travelling, it feels free and liberating",
      ru: "обожаю путешествовать — ощущение свободы и лёгкости",
    },
  },
  {
    id: "landscape-07",
    category: "landscapes",
    path: "images/landscapes/myuniverse?updatedAt=1778163056828",
    imageTransforms: ["f-jpg", "q-auto"],
    featured: false,
    title: { en: "my universe", ru: "моя вселенная" },
    alt: { en: "personal universe landscape by akira", ru: "личная вселенная — пейзаж от akira" },
    artistComment: {
      en: "a personal piece which represents my surroundings",
      ru: "личная работа про то, что меня окружает",
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
      en: "a monthly challenge (from loish) piece on topic of wet surfaces and rain.",
      ru: "работа на месячный челлендж (от loish) на тему мокрых поверхностей и дождя.",
    },
  },
  {
    id: "landscape-08",
    category: "landscapes",
    path: "images/landscapes/calm?updatedAt=1778163092135",
    imageTransforms: ["f-jpg", "q-auto"],
    featured: false,
    title: { en: "calm", ru: "спокойствие" },
    alt: { en: "calm landscape by akira", ru: "пейзаж calm от akira" },
    artistComment: {
      en: "as opposed to anger, this is a calmer state of the water.",
      ru: "в отличие от «злости», здесь вода в более спокойном состоянии.",
    },
  },

  // ---------------- still life (8) ----------------
  {
    id: "still-06",
    category: "still life",
    path: "images/still life/tomato",
    imageTransforms: ["f-jpg", "q-auto"],
    featured: false,
    title: { en: "tomato", ru: "помидор" },
    alt: { en: "still life tomato study", ru: "натюрморт tomato" },
    artistComment: {
      en: "stylizing something that is primarily only one color was hard",
      ru: "стилизовать то, что по сути почти одного цвета, было непросто",
    },
  },
  {
    id: "still-07",
    category: "still life",
    path: "images/still life/vase_study",
    imageTransforms: ["f-webp", "q-auto"],
    featured: false,
    title: { en: "vase study", ru: "этюд с вазой" },
    alt: { en: "still life vase study", ru: "натюрморт vase study" },
    artistComment: {
      en: "a quick sketch i did in parallel with my mom",
      ru: "быстрый скетч параллельно с мамой",
    },
  },
  {
    id: "still-08",
    category: "still life",
    path: "images/still life/yay",
    imageTransforms: ["f-jpg", "q-auto"],
    featured: false,
    title: { en: "peony", ru: "пион" },
    alt: { en: "still life peony flower", ru: "натюрморт с пионом" },
    artistComment: {
      en: "a flower i revisited after some years from my first attempt at it.",
      ru: "цветок, к которому я вернулась спустя годы после первой попытки.",
    },
  },
  {
    id: "still-01",
    category: "still life",
    path: "images/still life/ladybugs_awaken",
    featured: false,
    title: { en: "ladybugs attack", ru: "атака божьих коровок" },
    alt: { en: "still life with tea", ru: "натюрморт с чаем" },
    artistComment: {
      en: "i wonder if ladybugs like playing on flowers as a kid would play on a trampoline",
      ru: "интересно, любят ли божьи коровки играть на цветах, как ребёнок на батуте",
    },
  },
  {
    id: "still-02",
    category: "still life",
    path: "images/still life/bananas",
    featured: false,
    title: { en: "stylized bananas", ru: "стилизованные бананы" },
    alt: { en: "still life with bananas", ru: "натюрморт с бананами" },
    artistComment: {
      en: "i love how colorful they turned out. i used to find the shape of bananas to be difficult",
      ru: "обожаю, какие они яркие получились. раньше форма бананов давалась мне сложно",
    },
  },
  {
    id: "still-03",
    category: "still life",
    path: "images/still life/subsurface_scattering",
    featured: false,
    title: { en: "subsurface scattering", ru: "подповерхностное рассеивание" },
    alt: { en: "glowing berry still life", ru: "натюрморт со светящейся ягодой" },
    artistComment: {
      en: "a bright glowing berry",
      ru: "яркая светящаяся ягода",
    },
  },
  {
    id: "still-04",
    category: "still life",
    path: "images/still life/color_plant",
    featured: false,
    title: { en: "cyberleaves", ru: "киберлистья" },
    alt: { en: "small still life trio", ru: "маленький натюрморт-трио" },
    artistComment: {
      en: "stylization using irregular colors",
      ru: "стилизация с нерегулярными цветами",
    },
  },
  {
    id: "still-05",
    category: "still life",
    path: "images/still life/apple",
    featured: false,
    title: { en: "apple study", ru: "этюд с яблоком" },
    alt: { en: "still life apple study", ru: "натюрморт с яблоком" },
    artistComment: {
      en: "a heavily stylized apple study. i LOVE how it turned out",
      ru: "сильно стилизованный этюд яблока. обожаю, как вышло",
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
