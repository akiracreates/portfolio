const variants = {
  default:
    "scrap-card",
  raised:
    "scrap-card shadow-lg",
  warm:
    "scrap-card card-surface-warm",
  outline:
    "border border-dashed border-border-purple/70 bg-bg-inset/40",
};

export function Card({
  variant = "default",
  as: As = "div",
  className = "",
  children,
  ...props
}) {
  return (
    <As
      className={`rounded-[var(--radius-lg)] ${variants[variant] ?? variants.default} ${className}`.trim()}
      {...props}
    >
      {children}
    </As>
  );
}
