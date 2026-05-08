import { Button } from "@/components/ui/button";
import { pickLocale } from "@/lib/i18n/config";

export function OrderCta({ locale = "en", route, text }) {
  return (
    <div className="scrap-note note-surface-warm mx-auto max-w-xl border-[color:var(--border-accent)]/35 bg-[color:var(--bg-note)] p-6 text-center">
      <p className="body-sm text-text-secondary">
        {pickLocale(text?.kicker, locale) || "ready to start?"}
      </p>
      <div className="mt-4">
        <Button
          as="link"
          href={route}
          variant="primary"
          size="lg"
          className="h-12 min-w-[220px] border-[1.5px]"
        >
          {pickLocale(text?.button, locale) || "order now"}
        </Button>
      </div>
    </div>
  );
}
