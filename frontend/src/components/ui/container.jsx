export function Container({ as: As = "div", className = "", children, ...props }) {
  return (
    <As
      className={`container mx-auto w-full max-w-[1080px] px-[var(--content-px-mobile)] md:px-[var(--content-px-desktop)] ${className}`.trim()}
      {...props}
    >
      {children}
    </As>
  );
}
