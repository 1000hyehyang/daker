/** 팀 목록·카드·배지 문구 */
export const teamListCopy = {
  emptyTitle: "등록된 팀이 없습니다",
  emptyHint: "아래 단계에 따라 새 팀을 만들 수 있습니다.",
  sectionEyebrow: "팀 목록",
  sectionDescription:
    "이름과 모집 상태를 먼저 보고, 소개와 메타는 그다음에 읽히도록 배치했습니다.",
} as const;

export const teamRecruitmentBadge = {
  open: "모집 중",
  closed: "마감",
} as const;

export const teamCardCopy = {
  joinCta: "이 팀으로 참여",
  joinHint: "행 아무 곳이나 눌러 참여",
  joinAriaLabelSuffix: " 팀에 참여",
  contactLink: "연락처 열기",
  metaMember: "멤버",
  metaLookingForPrefix: "모집 역할",
  mineBadge: "내 팀",
  cannotJoinOther:
    "이 해커톤에서는 이미 참여한 팀이 있어 다른 팀에 참여할 수 없습니다.",
} as const;
