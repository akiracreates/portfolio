import { Container } from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";
import { ArtworkCardGridSkeleton } from "@/components/ui/skeletons/artwork-card-skeleton";

export default function HomeLoading() {
  return (
    <>
      {/* hero */}
      <section className="border-b border-border-subtle">
        <Container className="py-20 md:py-28 lg:py-32">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="space-y-6 lg:col-span-7">
              <Skeleton rounded="sm" className="h-3 w-40" />
              <Skeleton rounded="md" className="h-12 w-3/4" />
              <Skeleton rounded="md" className="h-12 w-1/2" />
              <Skeleton rounded="sm" className="h-4 w-full max-w-md" />
              <Skeleton rounded="sm" className="h-4 w-2/3 max-w-md" />
              <div className="flex gap-3 pt-2">
                <Skeleton rounded="md" className="h-11 w-36" />
                <Skeleton rounded="md" className="h-11 w-36" />
              </div>
            </div>
            <div className="lg:col-span-5">
              <Skeleton rounded="lg" className="aspect-[4/5] w-full" />
            </div>
          </div>
        </Container>
      </section>

      {/* about preview */}
      <section className="border-b border-border-subtle bg-bg-base">
        <Container className="py-20 md:py-28">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Skeleton rounded="lg" className="aspect-square w-full max-w-md" />
            </div>
            <div className="space-y-4 lg:col-span-7 lg:pt-6">
              <Skeleton rounded="sm" className="h-3 w-20" />
              <Skeleton rounded="md" className="h-8 w-3/4" />
              <Skeleton rounded="sm" className="h-4 w-full" />
              <Skeleton rounded="sm" className="h-4 w-5/6" />
              <Skeleton rounded="sm" className="h-4 w-2/3" />
            </div>
          </div>
        </Container>
      </section>

      {/* featured */}
      <section>
        <Container className="py-20 md:py-28">
          <div className="mb-10 space-y-3">
            <Skeleton rounded="sm" className="h-3 w-20" />
            <Skeleton rounded="md" className="h-7 w-2/3 max-w-md" />
          </div>
          <ArtworkCardGridSkeleton count={3} />
        </Container>
      </section>
    </>
  );
}
