/**
 * Clean image container — subtle border, rounded, overflow-hidden.
 * Use with next/image fill — pass aspect/sizing via className or style.
 */
export function ImageFrame({
  className = "",
  children,
  rounded = "lg",
  style,
}) {
  const radiusClass =
    rounded === "md"
      ? "rounded-[var(--radius-md)]"
      : rounded === "xl"
        ? "rounded-[var(--radius-xl)]"
        : rounded === "none"
          ? ""
          : "rounded-[var(--radius-lg)]";

  return (
    <div
      className={`relative overflow-hidden border border-border-subtle bg-bg-inset ${radiusClass} ${className}`.trim()}
      style={style}
    >
      {children}
    </div>
  );
}
