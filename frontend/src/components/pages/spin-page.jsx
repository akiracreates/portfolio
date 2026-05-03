import { SpinExperience } from "@/components/easter-egg/spin-experience";

export function SpinPage({ dict, locale = "en" }) {
  return <SpinExperience dict={dict} locale={locale} />;
}
