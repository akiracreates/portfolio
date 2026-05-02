import Link from "next/link";
import { SiteFrame } from "@/components/layout/site-frame";

export default function NotFound() {
  return (
    <SiteFrame>
      <main className="flex w-full items-center justify-center p-6">
        <div className="card-frame max-w-lg space-y-3 p-6 text-center">
          <h1 className="text-xl">page not found</h1>
          <p className="text-sm text-text-muted">this page does not exist yet. you can return to the homepage.</p>
          <Link href="/" className="text-sm underline underline-offset-2">
            back home
          </Link>
        </div>
      </main>
    </SiteFrame>
  );
}
