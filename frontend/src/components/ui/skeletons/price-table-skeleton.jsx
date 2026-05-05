import { Skeleton } from "@/components/ui/skeleton";

export function PriceTableSkeleton({ rows = 2 }) {
  return (
    <div className="scrap-card overflow-hidden">
      <div className="flex items-center justify-between gap-4 border-b border-dashed border-border-subtle bg-bg-inset/40 px-5 py-3">
        <Skeleton rounded="sm" className="h-3 w-16" />
        <Skeleton rounded="sm" className="h-3 w-20" />
        <Skeleton rounded="sm" className="hidden h-3 w-24 sm:block" />
      </div>
      <div>
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className={`flex items-start justify-between gap-4 px-5 py-4 ${
              i > 0 ? "border-t border-dashed border-border-subtle" : ""
            }`}
          >
            <div className="flex-1 space-y-2">
              <Skeleton rounded="sm" className="h-4 w-24" />
              <Skeleton rounded="sm" className="h-3 w-3/4" />
            </div>
            <Skeleton rounded="sm" className="h-4 w-16" />
            <div className="hidden flex-1 space-y-2 sm:block">
              <Skeleton rounded="sm" className="h-3 w-3/4" />
              <Skeleton rounded="sm" className="h-3 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
