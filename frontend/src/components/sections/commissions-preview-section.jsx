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
      <div className="grid gap-4 md:grid-cols-2">
        {commissionOfferings.map((item) => (
          <article key={item.id} className="card-frame space-y-2 p-4">
            <h3 className="text-base font-medium">{item.title}</h3>
            <p className="text-sm text-text-muted">{item.description}</p>
            <p className="text-xs text-text-dim">pricing: {item.pricePlaceholder}</p>
            <p className="text-xs text-text-dim">timeline: {item.timelinePlaceholder}</p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
