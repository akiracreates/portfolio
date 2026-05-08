import { getArtworksByCategory } from "./artworks";

export const commissionTypes = [
  {
    id: "portrait",
    title: { en: "portraits", ru: "портреты" },
    shortTitle: { en: "portraits", ru: "портреты" },
    description: {
      en: "digital portraits in my personal style",
      ru: "цифровые портреты в моем личном стиле",
    },
    price: { usd: 30, rub: 2000 },
    startingPriceText: {
      en: "starting from $30",
      ru: "от 2 000₽",
    },
    tabLabel: { en: "portrait", ru: "портрет" },
    revisions: "2+",
    deliveryFormats: ["png", "jpeg"],
    included: {
      en: ["high-quality png", "process updates", "at least 2 revisions"],
      ru: ["png в высоком качестве", "обновления по процессу", "минимум 2 правки"],
    },
    supportPoints: {
      en: [
        "includes sketch approval before final",
        "good for icons, gifts, or personal pieces",
      ],
      ru: [
        "включает утверждение скетча перед финалом",
        "подходит для иконок, подарков или личных работ",
      ],
    },
    exampleImage: getArtworksByCategory("portraits")[0]?.imageSrc ?? "",
  },
  {
    id: "animal",
    title: { en: "animals", ru: "животные" },
    shortTitle: { en: "animals", ru: "животные" },
    description: {
      en: "animal illustrations in my personal style",
      ru: "иллюстрации животных в моем личном стиле",
    },
    price: { usd: 25, rub: 1500 },
    startingPriceText: {
      en: "starting from $25",
      ru: "от 1 500₽",
    },
    tabLabel: { en: "animal", ru: "животное" },
    revisions: "2+",
    deliveryFormats: ["png", "jpeg"],
    included: {
      en: ["high-quality png", "process updates", "at least 2 revisions"],
      ru: ["png в высоком качестве", "обновления по процессу", "минимум 2 правки"],
    },
    supportPoints: {
      en: ["pets, creatures, or animal studies", "simple background included"],
      ru: ["питомцы, существа или анималистические этюды", "простой фон включен"],
    },
    exampleImage: getArtworksByCategory("animals")[0]?.imageSrc ?? "",
  },
];

export const commissionIntro = {
  statusLabel: { en: "commissions open", ru: "заказы открыты" },
  title: { en: "commissions are open", ru: "заказы открыты" },
  body: {
    en: "i offer digital portraits and animal illustrations in my personal style",
    ru: "я создаю цифровые портреты и иллюстрации животных в моем личном стиле",
  },
  bodyNote: {
    en: "all the important details are listed below",
    ru: "все важные детали указаны ниже",
  },
  smallNote: {
    en: "prices vary depending on type, complexity, and details",
    ru: "цены зависят от типа, сложности и количества деталей",
  },
  button: { en: "order now", ru: "заказать" },
};

export const commissionPricingRows = [
  {
    id: "portraits",
    type: { en: "portraits", ru: "портреты" },
    price: { en: "from $30", ru: "от 2 000 ₽" },
    includes: {
      en: "digital portrait in my personal style",
      ru: "цифровой портрет в моем личном стиле",
    },
    extraNotes: {
      en: "price varies by complexity, pose, and details",
      ru: "цена зависит от сложности, позы и деталей",
    },
  },
  {
    id: "animals",
    type: { en: "animals", ru: "животные" },
    price: { en: "from $25", ru: "от 1 500 ₽" },
    includes: {
      en: "pet or animal illustration in my personal style",
      ru: "иллюстрация питомца или животного в моем личном стиле",
    },
    extraNotes: {
      en: "detailed markings or complex anatomy may affect price",
      ru: "детальные отметины или сложная анатомия могут влиять на цену",
    },
  },
  {
    id: "colored-sketches",
    type: { en: "colored sketches", ru: "цветные скетчи" },
    price: { en: "from $10", ru: "от 800 ₽" },
    includes: {
      en: "loose colored sketch with simple rendering",
      ru: "свободный цветной скетч с простой прорисовкой",
    },
    extraNotes: {
      en: "best for quick ideas or smaller requests",
      ru: "лучше всего подходит для быстрых идей и небольших запросов",
    },
  },
  {
    id: "extra-character",
    type: { en: "extra character", ru: "дополнительный персонаж" },
    price: { en: "+$20+", ru: "+1 800 ₽+" },
    includes: {
      en: "additional person or animal in the same piece",
      ru: "дополнительный человек или животное в одной работе",
    },
    extraNotes: {
      en: "depends on interaction and complexity",
      ru: "зависит от взаимодействия и сложности",
    },
  },
  {
    id: "complex-background",
    type: { en: "complex background", ru: "сложный фон" },
    price: { en: "+$15", ru: "+1 500 ₽" },
    includes: {
      en: "detailed scene, props, or environment elements",
      ru: "детальная сцена, реквизит или элементы окружения",
    },
    extraNotes: {
      en: "simple background is included by default",
      ru: "простой фон включен по умолчанию",
    },
  },
  {
    id: "rush-order",
    type: { en: "rush order", ru: "срочный заказ" },
    price: { en: "+$10+", ru: "+800 ₽+" },
    includes: {
      en: "faster turnaround when available",
      ru: "более быстрый срок выполнения при наличии возможности",
    },
    extraNotes: {
      en: "must be discussed before payment",
      ru: "нужно обсудить до оплаты",
    },
  },
  {
    id: "commercial-use",
    type: { en: "commercial use", ru: "коммерческое использование" },
    price: { en: "+$150+", ru: "+10 000 ₽+" },
    includes: {
      en: "permission for business or commercial usage",
      ru: "разрешение на бизнес- или коммерческое использование",
    },
    extraNotes: {
      en: "must be agreed in writing before use",
      ru: "должно быть согласовано письменно до использования",
    },
  },
];

