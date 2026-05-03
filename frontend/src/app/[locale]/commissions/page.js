import { CommissionsPage } from "@/components/pages/commissions-page";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export default async function Page({ params }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return <CommissionsPage dict={dict} locale={locale} />;
}
