/**
 * DAKER 해커톤 랜딩 — 이벤트/프로덕트 페이지용 카피 (포트폴리오 구조 아님)
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
      "DAKER는 외부 API 없이 동작하는 해커톤 플로우 데모입니다. 목록·상세·팀·제출·리더보드를 localStorage로 연결해, 실제 행사 전에 흐름을 끝까지 검증할 수 있습니다.",
    columns: [
      {
        title: "대상",
        body: "프론트·백·디자인·기획 팀을 구성해 제한된 시간 안에 결과물을 내는 개발자·메이커.",
      },
      {
        title: "목표",
        body: "기획서·프로토타입·제출 규칙에 맞춘 아티팩트를 제출하고, 투명한 스코어로 순위를 확인합니다.",
      },
      {
        title: "방식",
        body: "브라우저 저장소 기반 데모이므로, 설치 없이 링크만으로 참여·리허설이 가능합니다.",
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
        desc: "모집 → 팀 → 제출 → 랭킹까지 단일 UI에서 연습할 수 있습니다.",
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
        desc: "데이터가 로컬에만 있어 반복 테스트에 적합합니다.",
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
        desc: "안정적인 빌드, 에지 케이스, 제출 가능한 데모 품질.",
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
    timezone: "KST 기준 · 예시 타임라인",
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
    subtitle: "과거 해커톤에서 나올 법한 결과물 유형입니다. (데모용 예시)",
    slides: [
      {
        title: "실시간 협업 보드",
        desc: "WebSocket 대신 로컬 시뮬레이션으로 UX 검증.",
        tags: ["React", "CRDT", "Demo"],
      },
      {
        title: "스코어 대시보드",
        desc: "팀별 지표·브레이크다운을 한 화면에.",
        tags: ["Visualization", "a11y"],
      },
      {
        title: "제출 파이프라인",
        desc: "초안 저장 → 최종 잠금까지 상태 머신 UI.",
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
    subtitle: "답은 기본적으로 펼쳐 두었습니다. 추가 문의는 행사 운영 채널을 이용해 주세요.",
    items: [
      {
        q: "실제 대회와 동일한가요?",
        a: "이 저장소는 플로우 검증용 데모입니다. 규칙·일정은 콘텐츠로 교체할 수 있습니다.",
      },
      {
        q: "데이터는 어디에 저장되나요?",
        a: "브라우저 localStorage입니다. 기기·브라우저마다 다릅니다.",
      },
      {
        q: "팀은 몇 명까지인가요?",
        a: "해커톤 상세의 팀 정책을 따릅니다. 데모 데이터에서 조정 가능합니다.",
      },
      {
        q: "제출 후 수정할 수 있나요?",
        a: "데모에서는 최종 제출 후 잠금 상태를 보여 줄 수 있습니다.",
      },
    ],
  },
  cta: {
    id: "cta",
    eyebrow: "Join",
    title: "지금 플로우를 경험해 보세요",
    body: "목록에서 해커톤을 고르고, 캠프에서 팀을 만들거나 참여한 뒤 제출·랭킹까지 이동해 보세요.",
    primary: "해커톤 목록",
    secondary: "팀 캠프 열기",
  },
  footer: {
    product: "DAKER Hackathon Platform",
    note: "Local demo · No external API",
    links: [
      { href: "/hackathons", label: "해커톤" },
      { href: "/camp", label: "캠프" },
      { href: "/rankings", label: "랭킹" },
    ],
  },
} as const;
