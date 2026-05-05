import { Container } from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHeaderSkeleton } from "@/components/ui/skeletons/page-header-skeleton";
import { CommissionCardsSkeleton } from "@/components/ui/skeletons/commission-card-skeleton";
import { PriceTableSkeleton } from "@/components/ui/skeletons/price-table-skeleton";

export default function CommissionsLoading() {
  return (
    <>
      <PageHeaderSkeleton />
      <Container>
        <div className="-mt-4 mb-2">
          <Skeleton rounded="pill" className="h-6 w-44" />
        </div>
        <section className="section-scrap py-16 md:py-20">
          <div className="mb-10 space-y-3">
            <Skeleton rounded="sm" className="h-3 w-24" />
            <Skeleton rounded="md" className="h-7 w-1/2 max-w-md" />
          </div>
          <CommissionCardsSkeleton count={2} />
        </section>
        <section className="section-scrap py-16 md:py-20">
          <div className="mb-10 space-y-3">
            <Skeleton rounded="sm" className="h-3 w-16" />
            <Skeleton rounded="md" className="h-7 w-2/3 max-w-md" />
          </div>
          <PriceTableSkeleton rows={2} />
        </section>
      </Container>
    </>
  );
}
