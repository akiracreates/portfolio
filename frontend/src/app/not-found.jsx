import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center justify-center p-8">
      <div className="card-accent max-w-md space-y-4 p-8 text-center">
        <p className="label-sm">404</p>
        <h1 className="heading-display heading-md">page not found</h1>
        <p className="text-sm text-text-secondary">
          this page does not exist yet. you can return to the homepage.
        </p>
        <Link
          href="/"
          className="inline-flex items-center text-sm text-primary underline underline-offset-2 transition-colors hover:text-secondary"
        >
          back home
        </Link>
      </div>
    </div>
  );
}
