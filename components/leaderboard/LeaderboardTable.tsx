import type { LeaderboardEntry } from "@/lib/types/models";
import { leaderboardCopy } from "@/lib/content/leaderboard";
import { ScoreBreakdown } from "@/components/leaderboard/ScoreBreakdown";
import { cn } from "@/lib/utils/cn";

export interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  emptyLabel?: string;
  embedded?: boolean;
}

function rankRowClass(rank: number): string {
  if (rank === 1) return "lb-row--gold";
  if (rank === 2) return "lb-row--silver";
  if (rank === 3) return "lb-row--bronze";
  return "";
}

export function LeaderboardTable({
  entries,
  emptyLabel = leaderboardCopy.defaultEmpty,
  embedded = false,
}: LeaderboardTableProps) {
  if (entries.length === 0) {
    return (
      <div className="state-empty max-w-measure" role="status">
        {emptyLabel}
      </div>
    );
  }

  return (
    <div
      className={cn(
        embedded
          ? "overflow-x-auto border-t border-b border-border/60 bg-transparent"
          : "ds-table-wrap",
      )}
    >
      <table className="w-full min-w-[520px] text-left text-sm">
        <thead className="border-b border-border bg-muted-bg/90 text-xs uppercase tracking-wide text-faint">
          <tr>
            <th className="px-4 py-3.5 font-semibold">순위</th>
            <th className="px-4 py-3.5 font-semibold">팀</th>
            <th className="px-4 py-3.5 font-semibold">점수</th>
            <th className="px-4 py-3.5 font-semibold">Breakdown</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((e) => (
            <tr
              key={`${e.rank}-${e.teamName}`}
              className={cn(
                "border-b border-border transition-colors last:border-b-0",
                "hover:bg-muted-bg/40",
                rankRowClass(e.rank),
              )}
            >
              <td className="px-4 py-3.5">
                <span
                  className={cn(
                    "inline-flex min-w-[2rem] items-center justify-center font-mono text-sm tabular-nums",
                    e.rank <= 3
                      ? "font-bold text-foreground"
                      : "text-muted",
                  )}
                >
                  {e.rank}
                </span>
              </td>
              <td className="px-4 py-3.5 font-semibold text-foreground">
                {e.teamName}
              </td>
              <td className="px-4 py-3.5 tabular-nums text-base font-semibold text-foreground">
                {typeof e.score === "number" ? e.score.toFixed(2) : e.score}
              </td>
              <td className="px-4 py-3.5">
                <ScoreBreakdown breakdown={e.scoreBreakdown} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
