import { Button } from "@/components/ui/button";
import { SectionShell } from "@/components/ui/section-shell";
import { commissionOfferings } from "@/lib/content/commissions";

export function CommissionsPreviewSection() {
  return (
    <SectionShell
      id="commissions-preview"
      eyebrow="work with me"
      title="commission openings are available"
      action={
        <Button as="link" href="/commissions">
          order now
        </Button>
      }
    >
      <div className="flex flex-col gap-4">
        {commissionOfferings.map((item) => (
          <article
            key={item.id}
            className="card-inner space-y-3 p-5 transition-colors duration-[var(--duration-base)] hover:border-primary/50"
          >
            <h3 className="text-sm font-semibold text-primary">
              {item.title}
            </h3>
            <p className="text-xs leading-relaxed text-text-secondary">
              {item.description}
            </p>
            <div className="divider-subtle" />
            <div className="flex flex-wrap gap-4 text-xs text-text-tertiary">
              <span>pricing: {item.pricePlaceholder}</span>
              <span>timeline: {item.timelinePlaceholder}</span>
            </div>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
