"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { pickLocale } from "@/lib/i18n/config";

const SIZE = 320;
const RADIUS = SIZE / 2;
const SPIN_DURATION_MS = 2500;

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
 * Visual spin wheel. Picks a random reward, spins to it, then calls onResult
 * once the animation completes. CSS transform handles the rotation; reduced
 * motion users get an instant resolve.
 */
export function SpinWheel({ rewards, locale, spinningLabel, onResult }) {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState("idle"); // 'idle' | 'spinning'
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef(null);
  const segments = rewards;
  const sliceAngle = 360 / segments.length;
  const colors = useMemo(
    () => segments.map((s) => s.color || "#6554AF"),
    [segments],
  );

  useEffect(() => {
    if (segments.length === 0) return undefined;

    const winnerIndex = Math.floor(Math.random() * segments.length);
    const winner = segments[winnerIndex];
    const targetAngle = winnerIndex * sliceAngle + sliceAngle / 2;
    const turns = 5;
    const finalRotation = turns * 360 + (360 - targetAngle);

    // Always defer state updates one frame so React 19's
    // "no setState in effect body" lint passes and the CSS transition
    // animates from the current rotation rather than jumping instantly.
    const startId = requestAnimationFrame(() => {
      setRotation(finalRotation);
      setPhase("spinning");
    });

    const settleMs = reduced ? 60 : SPIN_DURATION_MS + 80;
    const tid = window.setTimeout(() => {
      onResult(winner);
    }, settleMs);

    return () => {
      cancelAnimationFrame(startId);
      window.clearTimeout(tid);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center gap-6">
      <div
        className="scrap-note relative p-4"
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
              : `transform ${SPIN_DURATION_MS}ms cubic-bezier(0.16, 1, 0.3, 1)`,
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
                  fontSize="13"
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
          <circle
            cx={RADIUS}
            cy={RADIUS}
            r={6}
            fill="var(--highlight)"
          />
        </svg>
      </div>
      {phase === "spinning" && (
        <p className="caption text-text-secondary">{spinningLabel}</p>
      )}
    </div>
  );
}
