import { CommissionsPage } from "@/components/pages/commissions-page";

export default async function Page({ params }) {
  const { locale } = await params;
  return <CommissionsPage locale={locale} />;
}
