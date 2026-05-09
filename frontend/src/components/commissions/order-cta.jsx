import { Button } from "@/components/ui/button";
import { pickLocale } from "@/lib/i18n/config";

export function OrderCta({ locale = "en", route, text }) {
  return (
    <div className="scrap-note note-surface-warm mx-auto max-w-xl border-[color:var(--border-accent)]/35 bg-[color:var(--bg-note)] p-6 max-sm:px-5 max-sm:py-7 text-center">
      <p className="body-sm text-text-secondary max-sm:leading-relaxed">
        {pickLocale(text?.kicker, locale) || "ready to start?"}
      </p>
      <div className="mt-4 max-sm:mt-5">
        <Button
          as="link"
          href={route}
          variant="primary"
          size="lg"
          className="h-12 w-full min-w-0 max-w-[260px] border-[1.5px] max-sm:max-w-[min(100%,320px)] max-sm:px-6 max-sm:text-base sm:w-auto sm:min-w-[220px]"
        >
          {pickLocale(text?.button, locale) || "order now"}
        </Button>
      </div>
    </div>
  );
}
