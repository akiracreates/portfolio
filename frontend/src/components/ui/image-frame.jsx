/**
 * Wraps images with either a soft solid frame or a dashed “sticker” frame.
 * When using Next/Image with fill, set `className` on ImageFrame to include sizing (e.g. aspect + min-h).
 */
export function ImageFrame({ dashed = false, className = "", children }) {
  if (dashed) {
    return (
      <div className={`frame-dashed-image relative p-1.5 ${className}`.trim()}>
        <div className="relative h-full w-full min-h-0 overflow-hidden rounded-[calc(var(--radius-md)-6px)]">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-border-default bg-bg-inset/30 ${className}`.trim()}
    >
      {children}
    </div>
  );
}
