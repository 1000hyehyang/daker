import { Suspense } from "react";
import { CampPageClient } from "./CampPageClient";
import { Skeleton } from "@/components/ui/Skeleton";

function CampFallback() {
  return (
    <main className="flex flex-1 flex-col gap-6">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-24 w-full rounded-xl" />
    </main>
  );
}

export default function CampPage() {
  return (
    <Suspense fallback={<CampFallback />}>
      <CampPageClient />
    </Suspense>
  );
}
