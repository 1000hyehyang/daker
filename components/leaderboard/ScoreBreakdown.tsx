import type { ScoreBreakdown as ScoreBreakdownT } from "@/lib/types/models";

export interface ScoreBreakdownProps {
  breakdown: ScoreBreakdownT | undefined;
}

export function ScoreBreakdown({ breakdown }: ScoreBreakdownProps) {
  if (!breakdown) {
    return <span className="text-faint">—</span>;
  }
  return (
    <span className="tabular-nums text-muted">
      참가 {breakdown.participant} · 심사 {breakdown.judge}
    </span>
  );
}
