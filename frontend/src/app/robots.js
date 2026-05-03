const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

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
