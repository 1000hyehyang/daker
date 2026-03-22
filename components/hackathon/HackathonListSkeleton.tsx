import { Skeleton } from "@/components/ui/Skeleton";

export function HackathonListSkeleton() {
  return (
    <div className="border-t border-border" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="border-b border-border py-6">
          <Skeleton className="h-6 w-2/3 max-w-md" />
          <Skeleton className="mt-3 h-4 w-48" />
          <Skeleton className="mt-4 h-3 w-full max-w-xs" />
        </div>
      ))}
    </div>
  );
}
