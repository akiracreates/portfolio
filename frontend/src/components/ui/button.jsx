import Link from "next/link";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] border-[1.5px] border-dashed font-medium shadow-sm transition-[transform,background-color,border-color,color,box-shadow] duration-[var(--duration-base)] ease-[cubic-bezier(0.2,0,0,1)] disabled:pointer-events-none disabled:opacity-45 select-none";

const variants = {
  /** primary CTA — uses the highlight pink. Reserve for ONE per section. */
  primary: `${base} border-highlight bg-highlight text-text-on-highlight hover:bg-highlight-hover hover:-translate-y-[2px] hover:shadow-[0_0_0_3px_rgba(233,102,160,0.16),0_14px_28px_rgba(10,8,14,0.3)] active:translate-y-0`,
  /** secondary CTA — purple accent. Default for most actions. */
  secondary: `${base} border-accent-2 bg-accent text-text-on-accent hover:bg-accent-hover hover:-translate-y-[2px] hover:shadow-[0_0_0_3px_rgba(149,117,222,0.15),0_14px_28px_rgba(10,8,14,0.3)] active:translate-y-0`,
  /** outline — neutral on dark surfaces. */
  outline: `${base} border-border-strong bg-bg-inset/45 text-text-primary hover:border-highlight hover:bg-highlight-soft hover:-translate-y-[1px] hover:text-text-primary hover:shadow-[0_0_0_3px_rgba(233,102,160,0.09)] active:translate-y-0`,
  /** ghost — inline / tertiary actions. */
  ghost: `${base} border-transparent bg-transparent text-text-secondary shadow-none hover:border-border-default hover:bg-bg-surface hover:text-text-primary`,
};

const sizes = {
  sm: "h-9 px-3.5 text-[0.8125rem]",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-5 text-[0.9375rem]",
};

export function Button({
  as = "button",
  href,
  variant = "secondary",
  size = "md",
  children,
  className = "",
  disabled = false,
  loading = false,
  ...props
}) {
  const busy = loading || disabled;
  const classes =
    `${variants[variant] ?? variants.secondary} ${sizes[size] ?? sizes.md} ${className}`.trim();

  const spinner = (
    <span
      className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent opacity-90"
      aria-hidden
    />
  );

  if (as === "link" && href) {
    return (
      <Link href={href} className={classes} {...props}>
        {loading ? spinner : null}
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      disabled={busy}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? spinner : null}
      {children}
    </button>
  );
}
