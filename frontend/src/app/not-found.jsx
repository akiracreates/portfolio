import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <Eyebrow>404</Eyebrow>
      <Heading level="h1" className="mt-4">
        this page wandered off.
      </Heading>
      <p className="body mt-4 max-w-md">
        the link might be old, or the page may have been moved. nothing&apos;s
        broken — just go back home.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button as="link" href="/" variant="secondary" size="md">
          back home
        </Button>
        <Button as="link" href="/portfolio" variant="outline" size="md">
          browse portfolio
        </Button>
      </div>
    </Container>
  );
}
