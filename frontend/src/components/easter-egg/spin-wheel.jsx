"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { spinRewards } from "@/lib/content/rewards";

const STORAGE_KEY = "akira.spin.v1";

export function SpinWheel() {
  const [reward, setReward] = useState(null);
  const [state, setState] = useState("loading");

  useEffect(() => {
    queueMicrotask(() => {
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
    });
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
          className="group relative inline-flex min-h-[2.5rem] items-center gap-2 rounded-full border-2 border-dashed border-primary bg-primary/10 px-5 py-2 text-sm font-semibold text-primary transition-all duration-[var(--duration-base)] hover:-translate-y-0.5 hover:border-solid hover:bg-primary hover:text-bg-base hover:shadow-[0_6px_22px_color-mix(in_srgb,var(--accent-pop)_35%,transparent)]"
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
            className="inline-block h-5 w-5 rounded-full border-2 border-primary border-t-transparent"
            style={{
              animation: "spin-wheel 2.2s cubic-bezier(0.2, 0.8, 0.3, 1) forwards",
            }}
            aria-hidden
          />
          <p className="animate-pulse text-sm font-semibold text-primary">spinning...</p>
        </div>
      )}

      {state === "revealed" && reward && (
        <div className="space-y-3 animate-fade-in-up">
          <p className="text-sm font-semibold text-primary">
            you unlocked: {reward.label}
          </p>
          <p className="text-xs text-text-secondary">{reward.description}</p>
          <Link
            href="/reward"
            className="inline-flex items-center text-xs font-semibold text-primary underline decoration-dashed underline-offset-4 transition-colors hover:text-secondary"
          >
            view your reward
          </Link>
        </div>
      )}

      {state === "claimed" && reward && (
        <p className="text-xs text-text-tertiary">
          already spun — your result:{" "}
          <span className="font-semibold text-primary">{reward.label}</span>.{" "}
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
