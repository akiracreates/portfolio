import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { LocaleProvider } from "@/components/i18n/locale-provider";
import { JsonLdGraph } from "@/components/seo/json-ld-graph";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isLocale, locales } from "@/lib/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return (
    <LocaleProvider locale={locale} dict={dict}>
      <JsonLdGraph locale={locale} />
      <AppShell>{children}</AppShell>
    </LocaleProvider>
  );
}
