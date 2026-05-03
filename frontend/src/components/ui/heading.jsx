const levelClass = {
  display: "heading-display",
  h1: "heading-h1",
  h2: "heading-h2",
  h3: "heading-h3",
};

const levelTag = {
  display: "h1",
  h1: "h1",
  h2: "h2",
  h3: "h3",
};

export function Heading({
  level = "h2",
  as,
  id,
  className = "",
  children,
  ...props
}) {
  const Tag = as || levelTag[level] || "h2";
  const variantClass = levelClass[level] || levelClass.h2;
  return (
    <Tag id={id} className={`${variantClass} ${className}`.trim()} {...props}>
      {children}
    </Tag>
  );
}
