import { Skeleton } from "@/components/ui/skeleton";

export function ArtworkRowSkeleton({ reversed = false }) {
  return (
    <div
      className={`grid items-center gap-8 md:grid-cols-12 md:gap-12 ${
        reversed ? "md:[&>:first-child]:order-2" : ""
      }`}
    >
      <div className="md:col-span-7">
        <Skeleton rounded="lg" className="aspect-[4/5] w-full" />
      </div>
      <div className="space-y-3 md:col-span-5">
        <Skeleton rounded="sm" className="h-7 w-3/4" />
        <Skeleton rounded="sm" className="h-3 w-full" />
        <Skeleton rounded="sm" className="h-3 w-5/6" />
      </div>
    </div>
  );
}

export function ArtworkRowsSkeleton({ count = 3 }) {
  return (
    <div className="space-y-16 md:space-y-24">
      {Array.from({ length: count }).map((_, i) => (
        <ArtworkRowSkeleton key={i} reversed={i % 2 === 1} />
      ))}
    </div>
  );
}
