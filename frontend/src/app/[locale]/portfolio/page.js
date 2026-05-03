import { PortfolioPage } from "@/components/pages/portfolio-page";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export default async function Page({ params }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return <PortfolioPage dict={dict} locale={locale} />;
}
