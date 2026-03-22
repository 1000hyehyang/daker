import { buildHackathonDetailsMap, INITIAL_HACKATHONS } from "@/lib/initial-data";
import type { HackathonDetail } from "@/lib/types/models";

const detailMap: Record<string, HackathonDetail> = buildHackathonDetailsMap(
  INITIAL_HACKATHONS,
);

export function getHackathonDetailBySlug(slug: string): HackathonDetail | undefined {
  return detailMap[slug];
}

export function listHackathonDetailSlugs(): string[] {
  return Object.keys(detailMap);
}
