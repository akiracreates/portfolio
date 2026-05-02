import Link from "next/link";

const styles = {
  primary:
    "inline-flex items-center justify-center rounded-full border border-transparent bg-accent-peach px-5 py-2.5 text-sm font-medium text-[#1b1731] transition hover:bg-[#f3bc95]",
  secondary:
    "inline-flex items-center justify-center rounded-full border border-border-strong bg-transparent px-5 py-2.5 text-sm font-medium text-text-primary transition hover:border-accent-rose hover:text-accent-rose",
  ghost:
    "inline-flex items-center justify-center rounded-full border border-transparent px-5 py-2.5 text-sm font-medium text-text-muted transition hover:text-text-primary",
};

export function Button({ as = "button", href, variant = "primary", children, className = "", ...props }) {
  const merged = `${styles[variant] ?? styles.primary} ${className}`.trim();

  if (as === "link" && href) {
    return (
      <Link href={href} className={merged} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={merged} {...props}>
      {children}
    </button>
  );
}
