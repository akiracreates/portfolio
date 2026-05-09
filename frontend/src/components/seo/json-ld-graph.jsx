import { commissionFaq } from "@/lib/content/commissions";
import { siteConfig } from "@/lib/content/site-config";
import { socialLinks } from "@/lib/content/socials";
import { defaultLocale, pickLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { resolveOgImageForMetadata } from "@/lib/seo/page-metadata";
import { getSiteUrl } from "@/lib/seo/site-url";

function segmentsAfterLocale(pathname, locale) {
  const prefix = `/${locale}`;
  if (!pathname.startsWith(prefix)) return [];
  return pathname.slice(prefix.length).split("/").filter(Boolean);
}

function schemaPageTitle(dict, segments) {
  if (segments.length === 0) return dict.metaPages.home.title;
  const root = segments[0];
  if (root === "about") return dict.metaPages.about.title;
  if (root === "portfolio") return dict.metaPages.portfolio.title;
  if (root === "commissions") {
    if (segments[1] === "request") return dict.metaPages.commissionsRequest.title;
    return dict.metaPages.commissions.title;
  }
  if (root === "spin") return dict.metaPages.spin.title;
  return dict.meta.title;
}

function breadcrumbLabels(locale) {
  return {
    home: locale === "ru" ? "главная" : "Home",
    commissions: locale === "ru" ? "коммишены" : "Commissions",
    request: locale === "ru" ? "запрос" : "Commission request",
  };
}

export async function JsonLdGraph({ locale, pathname }) {
  const siteUrl = getSiteUrl();
  const dict = await getDictionary(locale);
  const personId = `${siteUrl}/#person`;
  const websiteId = `${siteUrl}/#website`;
  const pageUrl = `${siteUrl}${pathname}`;
  const { url: imageUrl, width: imgW, height: imgH } =
    resolveOgImageForMetadata();

  const sameAs = socialLinks.map((s) => s.url).filter(Boolean);
  const publisherPersonUrl = `${siteUrl}/${defaultLocale}`;
  const inLang = locale === "ru" ? "ru-RU" : "en-US";
  const alternateLang = locale === "en" ? "ru-RU" : "en-US";
  const segments = segmentsAfterLocale(pathname, locale);

  const graph = [
    {
      "@type": "Person",
      "@id": personId,
      name: siteConfig.name,
      url: publisherPersonUrl,
      description: siteConfig.shortBio,
      image: {
        "@type": "ImageObject",
        url: imageUrl,
        width: imgW,
        height: imgH,
      },
      sameAs,
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      name: siteConfig.title,
      url: siteUrl,
      description: siteConfig.description,
      inLanguage: [inLang, alternateLang],
      publisher: { "@id": personId },
    },
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: schemaPageTitle(dict, segments),
      isPartOf: { "@id": websiteId },
      inLanguage: inLang,
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: imageUrl,
        width: imgW,
        height: imgH,
      },
    },
  ];

  if (segments[0] === "commissions" && segments[1] === "request") {
    const b = breadcrumbLabels(locale);
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: b.home,
          item: `${siteUrl}/${locale}`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: b.commissions,
          item: `${siteUrl}/${locale}/commissions`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: b.request,
          item: pageUrl,
        },
      ],
    });
  }

  if (segments[0] === "commissions" && segments.length === 1) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: commissionFaq.map((item) => ({
        "@type": "Question",
        name: pickLocale(item.question, locale),
        acceptedAnswer: {
          "@type": "Answer",
          text: pickLocale(item.answer, locale),
        },
      })),
    });
  }

  const payload = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
