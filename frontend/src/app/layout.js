import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { cookies, headers } from "next/headers";
import { Pangolin } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/content/site-config";
import {
  defaultLocale,
  isLocale,
  LOCALE_REQUEST_HEADER,
} from "@/lib/i18n/config";
import { getMetadataBaseUrl } from "@/lib/seo/site-url";

const pangolin = Pangolin({
  variable: "--font-pangolin",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

function imageKitOrigin() {
  const ep =
    process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT ||
    process.env.VITE_IMAGEKIT_URL_ENDPOINT ||
    "";
  try {
    return ep ? new URL(ep).origin : null;
  } catch {
    return null;
  }
}

export const viewport = {
  themeColor: "#6554af",
};

export const metadata = {
  metadataBase: getMetadataBaseUrl(),
  title: {
    default: siteConfig.title,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  appleWebApp: {
    title: siteConfig.name,
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    type: "website",
    siteName: siteConfig.title,
  },
};

export default async function RootLayout({ children }) {
  const headerStore = await headers();
  const pathLocale = headerStore.get(LOCALE_REQUEST_HEADER);
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value;
  const lang = isLocale(pathLocale)
    ? pathLocale
    : isLocale(cookieLocale)
      ? cookieLocale
      : defaultLocale;
  const ikOrigin = imageKitOrigin();

  return (
    <html lang={lang} className={pangolin.variable}>
      <head>
        {ikOrigin ? (
          <>
            <link rel="preconnect" href={ikOrigin} crossOrigin="" />
            <link rel="dns-prefetch" href={ikOrigin} />
          </>
        ) : null}
        <link rel="dns-prefetch" href="https://va.vercel-scripts.com" />
        <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-text-on-accent focus:shadow-md"
        >
          skip to content
        </a>
        {children}
        <div
          id="nav-portal-root"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: 0,
            height: 0,
            zIndex: 2147483647,
            pointerEvents: "none",
            overflow: "visible",
          }}
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