export const commissionExpectations = [
  {
    id: "expectation-01",
    label: { en: "expectation 01", ru: "ожидание 01" },
    title: { en: "digital artwork only", ru: "только цифровой формат" },
    copy: {
      en: "you are purchasing a digital png file - no physical prints will be shipped. in special cases, i can provide other non-layered formats, such as tiff or jpeg, upon request.",
      ru: "вы приобретаете цифровой png-файл - физические отпечатки не отправляются. в отдельных случаях по запросу я могу предоставить другие неслоистые форматы, например tiff или jpeg.",
    },
  },
  {
    id: "expectation-02",
    label: { en: "expectation 02", ru: "ожидание 02" },
    title: { en: "communication and process", ru: "коммуникация и процесс" },
    copy: {
      en: "commissions can be discussed via email, discord, or telegram, whichever is most convenient for you. the standard turnaround time is 1 to 3 weeks, depending on complexity and revisions. i will update you at key stages: initial sketch, base colors, pre-final piece, and final artwork. i do not move forward to the next stage without approval of the previous one.",
      ru: "заказ можно обсудить через email, discord или telegram - как вам удобнее. стандартный срок выполнения составляет от 1 до 3 недель в зависимости от сложности и правок. я обновляю вас на ключевых этапах: первичный скетч, базовые цвета, предфинальная версия и финальная работа. я не перехожу к следующему этапу без подтверждения предыдущего.",
    },
  },
  {
    id: "expectation-03",
    label: { en: "expectation 03", ru: "ожидание 03" },
    title: { en: "revisions and adjustments", ru: "правки и корректировки" },
    copy: {
      en: "the price includes at least two revisions, though i usually allow three to four to make sure the result feels right. all adjustments before final approval are included in the price. major changes after final approval may require an additional fee.",
      ru: "в стоимость входит минимум две правки, но обычно я даю три-четыре, чтобы результат получился точным. все корректировки до финального утверждения включены в цену. крупные изменения после финального утверждения могут оплачиваться отдельно.",
    },
  },
  {
    id: "expectation-04",
    label: { en: "expectation 04", ru: "ожидание 04" },
    title: { en: "backgrounds and additional costs", ru: "фоны и дополнительные расходы" },
    copy: {
      en: "a simple background is included in the base price. more complex backgrounds, detailed scenes, or intricate elements require an additional fee. rush orders with strict deadlines require an extra charge.",
      ru: "простой фон входит в базовую стоимость. более сложные фоны, детальные сцены или сложные элементы оплачиваются отдельно. срочные заказы с жесткими дедлайнами требуют доплаты.",
    },
  },
];

