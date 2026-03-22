import { STORAGE_KEYS, storage } from "@/lib/storage";

/** 해커톤별 내가 선택한 팀 (인증 없음, 단일 기기 localStorage) */
export type Participations = Record<string, string>;

export function getParticipations(): Participations {
  return storage.get<Participations>(STORAGE_KEYS.PARTICIPATIONS) ?? {};
}

export function getMyTeamCode(hackathonSlug: string): string | undefined {
  return getParticipations()[hackathonSlug];
}

export function setMyTeam(hackathonSlug: string, teamCode: string): void {
  storage.update<Participations>(STORAGE_KEYS.PARTICIPATIONS, (prev) => ({
    ...(prev ?? {}),
    [hackathonSlug]: teamCode,
  }));
}

export function clearMyTeam(hackathonSlug: string): void {
  storage.update<Participations>(STORAGE_KEYS.PARTICIPATIONS, (prev) => {
    const next = { ...(prev ?? {}) };
    delete next[hackathonSlug];
    return next;
  });
}
