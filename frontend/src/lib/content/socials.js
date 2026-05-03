export const socialLinks = [
  {
    id: "telegram",
    url: "https://t.me/akira_placeholder",
    label: "telegram",
    handle: "@akira",
    primary: true,
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
