import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { AppShell } from "@/components/layout/app-shell";
import { NavigationLayer } from "@/components/layout/navigation-layer";
import { LocaleProvider } from "@/components/i18n/locale-provider";
import { JsonLdGraph } from "@/components/seo/json-ld-graph";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isLocale, locales, PATHNAME_REQUEST_HEADER } from "@/lib/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const headerStore = await headers();
  const pathname =
    headerStore.get(PATHNAME_REQUEST_HEADER) ?? `/${locale}`;

  return (
    <LocaleProvider locale={locale} dict={dict}>
      <JsonLdGraph locale={locale} pathname={pathname} />
      <NavigationLayer />
      <AppShell>{children}</AppShell>
    </LocaleProvider>
  );
}
