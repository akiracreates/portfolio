"use client";

import { useEffect, useRef } from "react";

export function SectionShell({
  id,
  title,
  eyebrow,
  children,
  action,
  variant = "default",
  className = "",
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const frameClass = variant === "accent" ? "card-accent" : "card";

  return (
    <section
      ref={ref}
      id={id}
      className={`${frameClass} reveal px-5 py-6 sm:px-7 sm:py-8 ${className}`}
      aria-labelledby={id ? `${id}-heading` : undefined}
    >
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          {eyebrow && <p className="label-sm mb-2">{eyebrow}</p>}
          {title && (
            <h2
              id={id ? `${id}-heading` : undefined}
              className="heading-display heading-md"
            >
              {title}
            </h2>
          )}
        </div>
        {action}
      </div>
      <div className="divider-gradient mb-6" />
      {children}
    </section>
  );
}
