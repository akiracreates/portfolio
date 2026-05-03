const variants = {
  neutral:
    "border border-border-default bg-bg-surface text-text-secondary",
  accent:
    "border border-transparent bg-accent-soft text-accent",
  highlight:
    "border border-transparent bg-highlight-soft text-highlight",
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
      className={`inline-flex items-center gap-1.5 rounded-full font-medium tracking-wide ${
        variants[variant] ?? variants.neutral
      } ${sizes[size] ?? sizes.sm} ${className}`.trim()}
      {...props}
    >
      {children}
    </span>
  );
}
