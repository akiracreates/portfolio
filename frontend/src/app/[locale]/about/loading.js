import { Container } from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHeaderSkeleton } from "@/components/ui/skeletons/page-header-skeleton";

export default function AboutLoading() {
  return (
    <>
      <PageHeaderSkeleton />
      <section className="border-b border-border-subtle">
        <Container className="py-16 md:py-24">
          <div className="mx-auto max-w-3xl">
            <Skeleton rounded="lg" className="aspect-[4/5] w-full" />
          </div>
        </Container>
      </section>
      <section className="border-b border-border-subtle bg-bg-base">
        <Container className="py-16 md:py-24">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="space-y-3 lg:col-span-4">
              <Skeleton rounded="sm" className="h-3 w-16" />
              <Skeleton rounded="md" className="h-8 w-3/4" />
            </div>
            <div className="space-y-3 lg:col-span-8">
              <Skeleton rounded="sm" className="h-4 w-full" />
              <Skeleton rounded="sm" className="h-4 w-5/6" />
              <Skeleton rounded="sm" className="h-4 w-2/3" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
