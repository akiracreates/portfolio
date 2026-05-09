import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { defaultLocale, isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";

/** Soft-404 risk: explicit noindex even when status handling varies by host. */
export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function NotFound() {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value;
  const locale = isLocale(cookieLocale) ? cookieLocale : defaultLocale;
  const dict = await getDictionary(locale);
  const t = dict.notFound;

  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <Eyebrow>{t.eyebrow}</Eyebrow>
      <Heading level="h1" className="mt-4">
        {t.title}
      </Heading>
      <p className="body mt-4 max-w-md">{t.body}</p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button as="link" href={`/${locale}`} variant="secondary" size="md">
          {t.ctaHome}
        </Button>
        <Button as="link" href={`/${locale}/portfolio`} variant="outline" size="md">
          {t.ctaPortfolio}
        </Button>
      </div>
    </Container>
  );
}
