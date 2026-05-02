import { SpinWheel } from "@/components/easter-egg/spin-wheel";
import { SectionShell } from "@/components/ui/section-shell";

export function EasterEggPreviewSection() {
  return (
    <SectionShell
      id="easter-egg"
      eyebrow="secret corner"
      title="you found something hidden"
    >
      <SpinWheel />
    </SectionShell>
  );
}
