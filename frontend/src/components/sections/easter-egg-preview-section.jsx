import { SpinWheel } from "@/components/easter-egg/spin-wheel";
import { SectionShell } from "@/components/ui/section-shell";

export function EasterEggPreviewSection() {
  return (
    <SectionShell id="easter-egg" eyebrow="easter egg" title="a one-time spin for a surprise offer">
      <SpinWheel />
    </SectionShell>
  );
}
