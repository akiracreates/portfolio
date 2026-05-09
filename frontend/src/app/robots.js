import { getSiteUrl } from "@/lib/seo/site-url";

const baseUrl = getSiteUrl();

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/en/spin", "/ru/spin"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
