export const socialLinks = [
  {
    id: "telegram-personal",
    url: "https://t.me/akiracreates",
    label: "contact me on telegram",
    labelRu: "написать мне в telegram",
    handle: "@akiracreates",
    primary: true,
  },
  {
    id: "telegram-channel",
    url: "https://t.me/akirasartisticmess",
    label: "my telegram channel",
    labelRu: "мой telegram-канал",
    handle: "@akirasartisticmess",
  },
  {
    id: "vk",
    url: "https://vk.ru/akirasartisticmess",
    label: "my (new) vk community",
    labelRu: "моё (новое) vk-сообщество",
    handle: "vk.ru/akirasartisticmess",
  },
  {
    id: "cara",
    url: "https://cara.app/akiracreates",
    label: "full gallery on cara",
    labelRu: "полная галерея на cara",
    handle: "cara.app/akiracreates",
  },
  {
    id: "patreon",
    url: "https://www.patreon.com/akiracreates",
    label: "support on patreon (under construction)",
    labelRu: "поддержка на patreon (в разработке)",
    handle: "patreon.com/akiracreates",
  },
  {
    id: "email",
    url: "mailto:akiracreates.comms@gmail.com",
    label: "email",
    labelRu: "email",
    handle: "akiracreates.comms@gmail.com",
  },
];

export const primarySocial = socialLinks.find((s) => s.primary) ?? socialLinks[0];
