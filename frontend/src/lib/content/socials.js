export const socialLinks = [
  {
    id: "telegram-personal",
    url: "https://t.me/akira_placeholder",
    label: "telegram personal",
    handle: "@akira",
    primary: true,
  },
  {
    id: "telegram-channel",
    url: "https://t.me/akira_channel_placeholder",
    label: "telegram channel",
    handle: "@akira_channel",
  },
  {
    id: "vk",
    url: "https://vk.com/akira_placeholder",
    label: "vk",
    handle: "/akira",
  },
  {
    id: "cara",
    url: "https://cara.app/akira_placeholder",
    label: "cara",
    handle: "/akira",
  },
  {
    id: "patreon",
    url: "https://patreon.com/akira_placeholder",
    label: "patreon",
    handle: "/akira",
  },
  {
    id: "email",
    url: "mailto:hello@example.com",
    label: "email",
    handle: "hello@example.com",
  },
];

export const primarySocial = socialLinks.find((s) => s.primary) ?? socialLinks[0];
