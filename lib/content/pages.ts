/** 공통 버튼·액션 문구 */
export const uiActionsCopy = {
  retry: "다시 시도",
} as const;

/** 페이지별 고정 카피 (라우트 단위) */
export const hackathonsPageCopy = {
  back: "← 홈",
  title: "해커톤",
  description: "상태로 좁혀 보고, 행 전체를 눌러 상세로 이동합니다.",
} as const;

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
    "저장소에 기록된 리더보드를 해커톤별로 나열합니다. 점수와 breakdown을 한눈에 봅니다.",
  loadError: "랭킹 데이터를 불러오지 못했습니다.",
  emptyTitle: "표시할 점수가 없습니다",
  emptyHint: "해커톤 상세에서 제출을 완료하면 여기에 반영됩니다.",
} as const;
