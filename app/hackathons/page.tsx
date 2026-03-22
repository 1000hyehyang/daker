"use client";

import Link from "next/link";
import { HackathonList } from "@/components/hackathon/HackathonList";
import { HackathonListSkeleton } from "@/components/hackathon/HackathonListSkeleton";
import { HackathonStatusFilter } from "@/components/hackathon/HackathonStatusFilter";
import { hackathonsPageCopy, uiActionsCopy } from "@/lib/content/pages";
import { useHackathons } from "@/hooks/useHackathons";

export default function HackathonsPage() {
  const {
    items,
    filtered,
    statusFilter,
    setStatusFilter,
    loading,
    error,
    reload,
  } = useHackathons();

  return (
    <main className="flex flex-1 flex-col">
      <header className="max-w-measure">
        <Link href="/" className="link-subtle text-sm">
          {hackathonsPageCopy.back}
        </Link>
        <h1 className="mt-6 text-display">{hackathonsPageCopy.title}</h1>
        <p className="mt-4 text-muted">{hackathonsPageCopy.description}</p>
      </header>

      <section className="mt-12 space-y-8" aria-live="polite">
        <HackathonStatusFilter
          value={statusFilter}
          onChange={setStatusFilter}
          disabled={loading || Boolean(error)}
        />

        {loading && <HackathonListSkeleton />}

        {!loading && error && (
          <div className="state-error" role="alert">
            <p className="font-medium">{error}</p>
            <button type="button" onClick={reload} className="btn-primary mt-4">
              {uiActionsCopy.retry}
            </button>
          </div>
        )}

        {!loading && !error && (
          <HackathonList hackathons={filtered} totalCount={items.length} />
        )}
      </section>
    </main>
  );
}
