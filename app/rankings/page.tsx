"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { LeaderboardTable } from "@/components/leaderboard/LeaderboardTable";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Skeleton } from "@/components/ui/Skeleton";
import { leaderboardCopy } from "@/lib/content/leaderboard";
import { rankingsPageCopy } from "@/lib/content/pages";
import { getLeaderboards, getHackathons, initStorage } from "@/lib/storage";
import type { Leaderboard } from "@/lib/types/models";

interface Row {
  hackathonSlug: string;
  title: string;
  leaderboard: Leaderboard;
}

export default function RankingsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    try {
      initStorage();
      const hackathons = getHackathons();
      const titleBySlug = new Map(
        hackathons.map((h) => [h.slug, h.title] as const),
      );
      const lbs = getLeaderboards();
      const mapped: Row[] = lbs.map((lb) => ({
        hackathonSlug: lb.hackathonSlug,
        title: titleBySlug.get(lb.hackathonSlug) ?? lb.hackathonSlug,
        leaderboard: lb,
      }));
      setRows(mapped);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : rankingsPageCopy.loadError,
      );
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const totalEntries = useMemo(
    () => rows.reduce((acc, r) => acc + r.leaderboard.entries.length, 0),
    [rows],
  );

  return (
    <main className="flex flex-1 flex-col">
      <Link href="/" className="link-subtle text-sm">
        {rankingsPageCopy.back}
      </Link>

      <ScrollReveal
        as="div"
        className="ds-panel ds-panel--accent-notch mt-8"
        start="top 90%"
      >
        <p className="eyebrow">Rankings</p>
        <h1 className="mt-3 text-display text-foreground">
          {rankingsPageCopy.title}
        </h1>
        <p className="mt-4 max-w-measure text-muted">
          {rankingsPageCopy.description}
        </p>
        {!loading && !error && totalEntries > 0 && (
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
            Entries · {totalEntries}
          </p>
        )}
      </ScrollReveal>

      {loading && (
        <div className="mt-12 space-y-4" aria-busy="true">
          <Skeleton className="h-10 w-full max-w-lg" />
          <Skeleton className="h-48 w-full" />
        </div>
      )}

      {error && (
        <div className="state-error mt-12 max-w-measure" role="alert">
          {error}
        </div>
      )}

      {!loading && !error && totalEntries === 0 && (
        <div className="state-empty mt-12 max-w-measure" role="status">
          <p className="font-medium text-foreground">
            {rankingsPageCopy.emptyTitle}
          </p>
          <p className="mt-2">{rankingsPageCopy.emptyHint}</p>
        </div>
      )}

      {!loading && !error && rows.length > 0 && (
        <div className="mt-14 space-y-10">
          {rows.map((r, i) => (
            <ScrollReveal
              as="section"
              key={r.hackathonSlug}
              className="ds-panel overflow-hidden p-0"
              start="top 90%"
              delay={Math.min(i, 4) * 0.03}
            >
              <div className="flex flex-col gap-2 border-b border-border px-4 py-4 sm:flex-row sm:items-end sm:justify-between">
                <h2 className="text-title text-foreground">{r.title}</h2>
                <span className="font-mono text-xs text-faint">
                  {r.hackathonSlug}
                </span>
              </div>
              <div className="p-4 pt-2">
                <LeaderboardTable
                  embedded
                  entries={r.leaderboard.entries}
                  emptyLabel={leaderboardCopy.hackathonEmpty}
                />
              </div>
            </ScrollReveal>
          ))}
        </div>
      )}
    </main>
  );
}
