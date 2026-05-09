"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { pickLocale } from "@/lib/i18n/config";
import { Button } from "@/components/ui/button";

const SIZE = 320;
const RADIUS = SIZE / 2;
const SPIN_DURATION_MS = 5200;
const SPIN_EASING = "cubic-bezier(0.12, 0.85, 0.15, 1)";

function polarToCartesian(cx, cy, r, angleDeg) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function describeArc(cx, cy, r, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArc = endAngle - startAngle <= 180 ? "0" : "1";
  return [
    `M ${cx} ${cy}`,
    `L ${start.x} ${start.y}`,
    `A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`,
    "Z",
  ].join(" ");
}

/**
 * Visual spin wheel. User taps "spin!!" to run a weighted spin; onResult fires
 * when the animation completes. Reduced motion: near-instant resolve.
 */
export function SpinWheel({
  rewards,
  targetIndex,
  locale,
  spinningLabel,
  spinButtonLabel,
  onResult,
}) {
  const reduced = useReducedMotion();
  const onResultRef = useRef(onResult);
  const pendingWinnerRef = useRef(null);
  const [phase, setPhase] = useState("ready"); // 'ready' | 'spinning'
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef(null);
  const segments = rewards;
  const sliceAngle = 360 / segments.length;
  const colors = useMemo(
    () => segments.map((s) => s.color || "#6554AF"),
    [segments],
  );

  useEffect(() => {
    onResultRef.current = onResult;
  }, [onResult]);

  const startSpin = useCallback(() => {
    if (phase !== "ready" || segments.length === 0) return;

    const winnerIndex =
      Number.isInteger(targetIndex) && targetIndex >= 0 && targetIndex < segments.length
        ? targetIndex
        : 0;
    const winner = segments[winnerIndex];
    if (!winner || winnerIndex < 0) return;

    pendingWinnerRef.current = winner;
    const step = 360 / segments.length;
    const targetAngle = winnerIndex * step + step / 2;
    const turns = 5;

    setRotation((prev) => {
      const m = ((targetAngle + prev) % 360 + 360) % 360;
      const align = m === 0 ? 360 : 360 - m;
      const delta = turns * 360 + align;
      return prev + delta;
    });
    setPhase("spinning");

    if (reduced) {
      window.setTimeout(() => {
        onResultRef.current(winner);
      }, 80);
    }
  }, [phase, reduced, segments, targetIndex]);

  useEffect(() => {
    if (phase !== "spinning" || reduced) return undefined;

    const el = wheelRef.current;
    const winner = pendingWinnerRef.current;
    if (!el || !winner) return undefined;

    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      onResultRef.current(winner);
    };

    const onTransitionEnd = (event) => {
      if (event.propertyName !== "transform") return;
      el.removeEventListener("transitionend", onTransitionEnd);
      window.clearTimeout(fallbackId);
      finish();
    };

    el.addEventListener("transitionend", onTransitionEnd);
    const fallbackId = window.setTimeout(() => {
      el.removeEventListener("transitionend", onTransitionEnd);
      finish();
    }, SPIN_DURATION_MS + 250);

    return () => {
      el.removeEventListener("transitionend", onTransitionEnd);
      window.clearTimeout(fallbackId);
    };
  }, [phase, reduced]);

  return (
    <div className="flex flex-col items-center gap-6">
      <div
        className="spin-wheel-shell relative rounded-[18px] p-4"
        style={{ width: SIZE + 32, height: SIZE + 32 }}
        aria-live="polite"
        aria-busy={phase === "spinning"}
      >
        {/* pointer */}
        <span
          className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1"
          aria-hidden
        >
          <svg width="22" height="20" viewBox="0 0 22 20" fill="none">
            <path
              d="M11 19 1 1h20Z"
              fill="var(--highlight)"
              stroke="var(--bg-app)"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <svg
          ref={wheelRef}
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="drop-shadow-[0_14px_24px_rgba(10,8,14,0.32)]"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: reduced
              ? "none"
              : `transform ${SPIN_DURATION_MS}ms ${SPIN_EASING}`,
          }}
          aria-label="spin wheel"
        >
          {segments.map((seg, i) => {
            const startAngle = i * sliceAngle;
            const endAngle = startAngle + sliceAngle;
            const path = describeArc(
              RADIUS,
              RADIUS,
              RADIUS - 2,
              startAngle,
              endAngle,
            );
            const labelAngle = startAngle + sliceAngle / 2;
            const labelPos = polarToCartesian(
              RADIUS,
              RADIUS,
              RADIUS * 0.62,
              labelAngle,
            );
            const text = pickLocale(seg.short, locale);
            return (
              <g key={seg.id}>
                <path
                  d={path}
                  fill={colors[i]}
                  stroke="var(--bg-app)"
                  strokeWidth="1.5"
                />
                <text
                  x={labelPos.x}
                  y={labelPos.y}
                  fill="var(--text-on-accent)"
                  fontSize="11"
                  fontWeight="600"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{
                    transform: `rotate(${labelAngle}deg)`,
                    transformOrigin: `${labelPos.x}px ${labelPos.y}px`,
                  }}
                >
                  {text}
                </text>
              </g>
            );
          })}
          {/* center cap */}
          <circle
            cx={RADIUS}
            cy={RADIUS}
            r={28}
            fill="var(--bg-surface)"
            stroke="var(--border-strong)"
          />
          <circle cx={RADIUS} cy={RADIUS} r={6} fill="var(--highlight)" />
        </svg>
      </div>

      {phase === "ready" && (
        <Button
          type="button"
          variant="primary"
          size="lg"
          onClick={startSpin}
          className="min-w-[9rem] font-semibold tracking-wide"
        >
          {spinButtonLabel}
        </Button>
      )}

      {phase === "spinning" && (
        <p className="caption text-text-secondary">{spinningLabel}</p>
      )}
    </div>
  );
}
