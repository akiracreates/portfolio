export const siteConfig = {
  name: "akira",
  title: "akira | digital portrait artist",
  description:
    "akira's digital art portfolio — portraits, animals, still life, and commission flow.",
  shortBio:
    "digital portrait artist working in soft, intimate palettes. taking commissions for portraits, pets, and still life.",
};

export const navGroups = [
  {
    id: "main",
    label: "main",
    items: [
      { id: "home", label: "home", href: "/" },
      { id: "about", label: "about", href: "/about" },
      { id: "portfolio", label: "portfolio", href: "/portfolio" },
      { id: "commissions", label: "commissions", href: "/commissions" },
      { id: "contact", label: "contact", href: "/contact" },
    ],
  },
  {
    id: "info",
    label: "info",
    items: [
      { id: "terms", label: "terms", href: "/terms" },
      { id: "privacy", label: "privacy", href: "/privacy" },
    ],
  },
];

/** Flat list — useful for footer/sitemap. */
export const allNavItems = navGroups.flatMap((g) => g.items);
