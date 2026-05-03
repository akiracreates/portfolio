import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center justify-center p-8">
      <div className="card-accent max-w-md space-y-4 p-8 text-center">
        <p className="label-sm title-underline">404</p>
        <h1 className="heading-display heading-md">page not found</h1>
        <p className="text-sm text-text-secondary">
          this page does not exist yet. you can return to the homepage.
        </p>
        <div className="flex justify-center pt-1">
          <Button as="link" href="/" variant="accent" size="sm">
            back home
          </Button>
        </div>
      </div>
    </div>
  );
}
