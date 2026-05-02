export function SectionShell({ id, title, eyebrow, children, action }) {
  return (
    <section id={id} className="card-frame px-4 py-5 sm:px-5 sm:py-6" aria-labelledby={`${id}-title`}>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          {eyebrow ? <p className="mb-2 text-[0.65rem] tracking-[0.18em] text-[#f9d6be]">{eyebrow}</p> : null}
          <h2 id={`${id}-title`} className="section-title">
            {title}
          </h2>
        </div>
        {action}
      </div>
      <div className="panel-divider mb-5" />
      {children}
    </section>
  );
}
