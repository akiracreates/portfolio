"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { spinRewards } from "@/lib/content/rewards";

const STORAGE_KEY = "akira.spin.v1";

export function SpinWheel() {
  const [reward, setReward] = useState(null);
  const [state, setState] = useState("loading");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setReward(JSON.parse(stored));
        setState("claimed");
      } else {
        setState("idle");
      }
    } catch {
      setState("idle");
    }
  }, []);

  const onSpin = () => {
    try {
      const existing = window.localStorage.getItem(STORAGE_KEY);
      if (existing) {
        setState("claimed");
        setReward(JSON.parse(existing));
        return;
      }

      setState("spinning");
      const activeRewards = spinRewards.filter((item) => item.active);
      setTimeout(() => {
        const selected =
          activeRewards[Math.floor(Math.random() * activeRewards.length)];
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(selected));
        setReward(selected);
        setState("revealed");
      }, 2200);
    } catch {
      setState("error");
    }
  };

  if (state === "loading") {
    return (
      <div className="card-inner p-5">
        <p className="text-xs text-text-tertiary">loading...</p>
      </div>
    );
  }

  return (
    <div className="card-inner space-y-4 p-5">
      <div className="flex items-center gap-3">
        <span className="label-sm">a little surprise</span>
        <div className="flex-1 divider-subtle" />
      </div>

      <p className="text-xs text-text-secondary">
        one spin per browser. reward is subject to commission terms.
      </p>

      {state === "idle" && (
        <button
          type="button"
          onClick={onSpin}
          className="group relative inline-flex items-center gap-2 rounded-[var(--radius-md)] border border-primary bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-all duration-[var(--duration-base)] hover:bg-primary hover:text-bg-base hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(178,106,143,0.3)]"
          aria-label="spin reward wheel one time"
        >
          <span
            className="inline-block w-4 h-4 rounded-full border-2 border-current border-t-transparent group-hover:animate-spin"
            aria-hidden
          />
          try your luck
        </button>
      )}

      {state === "spinning" && (
        <div className="flex items-center gap-3 py-2">
          <span
            className="inline-block w-5 h-5 rounded-full border-2 border-secondary border-t-transparent"
            style={{
              animation: "spin-wheel 2.2s cubic-bezier(0.2, 0.8, 0.3, 1) forwards",
            }}
            aria-hidden
          />
          <p className="text-sm text-secondary animate-pulse">spinning...</p>
        </div>
      )}

      {state === "revealed" && reward && (
        <div className="space-y-3 animate-fade-in-up">
          <p className="text-sm font-medium text-secondary">
            you unlocked: {reward.label}
          </p>
          <p className="text-xs text-text-secondary">{reward.description}</p>
          <Link
            href="/reward"
            className="inline-flex items-center text-xs text-primary underline underline-offset-2 transition-colors hover:text-secondary"
          >
            view your reward
          </Link>
        </div>
      )}

      {state === "claimed" && reward && (
        <p className="text-xs text-text-tertiary">
          already spun — your result:{" "}
          <span className="text-secondary">{reward.label}</span>.{" "}
          <Link
            href="/reward"
            className="underline underline-offset-2 hover:text-text-primary transition-colors"
          >
            view details
          </Link>
        </p>
      )}

      {state === "error" && (
        <p className="text-xs text-error">
          could not complete spin. please refresh and try once.
        </p>
      )}
    </div>
  );
}
