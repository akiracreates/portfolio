const variants = {
  default:
    "scrap-card",
  raised:
    "scrap-card shadow-lg",
  outline:
    "border border-dashed border-border-default bg-transparent",
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
