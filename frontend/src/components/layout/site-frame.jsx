export function SiteFrame({ children }) {
  return (
    <div className="site-frame-outer">
      <div className="site-frame-inner">
        <div className="site-frame">{children}</div>
      </div>
    </div>
  );
}
