import { Skeleton } from "@/components/ui/skeleton";

export function ArtworkCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-border-subtle bg-bg-surface">
      <Skeleton rounded="none" className="aspect-[4/5] w-full" />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-3">
          <Skeleton rounded="sm" className="h-4 w-1/2" />
          <Skeleton rounded="sm" className="h-3 w-12" />
        </div>
        <Skeleton rounded="sm" className="h-3 w-full" />
        <Skeleton rounded="sm" className="h-3 w-3/4" />
      </div>
    </div>
  );
}

export function ArtworkCardGridSkeleton({ count = 3 }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <ArtworkCardSkeleton key={i} />
      ))}
    </div>
  );
}
