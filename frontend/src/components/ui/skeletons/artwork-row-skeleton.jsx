import { Skeleton } from "@/components/ui/skeleton";

export function ArtworkRowSkeleton({ reversed = false }) {
  return (
    <div
      className={`grid items-center gap-7 md:grid-cols-12 md:gap-10 ${
        reversed ? "md:[&>:first-child]:order-2" : ""
      }`}
    >
      <div className="md:col-span-7">
        <Skeleton rounded="lg" className="aspect-[4/5] w-full" />
      </div>
      <div className="scrap-note space-y-3 p-5 md:col-span-5">
        <Skeleton rounded="sm" className="h-7 w-3/4" />
        <Skeleton rounded="sm" className="h-3 w-full" />
        <Skeleton rounded="sm" className="h-3 w-5/6" />
      </div>
    </div>
  );
}

export function ArtworkRowsSkeleton({ count = 3 }) {
  return (
    <div className="space-y-12 md:space-y-16">
      {Array.from({ length: count }).map((_, i) => (
        <ArtworkRowSkeleton key={i} reversed={i % 2 === 1} />
      ))}
    </div>
  );
}
