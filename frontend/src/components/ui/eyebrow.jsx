export function Eyebrow({ children, className = "", as: As = "span" }) {
  return (
    <As className={`eyebrow ${className}`.trim()}>
      {children}
    </As>
  );
}
