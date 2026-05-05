const variants = {
  default:
    "bg-bg-surface border border-border-subtle",
  raised:
    "bg-bg-surface border border-transparent shadow-md",
  outline:
    "bg-transparent border border-border-default",
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
