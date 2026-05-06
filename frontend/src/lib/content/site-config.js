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
    {
      id: "about",
      icon: "about",
      href: "/about",
      labelKey: "nav.about",
      sections: [
        { id: "about-started", anchor: "about-started", labelKey: "nav.aboutStarted" },
        { id: "about-digital", anchor: "about-digital", labelKey: "nav.aboutDigital" },
        { id: "about-timeline", anchor: "about-timeline", labelKey: "nav.aboutTimeline" },
        { id: "about-ups-downs", anchor: "about-ups-downs", labelKey: "nav.aboutUpsDowns" },
        { id: "about-now", anchor: "about-now", labelKey: "nav.aboutNow" },
      ],
    },
    { id: "portfolio", icon: "portfolio",   href: "/portfolio",   labelKey: "nav.portfolio" },
    {
      id: "work",
      icon: "commissions",
      href: "/commissions",
      labelKey: "nav.work",
      sections: [
        { id: "work-intro", anchor: "commissions", labelKey: "nav.workIntro" },
        { id: "work-offers", anchor: "offers", labelKey: "nav.workOffers" },
        { id: "work-prices", anchor: "prices", labelKey: "nav.workPrices" },
        { id: "work-expect", anchor: "expect", labelKey: "nav.workExpect" },
        { id: "work-process", anchor: "process", labelKey: "nav.workProcess" },
        { id: "work-delivery", anchor: "delivery", labelKey: "nav.workDelivery" },
        { id: "work-terms", anchor: "terms", labelKey: "nav.workTerms" },
        { id: "work-order", anchor: "order", labelKey: "nav.workOrder" },
        { id: "work-faq", anchor: "faq", labelKey: "nav.workFaq" },
        { id: "work-contact", anchor: "contact-alt", labelKey: "nav.workContact" },
      ],
    },
  ],
};

/** Flat list of full pages — useful for footer/sitemap. */
export const allPages = navStructure.pages.map((p) => ({
  id: p.id,
  href: p.href,
  labelKey: p.labelKey,
}));
