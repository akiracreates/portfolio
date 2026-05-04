export const siteConfig = {
  name: "akira",
  title: "akira | digital portrait artist",
  description:
    "akira's digital art portfolio — portraits, animals, landscapes, still life, and commission flow.",
  shortBio:
    "digital portrait artist working in soft, intimate palettes. taking commissions for portraits, pets, landscapes, and still life.",
};

/**
 * Two-group navigation per spec:
 *  - homepageSections: smooth-scroll anchors on the home page (or navigate-then-scroll from sub-pages)
 *  - pages: full route navigation
 */
export const navStructure = {
  homepageSections: [
    { id: "home",        icon: "home",        anchor: "hero",                labelKey: "nav.home" },
    { id: "featured",    icon: "portfolio",   anchor: "featured",            labelKey: "nav.featured" },
    { id: "commissions", icon: "commissions", anchor: "commissions-preview", labelKey: "nav.commissions" },
  ],
  pages: [
    { id: "about",     icon: "about",       href: "/about",       labelKey: "nav.about" },
    { id: "portfolio", icon: "portfolio",   href: "/portfolio",   labelKey: "nav.portfolio" },
    { id: "work",      icon: "commissions", href: "/commissions", labelKey: "nav.work" },
  ],
};

/** Flat list of full pages — useful for footer/sitemap. */
export const allPages = navStructure.pages.map((p) => ({
  id: p.id,
  href: p.href,
  labelKey: p.labelKey,
}));
