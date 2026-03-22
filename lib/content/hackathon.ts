import type { HackathonSectionId } from "@/lib/hackathon-tabs";
import type { Hackathon } from "@/lib/types/models";

/** 목록·카드·필터 공통 상태 라벨 */
export const HACKATHON_STATUS_LABEL: Record<Hackathon["status"], string> = {
  ongoing: "진행 중",
  upcoming: "예정",
  ended: "종료",
};

export type HackathonFilterStatus = Hackathon["status"] | "all";

export const HACKATHON_FILTER_OPTIONS: {
  value: HackathonFilterStatus;
  label: string;
}[] = [
  { value: "all", label: "전체" },
  { value: "ongoing", label: "진행 중" },
  { value: "upcoming", label: "예정" },
  { value: "ended", label: "종료" },
];

export const HACKATHON_TAB_LABELS: Record<HackathonSectionId, string> = {
  overview: "개요",
  info: "공지",
  evaluation: "평가",
  schedule: "일정",
  prize: "상금",
  teams: "팀",
  submit: "제출",
  leaderboard: "리더보드",
};

/** 상세 사이드 메타 — 제출 상태 요약 */
export const SUBMISSION_SUMMARY_LABEL = {
  submitted: "제출 완료",
  draft: "임시저장",
  none: "없음",
} as const;

export const hackathonUiAria = {
  /** 스크롤 문서의 앵커 내비게이션 */
  sectionNav: "해커톤 섹션",
  statusFilter: "해커톤 상태 필터",
} as const;

export const hackathonListCopy = {
  emptyAllTitle: "등록된 해커톤이 없습니다",
  emptyAllHint:
    "localStorage가 비어 있거나 손상된 경우입니다. 페이지를 새로고침하거나 브라우저 저장소를 초기화해 보세요.",
  emptyFilterTitle: "필터 결과가 없습니다",
  emptyFilterHint: "다른 상태를 선택해 보세요.",
} as const;
