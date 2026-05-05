import { Skeleton } from "@/components/ui/skeleton";
import { Container } from "@/components/ui/container";

/**
 * Generic page-header skeleton used by route-level loading.js fallbacks.
 */
export function PageHeaderSkeleton() {
  return (
    <header className="section-scrap border-b border-dashed border-border-subtle">
      <Container className="py-14 md:py-20">
        <div className="scrap-note max-w-3xl space-y-5 p-5 md:p-7">
          <Skeleton rounded="sm" className="h-3 w-24" />
          <Skeleton rounded="sm" className="h-9 w-3/4 max-w-xl" />
          <Skeleton rounded="sm" className="h-4 w-2/3 max-w-lg" />
        </div>
      </Container>
    </header>
  );
}
