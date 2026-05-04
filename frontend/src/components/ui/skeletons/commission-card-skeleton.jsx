import { Skeleton } from "@/components/ui/skeleton";

export function CommissionCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-border-subtle bg-bg-surface">
      <Skeleton rounded="none" className="aspect-[4/3] w-full" />
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-center justify-between gap-3">
          <Skeleton rounded="sm" className="h-5 w-32" />
          <Skeleton rounded="sm" className="h-4 w-20" />
        </div>
        <Skeleton rounded="sm" className="h-3 w-full" />
        <Skeleton rounded="sm" className="h-3 w-4/5" />
        <div className="space-y-2 border-t border-border-subtle pt-4">
          <Skeleton rounded="sm" className="h-3 w-3/5" />
          <Skeleton rounded="sm" className="h-3 w-2/3" />
          <Skeleton rounded="sm" className="h-3 w-1/2" />
        </div>
      </div>
    </div>
  );
}

export function CommissionCardsSkeleton({ count = 2 }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {Array.from({ length: count }).map((_, i) => (
        <CommissionCardSkeleton key={i} />
      ))}
    </div>
  );
}
