import { Skeleton } from "@/components/ui/skeleton";
import { Container } from "@/components/ui/container";

/**
 * Generic page-header skeleton used by route-level loading.js fallbacks.
 */
export function PageHeaderSkeleton() {
  return (
    <header className="border-b border-border-subtle">
      <Container className="py-16 md:py-20">
        <div className="space-y-5">
          <Skeleton rounded="sm" className="h-3 w-24" />
          <Skeleton rounded="sm" className="h-9 w-3/4 max-w-xl" />
          <Skeleton rounded="sm" className="h-4 w-2/3 max-w-lg" />
        </div>
      </Container>
    </header>
  );
}
