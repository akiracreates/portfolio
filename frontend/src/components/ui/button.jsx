import Link from "next/link";

const base =
  "inline-flex items-center justify-center font-medium tracking-wide transition-all duration-[var(--duration-base)] rounded-[var(--radius-md)]";

const variants = {
  primary: `${base} border border-secondary bg-secondary text-bg-base hover:brightness-110 hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(240,175,129,0.3)]`,
  secondary: `${base} border border-border-default bg-bg-surface text-text-primary hover:border-primary hover:text-primary hover:-translate-y-0.5`,
  ghost: `${base} border border-transparent text-text-secondary hover:text-text-primary hover:bg-bg-surface-hover`,
  accent: `${base} border border-primary bg-primary text-bg-base hover:brightness-110 hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(178,106,143,0.3)]`,
};

const sizes = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-2.5 text-sm",
};

export function Button({
  as = "button",
  href,
  variant = "primary",
  size = "md",
  children,
  className = "",
  disabled = false,
  ...props
}) {
  const classes = `${variants[variant] ?? variants.primary} ${sizes[size] ?? sizes.md} ${disabled ? "opacity-50 pointer-events-none" : ""} ${className}`.trim();

  if (as === "link" && href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
