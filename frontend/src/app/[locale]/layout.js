import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { PageTransition } from "@/components/motion/page-transition";
import { LocaleProvider } from "@/components/i18n/locale-provider";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isLocale, locales } from "@/lib/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      type: "website",
    },
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return (
    <LocaleProvider locale={locale} dict={dict}>
      <AppShell>
        <PageTransition>{children}</PageTransition>
      </AppShell>
    </LocaleProvider>
  );
}
