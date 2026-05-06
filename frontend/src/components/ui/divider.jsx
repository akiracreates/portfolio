export function Divider({ variant = "subtle", className = "" }) {
  const cls = variant === "strong" ? "divider-strong" : "broken-divider";
  return <hr className={`${cls} block w-full ${className}`.trim()} />;
}

export function SectionDividerBleed({ variant = "subtle", className = "" }) {
  const cls = variant === "strong" ? "divider-strong" : "broken-divider";
  return (
    <div className={`divider-bleed-host ${className}`.trim()} aria-hidden>
      <hr className={`${cls} divider-bleed-line`.trim()} />
    </div>
  );
}