export const commissionProcess = [
  {
    step: 1,
    title: { en: "request and discussion", ru: "запрос и обсуждение" },
    body: {
      en: "you send me your idea, references, and any important details.",
      ru: "вы отправляете мне вашу идею, референсы и все важные детали.",
    },
  },
  {
    step: 2,
    title: { en: "approval and payment", ru: "утверждение и оплата" },
    body: {
      en: "once all details are agreed on, full payment is required before moving forward.",
      ru: "после согласования всех деталей требуется полная оплата до начала работы.",
    },
  },
  {
    step: 3,
    title: { en: "process and revisions", ru: "процесс и правки" },
    body: {
      en: "i work on the piece while sending regular updates. this stage includes ~3 revisions and ongoing communication to keep the result as close to your vision as possible.",
      ru: "я работаю над иллюстрацией и регулярно отправляю обновления. этап включает ~3 правки и постоянную коммуникацию, чтобы результат максимально соответствовал вашему видению.",
    },
  },
  {
    step: 4,
    title: { en: "final piece", ru: "финальная работа" },
    body: {
      en: "i complete the artwork and send you the final files.",
      ru: "я завершаю работу и отправляю вам финальные файлы.",
    },
  },
];

export const whatToExpect = [
  {
    id: "communication",
    short: { en: "regular updates and clear communication", ru: "регулярные апдейты и понятное общение" },
    long:  {
      en: "i’ll keep you in the loop while the piece develops",
      ru: "я буду показывать, как работа развивается в процессе",
    },
  },
  {
    id: "payment",
    short: { en: "sketches + revisions before the final piece", ru: "скетч и правки до финальной работы" },
    long:  {
      en: "you’ll see the direction early, before everything is finalized",
      ru: "ты увидишь направление заранее, пока всё ещё можно поправить",
    },
  },
  {
    id: "revisions",
    short: { en: "full payment upfront", ru: "полная оплата заранее" },
    long:  {
      en: "payment is completed after we agree on the idea and price",
      ru: "оплата происходит после того, как мы согласуем идею и цену",
    },
  },
  {
    id: "turnaround",
    short: { en: "finished within ~2 weeks", ru: "готово примерно за ~2 недели" },
    long:  {
      en: "timing depends on complexity, but i’ll tell you before we start",
      ru: "срок зависит от сложности, но я скажу его до начала работы",
    },
  },
];

export const commissionStatus = {
  open: true,
  label: { en: "commissions open", ru: "заказы открыты" },
};

export const commissionTerms = {
  label: { en: "important", ru: "важно" },
  title: { en: "terms and conditions", ru: "условия и положения" },
  groups: [
    {
      id: "copyright",
      title: { en: "copyright", ru: "авторское право" },
      items: [
        {
          en: "i retain full copyright to the artwork.",
          ru: "я сохраняю полное авторское право на работу.",
        },
        {
          en: "my watermark/signature must not be removed.",
          ru: "мой водяной знак/подпись нельзя удалять.",
        },
        {
          en: "the client may not alter, edit, or modify the artwork without my permission.",
          ru: "клиент не может изменять или редактировать работу без моего разрешения.",
        },
        {
          en: "the artwork may not be claimed as your own, resold, or used for commercial purposes without written consent.",
          ru: "работу нельзя выдавать за свою, перепродавать или использовать в коммерческих целях без письменного согласия.",
        },
      ],
    },
    {
      id: "payment",
      title: { en: "payment", ru: "оплата" },
      items: [
        {
          en: "full payment is required upfront before i begin working on the commission.",
          ru: "полная оплата требуется заранее до начала работы над заказом.",
        },
        {
          en: "no refunds will be issued once work has started.",
          ru: "после начала работы возвраты не производятся.",
        },
        {
          en: "additional charges may apply if major revisions are requested after the final piece has been delivered.",
          ru: "при крупных правках после передачи финальной работы может потребоваться доплата.",
        },
      ],
    },
  ],
  agreement: {
    en: "by commissioning me, you agree to these terms.",
    ru: "оформляя заказ, вы соглашаетесь с этими условиями.",
  },
};

