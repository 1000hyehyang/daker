import type { LeaderboardEntry } from "@/lib/types/models";
import { leaderboardCopy } from "@/lib/content/leaderboard";
import { ScoreBreakdown } from "@/components/leaderboard/ScoreBreakdown";

export interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  emptyLabel?: string;
}

export function LeaderboardTable({
  entries,
  emptyLabel = leaderboardCopy.defaultEmpty,
}: LeaderboardTableProps) {
  if (entries.length === 0) {
    return (
      <div className="state-empty max-w-measure" role="status">
        {emptyLabel}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-border">
      <table className="w-full min-w-[520px] text-left text-sm">
        <thead className="border-b border-border bg-muted-bg text-xs uppercase tracking-wide text-faint">
          <tr>
            <th className="px-4 py-3 font-medium">순위</th>
            <th className="px-4 py-3 font-medium">팀</th>
            <th className="px-4 py-3 font-medium">점수</th>
            <th className="px-4 py-3 font-medium">Breakdown</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {entries.map((e) => (
            <tr key={`${e.rank}-${e.teamName}`}>
              <td className="px-4 py-3 font-mono text-muted">{e.rank}</td>
              <td className="px-4 py-3 font-medium text-foreground">
                {e.teamName}
              </td>
              <td className="px-4 py-3 tabular-nums text-foreground">
                {typeof e.score === "number" ? e.score.toFixed(2) : e.score}
              </td>
              <td className="px-4 py-3">
                <ScoreBreakdown breakdown={e.scoreBreakdown} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
