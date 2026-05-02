import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/content/site-config";
import { SiteFrame } from "@/components/layout/site-frame";
import { SidebarNav } from "@/components/layout/sidebar-nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable}`}
    >
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-secondary focus:px-4 focus:py-2 focus:text-bg-base focus:text-sm"
        >
          skip to content
        </a>
        <SiteFrame>
          <SidebarNav items={siteConfig.navItems} />
          <div id="main-content" className="content-area pb-16 md:pb-0">
            {children}
          </div>
        </SiteFrame>
      </body>
    </html>
  );
}
