import { Mali, Nunito } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/content/site-config";
import { SiteFrame } from "@/components/layout/site-frame";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { PageTransition } from "@/components/motion/page-transition";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const mali = Mali({
  variable: "--font-mali",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
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
    <html lang="en" className={`${nunito.variable} ${mali.variable}`}>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:border-2 focus:border-dashed focus:border-primary focus:bg-surface-card focus:px-4 focus:py-2 focus:text-sm focus:text-primary"
        >
          skip to content
        </a>
        <SiteFrame>
          <SidebarNav items={siteConfig.navItems} />
          <div
            id="main-content"
            className="content-area pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0"
          >
            <PageTransition>{children}</PageTransition>
          </div>
        </SiteFrame>
      </body>
    </html>
  );
}
