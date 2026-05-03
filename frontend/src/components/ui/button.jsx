import Link from "next/link";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full border-2 font-semibold tracking-wide transition-[transform,box-shadow,background-color,border-color,color] duration-[var(--duration-base)] ease-[cubic-bezier(0.22,1,0.36,1)] disabled:pointer-events-none disabled:opacity-45 disabled:shadow-none";

const dashedPrimary =
  `${base} border-dashed border-primary bg-primary/10 text-primary shadow-sm hover:-translate-y-0.5 hover:bg-primary/16 hover:shadow-[0_6px_22px_color-mix(in_srgb,var(--accent-pop)_32%,transparent)] active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`;

const variants = {
  /** dashed neon-outline pill — main CTAs */
  primary: dashedPrimary,
  /** explicit alias for the dashed pill */
  dashedPill: dashedPrimary,
  secondary: `${base} border-dashed border-secondary/75 bg-secondary/14 text-text-primary hover:-translate-y-0.5 hover:border-secondary hover:bg-secondary/22 hover:shadow-md active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary`,
  ghost: `${base} border-transparent bg-transparent text-text-secondary hover:-translate-y-0.5 hover:border-dashed hover:border-primary/40 hover:bg-primary/8 hover:text-primary active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`,
  /** solid accent — loud actions */
  accent: `${base} border-solid border-primary bg-primary text-bg-base shadow-md hover:-translate-y-0.5 hover:brightness-105 hover:shadow-[0_8px_28px_color-mix(in_srgb,var(--accent-pop)_42%,transparent)] active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`,
};

const sizes = {
  sm: "px-3.5 py-1.5 text-xs min-h-[2.25rem]",
  md: "px-5 py-2 text-sm min-h-[2.5rem]",
  lg: "px-6 py-2.5 text-sm min-h-[2.75rem]",
};

export function Button({
  as = "button",
  href,
  variant = "primary",
  size = "md",
  children,
  className = "",
  disabled = false,
  loading = false,
  ...props
}) {
  const busy = loading || disabled;
  const classes =
    `${variants[variant] ?? variants.primary} ${sizes[size] ?? sizes.md} ${className}`.trim();

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
    <button className={classes} disabled={busy} aria-busy={loading || undefined} {...props}>
      {loading ? spinner : null}
      {children}
    </button>
  );
}
