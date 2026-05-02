"use client";

import { useEffect, useState } from "react";
import { SectionShell } from "@/components/ui/section-shell";

const STORAGE_KEY = "akira.spin.v1";

export default function RewardPage() {
  const [reward, setReward] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) setReward(JSON.parse(stored));
    } catch {
      /* ignore */
    }
    setLoaded(true);
  }, []);

  return (
    <div className="content-column space-y-8 py-10 sm:py-14">
      <SectionShell
        id="reward-page"
        eyebrow="reward claim"
        title="your one-time spin result"
        variant="accent"
      >
        <div className="card-inner space-y-4 p-5">
          {!loaded ? (
            <p className="text-xs text-text-tertiary">loading...</p>
          ) : !reward ? (
            <p className="text-sm text-text-secondary">
              no reward found yet. visit the home page and look for the surprise
              section to spin once.
            </p>
          ) : (
            <div className="space-y-3 animate-fade-in">
              <p className="text-sm font-medium text-secondary">
                result: {reward.label}
              </p>
              <p className="text-sm text-text-secondary">
                {reward.description}
              </p>
              <div className="divider-subtle" />
              <p className="text-xs text-text-tertiary">
                {reward.claimInstructions}
              </p>
            </div>
          )}
        </div>
      </SectionShell>
    </div>
  );
}
