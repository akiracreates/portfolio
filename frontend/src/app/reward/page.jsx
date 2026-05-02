"use client";

import { useState } from "react";
import { PageNav } from "@/components/layout/page-nav";
import { SiteFrame } from "@/components/layout/site-frame";
import { SectionShell } from "@/components/ui/section-shell";

const STORAGE_KEY = "akira.spin.v1";

export default function RewardPage() {
  const [reward] = useState(() => {
    if (typeof window === "undefined") return null;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  return (
    <SiteFrame>
      <main className="w-full p-3 sm:p-4">
        <PageNav />
        <div className="content-column">
        <SectionShell id="reward-page" eyebrow="reward claim" title="your one-time spin result">
          <div className="inner-card space-y-3 p-4">
            {!reward ? (
              <p className="text-sm text-text-muted">no reward found yet. visit home page and use the spin section once.</p>
            ) : (
              <>
                <p className="text-sm text-accent-peach">result: {reward.label}</p>
                <p className="text-sm text-text-muted">{reward.description}</p>
                <p className="text-xs text-text-dim">{reward.claimInstructions}</p>
              </>
            )}
          </div>
        </SectionShell>
        </div>
      </main>
    </SiteFrame>
  );
}
