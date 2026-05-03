/**
 * Terms grouped per spec. Each group has a heading and a list of bullet items.
 * All copy is locale-aware ({ en, ru }).
 */

export const termsGroups = [
  {
    id: "payment",
    heading: { en: "payment", ru: "оплата" },
    items: [
      {
        en: "full payment is collected up front before the sketch begins.",
        ru: "полная оплата собирается заранее до начала наброска.",
      },
      {
        en: "preferred methods: bank transfer (rub) or paypal/stripe (usd).",
        ru: "предпочтительные способы: банковский перевод (rub) или paypal/stripe (usd).",
      },
      {
        en: "payment confirms your slot in the queue.",
        ru: "оплата подтверждает место в очереди.",
      },
    ],
  },
  {
    id: "refunds",
    heading: { en: "refunds", ru: "возвраты" },
    items: [
      {
        en: "full refund available before the sketch is started.",
        ru: "полный возврат возможен до начала наброска.",
      },
      {
        en: "partial refund possible during the sketch stage.",
        ru: "частичный возврат возможен на этапе наброска.",
      },
      {
        en: "no refunds once the painting stage has begun.",
        ru: "возврат невозможен после начала этапа покраски.",
      },
    ],
  },
  {
    id: "revisions",
    heading: { en: "revisions", ru: "правки" },
    items: [
      {
        en: "3 revision rounds included with each commission.",
        ru: "3 раунда правок включены в каждый заказ.",
      },
      {
        en: "additional rounds available for a small fee.",
        ru: "дополнительные правки доступны за небольшую доплату.",
      },
      {
        en: "revisions are limited to the agreed scope.",
        ru: "правки ограничены согласованным объёмом.",
      },
    ],
  },
  {
    id: "deadlines",
    heading: { en: "deadlines & timeline", ru: "сроки" },
    items: [
      {
        en: "typical turnaround is around 2 weeks from sketch approval.",
        ru: "стандартный срок — около 2 недель с момента утверждения наброска.",
      },
      {
        en: "rush requests may be possible — please ask in advance.",
        ru: "срочные заказы возможны — пожалуйста, уточняйте заранее.",
      },
      {
        en: "delays are communicated as early as possible.",
        ru: "о задержках сообщаю как можно раньше.",
      },
    ],
  },
  {
    id: "usage-rights",
    heading: { en: "usage rights", ru: "права на использование" },
    items: [
      {
        en: "personal use of the final image is granted with delivery.",
        ru: "личное использование финальной работы предоставляется с доставкой.",
      },
      {
        en: "commercial usage requires a separate license.",
        ru: "коммерческое использование требует отдельной лицензии.",
      },
      {
        en: "i retain the right to share the work in my portfolio and on socials.",
        ru: "я оставляю за собой право показывать работу в портфолио и соцсетях.",
      },
    ],
  },
  {
    id: "communication",
    heading: { en: "communication", ru: "коммуникация" },
    items: [
      {
        en: "telegram is the preferred channel; email also works.",
        ru: "telegram — предпочтительный канал; email также работает.",
      },
      {
        en: "i reply within 48 hours during weekdays.",
        ru: "отвечаю в течение 48 часов в будни.",
      },
      {
        en: "please be clear about expectations early — it saves time on both sides.",
        ru: "пожалуйста, чётко проговаривайте ожидания заранее — это экономит время обеим сторонам.",
      },
    ],
  },
  {
    id: "delivery",
    heading: { en: "delivery", ru: "доставка" },
    items: [
      {
        en: "delivered as png and jpeg by default.",
        ru: "доставка в png и jpeg по умолчанию.",
      },
      {
        en: "other formats (psd, tiff, layered files) available on request.",
        ru: "другие форматы (psd, tiff, со слоями) — по запросу.",
      },
      {
        en: "files are delivered via download link or your preferred channel.",
        ru: "файлы передаются через ссылку или удобный для вас канал.",
      },
    ],
  },
  {
    id: "client-responsibilities",
    heading: { en: "client responsibilities", ru: "ответственность клиента" },
    items: [
      {
        en: "provide clear references for the piece you want.",
        ru: "предоставьте чёткие референсы для нужной работы.",
      },
      {
        en: "respond to messages and revision requests promptly.",
        ru: "отвечайте на сообщения и просьбы о правках своевременно.",
      },
      {
        en: "respect the agreed scope and timeline.",
        ru: "уважайте согласованный объём и сроки.",
      },
    ],
  },
  {
    id: "wont-draw",
    heading: { en: "what i won't draw", ru: "что я не буду рисовать" },
    items: [
      {
        en: "explicit nsfw / adult content.",
        ru: "откровенный nsfw / контент для взрослых.",
      },
      {
        en: "hateful or discriminatory imagery.",
        ru: "ненавистнический или дискриминационный контент.",
      },
      {
        en: "anything depicting real people without their consent.",
        ru: "любые изображения реальных людей без их согласия.",
      },
    ],
  },
];
