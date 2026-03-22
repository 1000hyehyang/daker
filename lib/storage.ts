import {
  INITIAL_HACKATHONS,
  INITIAL_LEADERBOARDS,
  INITIAL_SUBMISSIONS,
  INITIAL_TEAMS,
} from "@/lib/initial-data";
import type {
  Hackathon,
  Leaderboard,
  Submission,
  Team,
} from "@/lib/types/models";

export const STORAGE_KEYS = {
  HACKATHONS: "hackathons",
  TEAMS: "teams",
  SUBMISSIONS: "submissions",
  LEADERBOARDS: "leaderboards",
  /** 해커톤 slug → 선택한 teamCode */
  PARTICIPATIONS: "participations",
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

function parseJson<T>(raw: string | null): T | null {
  if (raw === null) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

/**
 * localStorage 추상화 (TRD 3.1)
 * 브라우저 외 환경에서는 no-op / null
 */
export const storage = {
  get<T>(key: string): T | null {
    if (typeof window === "undefined") return null;
    return parseJson<T>(window.localStorage.getItem(key));
  },

  set(key: string, value: unknown): void {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(key, JSON.stringify(value));
  },

  update<T>(key: string, updater: (prev: T | null) => T): T {
    const prev = this.get<T>(key);
    const next = updater(prev);
    this.set(key, next);
    return next;
  },
};

/** PRD 5.1: 최초 접속 시 mock → localStorage, 이후 localStorage 기준 */
export function initStorage(): void {
  if (typeof window === "undefined") return;

  if (!window.localStorage.getItem(STORAGE_KEYS.HACKATHONS)) {
    storage.set(STORAGE_KEYS.HACKATHONS, INITIAL_HACKATHONS);
  }
  if (!window.localStorage.getItem(STORAGE_KEYS.TEAMS)) {
    storage.set(STORAGE_KEYS.TEAMS, INITIAL_TEAMS);
  }
  if (!window.localStorage.getItem(STORAGE_KEYS.SUBMISSIONS)) {
    storage.set(STORAGE_KEYS.SUBMISSIONS, INITIAL_SUBMISSIONS);
  }
  if (!window.localStorage.getItem(STORAGE_KEYS.LEADERBOARDS)) {
    storage.set(STORAGE_KEYS.LEADERBOARDS, INITIAL_LEADERBOARDS);
  }
  if (!window.localStorage.getItem(STORAGE_KEYS.PARTICIPATIONS)) {
    storage.set(STORAGE_KEYS.PARTICIPATIONS, {});
  }
}

export function getHackathons(): Hackathon[] {
  return storage.get<Hackathon[]>(STORAGE_KEYS.HACKATHONS) ?? [];
}

export function getTeams(): Team[] {
  return storage.get<Team[]>(STORAGE_KEYS.TEAMS) ?? [];
}

export function getSubmissions(): Submission[] {
  return storage.get<Submission[]>(STORAGE_KEYS.SUBMISSIONS) ?? [];
}

export function getLeaderboards(): Leaderboard[] {
  return storage.get<Leaderboard[]>(STORAGE_KEYS.LEADERBOARDS) ?? [];
}
