import { teamFormCopy } from "@/lib/content/teamForm";
import { STORAGE_KEYS, storage } from "@/lib/storage";
import type { Team } from "@/lib/types/models";

function generateTeamCode(): string {
  const part =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID().slice(0, 8)
      : Math.random().toString(36).slice(2, 10);
  return `T-${part}`.toUpperCase();
}

export interface CreateTeamInput {
  hackathonSlug: string;
  name: string;
  isOpen: boolean;
  memberCount: number;
  lookingFor: string[];
  intro: string;
  contact: { type: string; url: string };
}

export function createTeam(input: CreateTeamInput): Team {
  const team: Team = {
    teamCode: generateTeamCode(),
    hackathonSlug: input.hackathonSlug,
    name: input.name.trim(),
    isOpen: input.isOpen,
    memberCount: Math.max(1, input.memberCount),
    lookingFor: input.lookingFor,
    intro: input.intro.trim() || teamFormCopy.defaultIntro,
    contact: {
      type: input.contact.type.trim() || "link",
      url: input.contact.url.trim(),
    },
    createdAt: new Date().toISOString(),
  };

  storage.update<Team[]>(STORAGE_KEYS.TEAMS, (prev) => [...(prev ?? []), team]);
  return team;
}

export function getTeamByCode(teamCode: string): Team | undefined {
  const teams = storage.get<Team[]>(STORAGE_KEYS.TEAMS) ?? [];
  return teams.find((t) => t.teamCode === teamCode);
}
