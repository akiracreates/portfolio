import { Container } from "@/components/ui/container";
import { PageHeaderSkeleton } from "@/components/ui/skeletons/page-header-skeleton";
import { ArtworkRowsSkeleton } from "@/components/ui/skeletons/artwork-row-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function PortfolioLoading() {
  return (
    <>
      <PageHeaderSkeleton />
      <Container className="pt-8 pb-16 md:pb-24">
        <div className="scrap-note sticky top-3 z-30 mb-8 flex flex-wrap items-center gap-2 p-3">
          <Skeleton rounded="sm" className="h-3 w-14" />
          <Skeleton rounded="md" className="h-8 w-20" />
          <Skeleton rounded="md" className="h-8 w-20" />
          <Skeleton rounded="md" className="h-8 w-24" />
          <Skeleton rounded="md" className="h-8 w-20" />
        </div>
        <div className="space-y-9 md:space-y-12">
          <div className="corner-marks relative rounded-[var(--radius-lg)] border border-dashed border-border-subtle bg-bg-inset/45 p-5">
            <Skeleton rounded="md" className="h-7 w-40" />
          </div>
          <ArtworkRowsSkeleton count={3} />
        </div>
      </Container>
    </>
  );
}
