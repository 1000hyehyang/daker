/** 상세 페이지 섹션 앵커 id — URL 해시·스크롤 스파이와 공유 */
export const HACKATHON_SECTION_IDS = [
  "overview",
  "info",
  "evaluation",
  "schedule",
  "prize",
  "teams",
  "submit",
  "leaderboard",
] as const;

export type HackathonSectionId = (typeof HACKATHON_SECTION_IDS)[number];

export function isHackathonSectionId(id: string): id is HackathonSectionId {
  return (HACKATHON_SECTION_IDS as readonly string[]).includes(id);
}

/** @deprecated HACKATHON_SECTION_IDS 사용 */
export const HACKATHON_TAB_IDS = HACKATHON_SECTION_IDS;
/** @deprecated HackathonSectionId 사용 */
export type HackathonTabId = HackathonSectionId;
/** @deprecated isHackathonSectionId 사용 */
export const isHackathonTabId = isHackathonSectionId;