export const commissionFaq = [
  {
    id: "faq-format",
    question: {
      en: "what file format do you provide?",
      ru: "в каком формате вы отправляете файлы?",
    },
    answer: {
      en: "i provide a high-quality png file by default. other non-layered formats, such as tiff or jpeg, can be provided upon request.",
      ru: "по умолчанию я отправляю png в высоком качестве. по запросу могу предоставить другие неслоистые форматы, например tiff или jpeg.",
    },
  },
  {
    id: "faq-commercial",
    question: {
      en: "is commercial use allowed?",
      ru: "разрешено ли коммерческое использование?",
    },
    answer: {
      en: "by default, commissions are for personal use only. commercial use must be discussed beforehand and will require additional fees.",
      ru: "по умолчанию заказы предназначены только для личного использования. коммерческое использование обсуждается заранее и требует доплаты.",
    },
  },
  {
    id: "faq-satisfaction",
    question: {
      en: "what if i'm not satisfied with the final piece?",
      ru: "что делать, если итоговая работа не устраивает?",
    },
    answer: {
      en: "since you are involved at every stage of the process, major dissatisfaction is unlikely. minor adjustments can be made before final approval. major revisions after final approval may require additional charges.",
      ru: "так как вы вовлечены на каждом этапе процесса, серьезное недовольство маловероятно. мелкие корректировки можно внести до финального утверждения. крупные правки после финального утверждения могут требовать доплаты.",
    },
  },
  {
    id: "faq-refunds",
    question: { en: "do you offer refunds?", ru: "есть ли возвраты?" },
    answer: {
      en: "no refunds will be issued once i have started working on the piece.",
      ru: "после начала работы над заказом возвраты не производятся.",
    },
  },
  {
    id: "faq-deadline",
    question: {
      en: "do you accept commissions with strict deadlines?",
      ru: "принимаете ли вы заказы с жестким дедлайном?",
    },
    answer: {
      en: "i generally do not take commissions with hard deadlines. in some cases, rush orders may be accepted for an additional fee.",
      ru: "обычно я не беру заказы с жесткими дедлайнами. в некоторых случаях возможен срочный заказ за дополнительную оплату.",
    },
  },
];

export const commissionRequestFormContent = {
  title: {
    en: "send your commission request",
    ru: "отправьте запрос на заказ",
  },
  intro: {
    en: "send me the details of your idea and i'll get back to you as soon as possible.",
    ru: "отправьте детали вашей идеи, и я свяжусь с вами как можно скорее.",
  },
  labels: {
    name: { en: "name", ru: "имя" },
    email: { en: "email", ru: "email" },
    handle: {
      en: "telegram or discord (optional)",
      ru: "telegram или discord (необязательно)",
    },
    preferredContact: {
      en: "preferred contact method",
      ru: "предпочтительный способ связи",
    },
    commissionType: { en: "commission type", ru: "тип заказа" },
    description: { en: "description", ru: "описание" },
    references: { en: "references", ru: "референсы" },
    terms: {
      en: "i have read and agree to the terms and conditions",
      ru: "я прочитал(а) и согласен(на) с условиями и положениями",
    },
  },
  placeholders: {
    description: {
      en: "describe your idea, pose, mood, details, or anything important for the piece",
      ru: "опишите идею, позу, настроение, детали и все важное для работы",
    },
    references: {
      en: "links to images, pinterest boards, or anything visual",
      ru: "ссылки на изображения, доски pinterest или любые визуальные материалы",
    },
  },
  options: {
    preferredContact: [
      { value: "email", label: { en: "email", ru: "email" } },
      { value: "telegram", label: { en: "telegram", ru: "telegram" } },
      { value: "discord", label: { en: "discord", ru: "discord" } },
    ],
    commissionType: [
      { value: "portrait", label: { en: "portrait", ru: "портрет" } },
      { value: "animal", label: { en: "animal", ru: "животное" } },
    ],
  },
  submit: { en: "send request", ru: "отправить заявку" },
  success: {
    en: "your request has been sent. i'll get back to you soon.",
    ru: "ваша заявка отправлена. скоро я свяжусь с вами.",
  },
  error: {
    en: "could not submit right now. please try again later.",
    ru: "сейчас не удалось отправить заявку. попробуйте позже.",
  },
  requiredError: {
    en: "please fill all required fields.",
    ru: "пожалуйста, заполните все обязательные поля.",
  },
  termsError: {
    en: "please agree to the terms and conditions before submitting.",
    ru: "пожалуйста, подтвердите согласие с условиями перед отправкой.",
  },
  note: {
    en: "if it's urgent, feel free to contact me on telegram.",
    ru: "если срочно, можете написать мне в telegram.",
  },
  fastNote: { en: "telegram is fastest", ru: "telegram отвечает быстрее" },
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
    const preferredPaths = [
      "images/animals/doggo_comm",
      "images/animals/silly_birb",
      "images/animals/layin_kitten?updatedAt=1777912292067",
    ];
    const animals = getArtworksByCategory("animals");
    const previews = preferredPaths
      .map((path) => animals.find((artwork) => artwork.path === path))
      .filter(Boolean);
    return previews.length > 0 ? previews : animals.slice(0, 3);
  }
  return [];
}
