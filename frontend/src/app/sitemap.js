const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export default function sitemap() {
  const routes = [
    "/",
    "/about",
    "/portfolio",
    "/commissions",
    "/contact",
    "/terms",
    "/privacy",
  ];
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: "weekly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
