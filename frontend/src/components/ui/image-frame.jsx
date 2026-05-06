/**
 * Artwork container with a controlled handmade frame treatment.
 * Use with next/image fill — pass aspect/sizing via className or style.
 */
export function ImageFrame({
  className = "",
  children,
  rounded = "lg",
  style,
  variant = "art",
  singleFrame = false,
  ...rest
}) {
  const radiusClass =
    rounded === "md"
      ? "rounded-[var(--radius-md)]"
      : rounded === "xl"
        ? "rounded-[var(--radius-xl)]"
        : rounded === "none"
          ? ""
          : "rounded-[var(--radius-lg)]";

  const variantClass =
    variant === "plain"
      ? "border border-border-subtle bg-bg-inset"
      : variant === "featured"
        ? "art-object-frame art-object-featured border"
        : variant === "hero"
          ? "art-object-frame art-object-hero border"
      : "art-object-frame border";

  return (
    <div
      className={`relative overflow-hidden ${variantClass} ${singleFrame ? "single-frame" : ""} ${radiusClass} ${className}`.trim()}
      style={style}
      {...rest}
    >
      {children}
    </div>
  );
}
