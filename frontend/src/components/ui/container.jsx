export function Container({ as: As = "div", className = "", children, ...props }) {
  return (
    <As
      className={`mx-auto w-full max-w-[1120px] px-5 md:px-8 ${className}`.trim()}
      {...props}
    >
      {children}
    </As>
  );
}
