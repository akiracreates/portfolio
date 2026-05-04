import { Container } from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function SpinLoading() {
  return (
    <Container className="py-16 md:py-24">
      <div className="mx-auto max-w-md space-y-5 text-center">
        <Skeleton rounded="full" className="mx-auto h-64 w-64" />
        <Skeleton rounded="md" className="mx-auto h-7 w-3/4" />
        <Skeleton rounded="sm" className="mx-auto h-4 w-2/3" />
        <Skeleton rounded="md" className="mx-auto h-11 w-40" />
      </div>
    </Container>
  );
}
