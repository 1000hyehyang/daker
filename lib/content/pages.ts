/** 공통 버튼·액션 문구 */
export const uiActionsCopy = {
  retry: "다시 시도",
} as const;

/** 페이지별 고정 카피 (라우트 단위) */
export const hackathonsPageCopy = {
  back: "← 홈",
  title: "해커톤",
  description:
    "상태별로 모아 보고, 카드를 눌러 상세 안내와 일정·팀·제출을 확인할 수 있습니다.",
} as const;

/** 목록 상단 통계 한 줄 (전체 N · 표시 M) */
export function hackathonsPageStatsLine(total: number, shown: number) {
  return `전체 ${total}개 · 표시 ${shown}개`;
}

export const hackathonDetailPageCopy = {
  back: "← 해커톤 목록",
} as const;

export const campPageCopy = {
  back: "← 홈",
  title: "캠프",
  description:
    "해커톤을 고르면 해당 대회의 팀만 보입니다. 목록은 구분선으로만 나뉩니다.",
  filterLabel: "해커톤",
  filterAllOption: "전체",
  myTeamDt: "이 대회에서 내 팀",
  leaveParticipation: "참여 해제",
  emptyCode: "—",
  createHint: "팀을 만들려면 위에서 특정 해커톤을 선택하세요.",
  loadingTeams: "팀 목록을 불러오는 중…",
} as const;

export const rankingsPageCopy = {
  back: "← 홈",
  title: "랭킹",
  description:
    "제출·집계된 결과를 바탕으로 한 리더보드를 해커톤별로 확인합니다. 점수와 세부 항목을 한눈에 볼 수 있습니다.",
  loadError: "랭킹 데이터를 불러오지 못했습니다.",
  emptyTitle: "표시할 점수가 없습니다",
  emptyHint: "해커톤 상세에서 제출을 완료하면 여기에 반영됩니다.",
} as const;
