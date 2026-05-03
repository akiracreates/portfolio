import { SpinPage } from "@/components/pages/spin-page";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function Page({ params }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return <SpinPage dict={dict} locale={locale} />;
}
