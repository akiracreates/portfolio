import { AboutPage } from "@/components/pages/about-page";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export default async function Page({ params }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return <AboutPage dict={dict} locale={locale} />;
}
