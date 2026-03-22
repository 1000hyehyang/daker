"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { HackathonList } from "@/components/hackathon/HackathonList";
import { HackathonListSkeleton } from "@/components/hackathon/HackathonListSkeleton";
import { HackathonStatusFilter } from "@/components/hackathon/HackathonStatusFilter";
import {
  hackathonsPageCopy,
  hackathonsPageStatsLine,
  uiActionsCopy,
} from "@/lib/content/pages";
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
      <ScrollReveal
        as="header"
        className="max-w-measure border-b border-border/30 pb-10"
        start="top 92%"
      >
        <Link href="/" className="link-subtle text-sm">
          {hackathonsPageCopy.back}
        </Link>
        <p className="mt-8 text-xs font-medium tracking-wide text-muted">
          Hackathons
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {hackathonsPageCopy.title}
        </h1>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
          {hackathonsPageCopy.description}
        </p>
      </ScrollReveal>

      <section className="mt-14 space-y-10" aria-live="polite">
        <HackathonStatusFilter
          value={statusFilter}
          onChange={setStatusFilter}
          disabled={loading || Boolean(error)}
        />

        {!loading && !error && (
          <p className="text-[13px] text-muted">
            {hackathonsPageStatsLine(items.length, filtered.length)}
          </p>
        )}

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
