export function Divider({ variant = "subtle", className = "" }) {
  const cls = variant === "strong" ? "divider-strong" : "broken-divider";
  return <hr className={`${cls} ${className}`.trim()} />;
}
