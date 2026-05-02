export function SiteFrame({ children }) {
  return (
    <div className="min-h-screen bg-frame p-2.5 sm:p-3.5">
      <div className="site-shell mx-auto flex min-h-[calc(100vh-1rem)] w-full max-w-5xl overflow-hidden">
        {children}
      </div>
    </div>
  );
}
