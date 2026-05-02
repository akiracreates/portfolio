export function SectionShell({ id, title, eyebrow, children, action }) {
  return (
    <section id={id} className="card-frame px-5 py-7 sm:px-8 sm:py-10" aria-labelledby={`${id}-title`}>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          {eyebrow ? <p className="mb-2 text-xs tracking-[0.2em] text-accent-rose">{eyebrow}</p> : null}
          <h2 id={`${id}-title`} className="section-title">
            {title}
          </h2>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
