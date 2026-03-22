/**
 * DAKER 해커톤 랜딩 — 서비스 소개·안내 카피
 */
export const landingCopy = {
  meta: {
    badge: "2025 · Developer Hackathon",
    titleLine1: "DAKER",
    titleLine2: "HACKATHON",
    tagline:
      "48시간 동안 아이디어를 프로덕트로. 팀 빌딩부터 제출·랭킹까지, 브라우저 한 곳에서.",
    ctaPrimary: "해커톤 둘러보기",
    ctaSecondary: "팀 캠프",
    ctaTertiary: "문서 보기",
  },
  about: {
    id: "about",
    eyebrow: "Overview",
    title: "무엇을 만드나요?",
    lead:
      "DAKER는 해커톤 모집부터 상세 안내, 팀 구성, 제출, 리더보드까지 한 흐름으로 이어지는 플랫폼입니다. 행사 운영에 맞춰 규칙·일정·콘텐츠를 구성할 수 있습니다.",
    columns: [
      {
        title: "대상",
        body: "프론트·백·디자인·기획 팀을 구성해 제한된 시간 안에 결과물을 내는 개발자·메이커.",
      },
      {
        title: "목표",
        body: "기획서·프로토타입·제출 규칙에 맞춘 아티팩트를 제출하고, 공개된 기준에 따라 순위를 확인합니다.",
      },
      {
        title: "방식",
        body: "별도 설치 없이 웹 브라우저에서 참여·리허설이 가능합니다.",
      },
    ],
  },
  features: {
    id: "features",
    eyebrow: "Why join",
    title: "왜 참여해야 할까",
    items: [
      {
        title: "엔드투엔드 플로우",
        desc: "모집 → 팀 → 제출 → 랭킹까지 단일 화면에서 진행할 수 있습니다.",
      },
      {
        title: "상태가 보이는 제출",
        desc: "초안·최종 제출 상태를 명확히 표시해 실수를 줄입니다.",
      },
      {
        title: "팀 단위 스코어",
        desc: "리더보드와 브레이크다운으로 점수 구조를 이해하기 쉽습니다.",
      },
      {
        title: "빠른 리허설",
        desc: "같은 화면에서 반복 연습하고 점검하기에 적합합니다.",
      },
    ],
  },
  tracks: {
    id: "tracks",
    eyebrow: "Tracks",
    title: "트랙 / 테마",
    subtitle: "탭에 숨기지 않고 한 화면에서 구조를 확인할 수 있게 배치했습니다.",
    items: [
      {
        name: "Product & UX",
        desc: "사용자 문제 정의, IA, 프로토타입·피드백 루프.",
        tag: "UX",
      },
      {
        name: "Engineering",
        desc: "안정적인 빌드, 에지 케이스, 제출 가능한 완성도.",
        tag: "DEV",
      },
      {
        name: "Data & Impact",
        desc: "측정 가능한 지표, 스코어와 연결되는 설계.",
        tag: "DATA",
      },
    ],
  },
  schedule: {
    id: "schedule",
    eyebrow: "Timeline",
    title: "일정",
    timezone: "KST 기준 · 예시 일정",
    milestones: [
      { date: "D-14", label: "참가 신청 · 팀 매칭 오픈", detail: "캠프에서 팀 생성·합류" },
      { date: "D-7", label: "킥오프 & 규칙 공지", detail: "제출 가이드·채점 기준 고정" },
      { date: "D-Day", label: "해킹 스타트", detail: "48h 집중 개발" },
      { date: "D+1", label: "제출 마감", detail: "최종 아티팩트 업로드" },
      { date: "D+3", label: "심사 · 랭킹 공개", detail: "리더보드 반영" },
    ],
  },
  showcase: {
    id: "showcase",
    eyebrow: "Showcase",
    title: "프로젝트 예시",
    subtitle: "해커톤에서 다룰 수 있는 결과물 유형을 예시로 정리했습니다.",
    carouselLabel: "슬라이드",
    slides: [
      {
        title: "실시간 협업 보드",
        desc: "협업 화면과 편집 흐름을 설계·검토한 사례입니다.",
        tags: ["React", "CRDT", "Prototype"],
      },
      {
        title: "스코어 대시보드",
        desc: "팀별 지표·브레이크다운을 한 화면에.",
        tags: ["Visualization", "a11y"],
      },
      {
        title: "제출 파이프라인",
        desc: "초안 저장 → 최종 잠금까지 상태를 단계별로 관리하는 UI.",
        tags: ["State machine", "Forms"],
      },
      {
        title: "온보딩 위저드",
        desc: "신규 참가자를 팀 플로우로 안내.",
        tags: ["UX writing", "Wizard"],
      },
    ],
  },
  faq: {
    id: "faq",
    eyebrow: "FAQ",
    title: "자주 묻는 질문",
    subtitle:
      "질문을 눌러 답을 펼칠 수 있습니다. 추가 문의는 행사 운영 채널을 이용해 주세요.",
    items: [
      {
        q: "실제 대회 규칙과 동일한가요?",
        a: "화면에 표시되는 규칙·일정·상금은 주최 측이 등록한 내용을 따릅니다. 행사마다 다를 수 있으니 상세 페이지의 공지를 확인해 주세요.",
      },
      {
        q: "데이터는 어디에 저장되나요?",
        a: "브라우저에 저장됩니다. 사용 중인 기기·브라우저마다 데이터가 분리될 수 있습니다.",
      },
      {
        q: "팀은 몇 명까지인가요?",
        a: "각 해커톤 상세에 안내된 팀 정책(최대 인원 등)을 따릅니다.",
      },
      {
        q: "제출 후 수정할 수 있나요?",
        a: "행사 규정에 따라 초안 저장 후 최종 제출 시점에 잠길 수 있습니다. 해당 해커톤의 제출 안내를 확인해 주세요.",
      },
    ],
  },
  cta: {
    id: "cta",
    eyebrow: "Join",
    title: "지금 해커톤을 시작해 보세요",
    body: "목록에서 해커톤을 고르고, 캠프에서 팀을 만들거나 참여한 뒤 제출·랭킹까지 이어 보세요.",
    primary: "해커톤 목록",
    secondary: "팀 캠프 열기",
  },
  footer: {
    product: "DAKER Hackathon Platform",
    note: "해커톤 모집·팀 빌딩·제출·랭킹을 한 곳에서",
    copyrightTagline: "해커톤 플랫폼",
    links: [
      { href: "/hackathons", label: "해커톤" },
      { href: "/camp", label: "캠프" },
      { href: "/rankings", label: "랭킹" },
    ],
  },
} as const;
