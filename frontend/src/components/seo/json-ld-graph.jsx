import { siteConfig } from "@/lib/content/site-config";
import { socialLinks } from "@/lib/content/socials";
import { getSiteUrl } from "@/lib/seo/site-url";

export function JsonLdGraph({ locale }) {
  const siteUrl = getSiteUrl();
  const profileUrl = `${siteUrl}/${locale}`;
  const sameAs = socialLinks.map((s) => s.url).filter(Boolean);

  const payload = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${profileUrl}#person`,
        name: siteConfig.name,
        url: profileUrl,
        description: siteConfig.shortBio,
        sameAs,
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: siteConfig.title,
        url: siteUrl,
        description: siteConfig.description,
        inLanguage: locale,
        publisher: { "@id": `${profileUrl}#person` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
