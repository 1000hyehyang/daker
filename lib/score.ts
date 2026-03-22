import type { ScoreBreakdown } from "@/lib/types/models";

/** PRD 5.3: score = participant × 0.3 + judge × 0.7 */
export function computeFinalScore(breakdown: ScoreBreakdown): number {
  return breakdown.participant * 0.3 + breakdown.judge * 0.7;
}

/**
 * 심사 입력이 없을 때도 일관된 점수를 만들기 위한 결정론적 breakdown.
 * (teamCode + hackathonSlug) 기준으로 동일 팀은 동일 점수.
 */
export function deriveScoreBreakdown(
  teamCode: string,
  hackathonSlug: string,
): ScoreBreakdown {
  const s = `${teamCode}::${hackathonSlug}`;
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const participant = 60 + (Math.abs(h) % 41);
  const judge = 55 + (Math.abs(h >> 8) % 41);
  return { participant, judge };
}
