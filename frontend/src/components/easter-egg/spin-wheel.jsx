"use client";

import Link from "next/link";
import { useState } from "react";
import { spinRewards } from "@/lib/content/rewards";

const STORAGE_KEY = "akira.spin.v1";

export function SpinWheel() {
  const [reward, setReward] = useState(() => {
    if (typeof window === "undefined") return null;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [state, setState] = useState(() => (reward ? "claimed" : "idle"));

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
        const selected = activeRewards[Math.floor(Math.random() * activeRewards.length)];
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(selected));
        setReward(selected);
        setState("revealed");
      }, 1200);
    } catch {
      setState("error");
    }
  };

  return (
    <div className="card-frame space-y-4 p-5">
      <p className="text-sm text-text-muted">one spin per browser profile. reward is subject to commission terms.</p>
      {state === "idle" && (
        <button
          type="button"
          onClick={onSpin}
          className="rounded-full bg-accent-rose px-5 py-2 text-sm font-medium text-[#1b1731]"
          aria-label="spin reward wheel one time"
        >
          spin the wheel
        </button>
      )}
      {state === "spinning" && <p className="text-sm text-accent-peach">spinning... please wait</p>}
      {state === "revealed" && reward && (
        <div className="space-y-2 text-sm">
          <p className="text-accent-peach">you unlocked: {reward.label}</p>
          <p className="text-text-muted">{reward.description}</p>
          <Link href="/reward" className="underline underline-offset-2">
            claim on reward page
          </Link>
        </div>
      )}
      {state === "claimed" && reward && (
        <p className="text-sm text-text-muted">already spun. your result: {reward.label}. you can view claim details on reward page.</p>
      )}
      {state === "error" && <p className="text-sm text-error">could not complete spin. please refresh and try once.</p>}
    </div>
  );
}
