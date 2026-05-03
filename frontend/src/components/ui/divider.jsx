export function Divider({ variant = "subtle", className = "" }) {
  const cls = variant === "strong" ? "divider-strong" : "divider";
  return <hr className={`${cls} ${className}`.trim()} />;
}
