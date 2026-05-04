/**
 * Brand-matched skeleton primitive.
 *
 * Uses site tokens for surfaces. The shimmer is a soft moving gradient
 * (very low contrast, on-brand) and respects prefers-reduced-motion via
 * the keyframe override in globals.css.
 */

const RADII = {
  none: "rounded-none",
  sm: "rounded-[var(--radius-sm)]",
  md: "rounded-[var(--radius-md)]",
  lg: "rounded-[var(--radius-lg)]",
  xl: "rounded-[var(--radius-xl)]",
  pill: "rounded-[var(--radius-pill)]",
  full: "rounded-full",
};

export function Skeleton({
  className = "",
  rounded = "md",
  as: Tag = "div",
  ariaLabel,
  style,
}) {
  const radius = RADII[rounded] ?? RADII.md;
  return (
    <Tag
      className={`relative isolate overflow-hidden bg-bg-surface ${radius} ${className}`.trim()}
      role={ariaLabel ? "status" : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
      data-skeleton
      style={style}
    >
      <span className="skeleton-shimmer pointer-events-none absolute inset-0" />
    </Tag>
  );
}
