"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
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
      <ScrollReveal
        as="header"
        className="ds-panel ds-panel--accent-notch max-w-measure"
        start="top 92%"
      >
        <Link href="/" className="link-subtle text-sm">
          {hackathonsPageCopy.back}
        </Link>
        <p className="eyebrow mt-6">Hackathons</p>
        <h1 className="mt-3 text-display text-foreground">
          {hackathonsPageCopy.title}
        </h1>
        <p className="mt-4 text-muted">{hackathonsPageCopy.description}</p>
      </ScrollReveal>

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
