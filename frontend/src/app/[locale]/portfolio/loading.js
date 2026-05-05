import { Container } from "@/components/ui/container";
import { PageHeaderSkeleton } from "@/components/ui/skeletons/page-header-skeleton";
import { ArtworkRowsSkeleton } from "@/components/ui/skeletons/artwork-row-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function PortfolioLoading() {
  return (
    <>
      <PageHeaderSkeleton />
      <Container className="pt-8 pb-16 md:pb-24">
        <div className="mb-12 flex items-center gap-3">
          <Skeleton rounded="sm" className="h-3 w-16" />
          <Skeleton rounded="sm" className="h-3 w-16" />
          <Skeleton rounded="sm" className="h-3 w-20" />
          <Skeleton rounded="sm" className="h-3 w-16" />
        </div>
        <div className="space-y-24 md:space-y-32">
          <div className="space-y-12">
            <Skeleton rounded="md" className="h-7 w-40" />
            <ArtworkRowsSkeleton count={3} />
          </div>
          <div className="space-y-12">
            <Skeleton rounded="md" className="h-7 w-40" />
            <ArtworkRowsSkeleton count={2} />
          </div>
        </div>
      </Container>
    </>
  );
}
