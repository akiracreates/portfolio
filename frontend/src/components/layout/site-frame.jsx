export function SiteFrame({ children }) {
  return (
    <div className="min-h-screen p-3 sm:p-5 lg:p-6">
      <div className="site-shell mx-auto flex min-h-[calc(100vh-1.5rem)] w-full max-w-7xl overflow-hidden lg:min-h-[calc(100vh-3rem)]">
        {children}
      </div>
    </div>
  );
}
