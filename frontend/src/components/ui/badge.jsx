const variants = {
  neutral:
    "border border-dashed border-border-default bg-bg-surface text-text-secondary",
  accent:
    "border border-dashed border-border-purple bg-accent-soft text-accent-2",
  highlight:
    "border border-dashed border-border-accent bg-highlight-soft text-highlight",
};

const sizes = {
  sm: "px-2 py-0.5 text-[0.7rem]",
  md: "px-2.5 py-1 text-xs",
};

export function Badge({
  variant = "neutral",
  size = "sm",
  className = "",
  children,
  ...props
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium ${
        variants[variant] ?? variants.neutral
      } ${sizes[size] ?? sizes.sm} ${className}`.trim()}
      {...props}
    >
      {children}
    </span>
  );
}
