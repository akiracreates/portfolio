import Link from "next/link";

const styles = {
  primary:
    "inline-flex items-center justify-center rounded-[0.3rem] border border-[#f5c6a3] bg-accent-peach px-3.5 py-1.5 text-xs font-medium text-[#1b1731] transition hover:bg-[#f3bc95]",
  secondary:
    "inline-flex items-center justify-center rounded-[0.3rem] border border-[#d59bbb] bg-[#3a355e] px-3.5 py-1.5 text-xs font-medium text-text-primary transition hover:border-accent-peach hover:text-accent-peach",
  ghost:
    "inline-flex items-center justify-center rounded-[0.3rem] border border-[#7c739f] bg-transparent px-3.5 py-1.5 text-xs font-medium text-text-muted transition hover:text-text-primary",
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
