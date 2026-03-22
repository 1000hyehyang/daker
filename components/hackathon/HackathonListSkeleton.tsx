import { Skeleton } from "@/components/ui/Skeleton";

export function HackathonListSkeleton() {
  return (
    <div
      className="grid w-full grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-14 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-16"
      aria-hidden
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex h-full min-h-0 flex-col">
          <Skeleton className="aspect-[3/2] w-full shrink-0 rounded-2xl" />
          <div className="flex min-h-0 flex-1 flex-col gap-3 pt-5">
            <Skeleton className="h-3 w-14" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-3.5 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
            <div className="mt-auto flex flex-wrap gap-2 pt-6">
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
