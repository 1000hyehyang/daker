import type { LeaderboardEntry } from "@/lib/types/models";
import { leaderboardCopy } from "@/lib/content/leaderboard";
import { ScoreBreakdown } from "@/components/leaderboard/ScoreBreakdown";
import { cn } from "@/lib/utils/cn";

export interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  emptyLabel?: string;
  /** 상위 `ds-panel` 안에 넣을 때 이중 프레임·섀도우 완화 */
  embedded?: boolean;
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
          ? "overflow-x-auto overflow-hidden rounded-sm border border-border bg-surface"
          : "ds-table-wrap",
      )}
    >
      <table className="w-full min-w-[520px] text-left text-sm">
        <thead className="border-b border-border bg-muted-bg text-xs uppercase tracking-wide text-faint">
          <tr>
            <th className="px-4 py-3 font-semibold">순위</th>
            <th className="px-4 py-3 font-semibold">팀</th>
            <th className="px-4 py-3 font-semibold">점수</th>
            <th className="px-4 py-3 font-semibold">Breakdown</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((e) => (
            <tr key={`${e.rank}-${e.teamName}`} className="border-b border-border last:border-b-0">
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
