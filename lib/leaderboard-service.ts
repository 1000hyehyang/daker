import { deriveScoreBreakdown, computeFinalScore } from "@/lib/score";
import { STORAGE_KEYS, storage } from "@/lib/storage";
import type {
  Leaderboard,
  LeaderboardEntry,
  ScoreBreakdown,
} from "@/lib/types/models";

function sortAndRank(entries: LeaderboardEntry[]): LeaderboardEntry[] {
  const sorted = [...entries].sort((a, b) => b.score - a.score);
  sorted.forEach((e, i) => {
    e.rank = i + 1;
  });
  return sorted;
}

/** 제출 확정 시 리더보드에 반영 (PRD 5.2) */
export function upsertLeaderboardFromSubmission(
  hackathonSlug: string,
  teamName: string,
  breakdown: ScoreBreakdown,
  submittedAt: string,
): void {
  const score = computeFinalScore(breakdown);
  const newEntry: LeaderboardEntry = {
    rank: 0,
    teamName,
    score,
    scoreBreakdown: breakdown,
    submittedAt,
  };

  storage.update<Leaderboard[]>(STORAGE_KEYS.LEADERBOARDS, (prev) => {
    const list = [...(prev ?? [])];
    const idx = list.findIndex((l) => l.hackathonSlug === hackathonSlug);
    const base: Leaderboard =
      idx >= 0
        ? { ...list[idx]!, entries: [...list[idx]!.entries] }
        : { hackathonSlug, entries: [] };

    const without = base.entries.filter((e) => e.teamName !== teamName);
    without.push(newEntry);
    base.entries = sortAndRank(without);

    if (idx >= 0) {
      list[idx] = base;
    } else {
      list.push(base);
    }
    return list;
  });
}

/** teamCode 기준으로 breakdown 생성 후 리더보드 반영 */
export function applyLeaderboardForSubmit(
  hackathonSlug: string,
  teamCode: string,
  teamName: string,
  submittedAt: string,
): void {
  const breakdown = deriveScoreBreakdown(teamCode, hackathonSlug);
  upsertLeaderboardFromSubmission(
    hackathonSlug,
    teamName,
    breakdown,
    submittedAt,
  );
}

export function getLeaderboardForHackathon(
  hackathonSlug: string,
): Leaderboard | undefined {
  const list = storage.get<Leaderboard[]>(STORAGE_KEYS.LEADERBOARDS) ?? [];
  return list.find((l) => l.hackathonSlug === hackathonSlug);
}
