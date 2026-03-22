import { applyLeaderboardForSubmit } from "@/lib/leaderboard-service";
import { getTeamByCode } from "@/lib/team-service";
import { STORAGE_KEYS, storage } from "@/lib/storage";
import type { Submission } from "@/lib/types/models";

function upsertSubmissionList(next: Submission): void {
  storage.update<Submission[]>(STORAGE_KEYS.SUBMISSIONS, (prev) => {
    const list = [...(prev ?? [])];
    const i = list.findIndex(
      (s) =>
        s.hackathonSlug === next.hackathonSlug &&
        s.teamCode === next.teamCode,
    );
    if (i === -1) list.push(next);
    else list[i] = next;
    return list;
  });
}

export function getSubmission(
  hackathonSlug: string,
  teamCode: string,
): Submission | undefined {
  const list = storage.get<Submission[]>(STORAGE_KEYS.SUBMISSIONS) ?? [];
  return list.find(
    (s) => s.hackathonSlug === hackathonSlug && s.teamCode === teamCode,
  );
}

export function saveDraft(sub: {
  hackathonSlug: string;
  teamCode: string;
  artifacts: Submission["artifacts"];
}): Submission {
  const row: Submission = {
    hackathonSlug: sub.hackathonSlug,
    teamCode: sub.teamCode,
    status: "draft",
    artifacts: { ...sub.artifacts },
    updatedAt: new Date().toISOString(),
  };
  upsertSubmissionList(row);
  return row;
}

/**
 * PRD: submitted 시 leaderboard 업데이트.
 * TRD submitSubmission(submission)
 */
export function submitSubmission(sub: {
  hackathonSlug: string;
  teamCode: string;
  artifacts: Submission["artifacts"];
}): Submission {
  const team = getTeamByCode(sub.teamCode);
  if (!team || team.hackathonSlug !== sub.hackathonSlug) {
    throw new Error("해당 해커톤에 속한 팀을 찾을 수 없습니다.");
  }

  const updatedAt = new Date().toISOString();
  const row: Submission = {
    hackathonSlug: sub.hackathonSlug,
    teamCode: sub.teamCode,
    status: "submitted",
    artifacts: { ...sub.artifacts },
    updatedAt,
  };
  upsertSubmissionList(row);
  applyLeaderboardForSubmit(
    sub.hackathonSlug,
    sub.teamCode,
    team.name,
    updatedAt,
  );
  return row;
}
