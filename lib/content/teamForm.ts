/** 팀 생성 폼 — 플레이스홀더·검증·섹션 안내 (데모용 고정 문구) */
export const teamFormCopy = {
  pageEyebrow: "새 팀",
  pageTitle: "팀 등록",
  pageIntro:
    "위에서 팀을 찾은 뒤에도 새로 만들 수 있습니다. 아래는 세 단계로만 나눴습니다.",

  section1Title: "1. 팀 정체성",
  section1Hint: "목록에 가장 크게 보이는 이름과 한 줄 소개입니다.",
  section2Title: "2. 모집·규모",
  section2Hint: "인원과 공개 여부는 다른 참가자가 판단하는 근거가 됩니다.",
  section3Title: "3. 연락",
  section3Hint: "오픈 카톡·폼 등 참가자가 연결될 수 있는 단일 링크입니다.",

  labelName: "팀 이름",
  labelIntro: "한 줄 소개",
  labelMembers: "현재 인원",
  labelRoles: "모집 중인 역할",
  labelContact: "연락 링크",
  labelRecruiting: "팀원 모집 공개",
  recruitingHelp: '끄면 목록에 "마감"으로 표시됩니다.',

  placeholderName: "예: Team Nova",
  placeholderIntro: "무엇을 만들거나 해결하려는지",
  placeholderRoles: "Frontend, Designer (쉼표로 구분)",
  placeholderUrl: "https://",

  errorNameRequired: "팀 이름을 입력하세요.",
  errorCreateFailed: "팀 생성에 실패했습니다.",
  defaultIntro: "소개가 없습니다.",

  submitHint: "제출 시 이 해커톤에 팀이 바로 추가됩니다.",
  submitIdle: "팀 생성하기",
  submitPending: "생성 중…",
} as const;
