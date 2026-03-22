"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { HackathonDetailView } from "@/components/hackathon/HackathonDetailView";
import { Skeleton } from "@/components/ui/Skeleton";
import { hackathonDetailPageCopy, uiActionsCopy } from "@/lib/content/pages";
import { getHackathonDetailBySlug } from "@/lib/hackathon-details";
import { useHackathonBySlug } from "@/hooks/useHackathonBySlug";

export default function HackathonDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const { hackathon, loading, error, reload } = useHackathonBySlug(slug);
  const detail = getHackathonDetailBySlug(slug);

  if (!loading && !error && hackathon && !detail) {
    notFound();
  }

  if (!loading && !error && !hackathon) {
    notFound();
  }

  return (
    <main className="flex flex-1 flex-col">
      <Link href="/hackathons" className="link-subtle text-sm">
        {hackathonDetailPageCopy.back}
      </Link>

      {loading && (
        <div className="mt-10 space-y-4" aria-busy="true">
          <Skeleton className="h-10 w-2/3 max-w-lg" />
          <Skeleton className="h-4 w-full max-w-xl" />
          <Skeleton className="mt-8 h-40 w-full" />
        </div>
      )}

      {error && (
        <div className="state-error mt-10" role="alert">
          <p className="font-medium">{error}</p>
          <button type="button" onClick={reload} className="btn-primary mt-4">
            {uiActionsCopy.retry}
          </button>
        </div>
      )}

      {!loading && !error && hackathon && detail && (
        <HackathonDetailView hackathon={hackathon} detail={detail} />
      )}
    </main>
  );
}
