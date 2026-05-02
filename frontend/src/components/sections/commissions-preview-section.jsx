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
      <div className="grid gap-3 md:grid-cols-2">
        {commissionOfferings.map((item) => (
          <article key={item.id} className="inner-card space-y-2 p-3">
            <h3 className="text-sm font-medium">{item.title}</h3>
            <p className="text-xs leading-5 text-text-muted">{item.description}</p>
            <p className="text-[0.7rem] text-text-dim">pricing: {item.pricePlaceholder}</p>
            <p className="text-[0.7rem] text-text-dim">timeline: {item.timelinePlaceholder}</p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
