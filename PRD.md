# PRODUCT REQUIREMENTS DOCUMENT (PRD)

---

## 1. 제품 개요

### 1.1 목적

본 서비스는 해커톤 플랫폼을 웹페이지 형태로 구현하는 것을 목표로 한다.
사용자는 다음의 흐름을 수행할 수 있어야 한다.

* 해커톤 목록 조회
* 특정 해커톤 상세 확인
* 팀 생성 및 참여
* 제출 생성 및 제출 상태 관리
* 리더보드 확인

본 서비스는 외부 API 없이, 제공된 JSON 및 localStorage 기반으로 동작해야 한다.

---

## 2. 사용자 시나리오

### 2.1 기본 시나리오

1. 사용자는 메인 페이지에 진입한다.
2. 해커톤 목록 페이지로 이동한다.
3. 특정 해커톤을 선택한다.
4. 상세 페이지에서 정보를 확인한다.
5. 팀을 생성하거나 기존 팀에 참여한다.
6. 제출을 생성하고 제출 상태를 변경한다.
7. 리더보드에서 결과를 확인한다.

---

## 3. 페이지 정의

---

## 3.1 메인 페이지 (/)

### 기능

* 3개의 주요 CTA 제공

  * 해커톤 목록 이동
  * 팀 모집 페이지 이동
  * 랭킹 페이지 이동

---

## 3.2 해커톤 목록 (/hackathons)

### 데이터 소스



### 기능

* 해커톤 카드 리스트 렌더링
* 표시 필드

  * title
  * status
  * tags
  * 기간
* 필터 기능

  * status 기반 필터
* 카드 클릭 시 상세 페이지 이동

---

## 3.3 해커톤 상세 (/hackathons/[slug])

### 데이터 소스



### 구조

상세 페이지는 sections 기반으로 구성된다.

```ts
sections = {
  overview,
  info,
  eval,
  schedule,
  prize,
  teams,
  submit,
  leaderboard
}
```

---

### 3.3.1 Overview

* summary 표시
* 팀 정책 표시

---

### 3.3.2 Info

* notice 리스트 표시
* 외부 링크 표시

---

### 3.3.3 Eval

* 점수 구조 표시
* participant / judge weight 표시

---

### 3.3.4 Schedule

* milestone 타임라인 렌더링

---

### 3.3.5 Prize

* 순위별 상금 표시

---

### 3.3.6 Teams

* 해당 해커톤의 팀 리스트 연결
* 팀 생성 버튼 제공

---

### 3.3.7 Submit

* 제출 가이드 표시
* 제출 입력 폼 제공
* 제출 상태 관리

  * draft
  * submitted

---

### 3.3.8 Leaderboard

* 리더보드 표시
* 점수 및 순위 렌더링

---

## 3.4 팀 모집 페이지 (/camp)

### 데이터 소스



### 기능

* 팀 리스트 표시
* 필터 (hackathonSlug 기반)
* 팀 생성 기능

---

## 3.5 랭킹 페이지 (/rankings)

### 데이터 소스



### 기능

* 전체 리더보드 표시
* 점수 breakdown 표시

---

## 4. 상태 정의

---

## 4.1 localStorage 구조

```ts
{
  hackathons: Hackathon[],
  teams: Team[],
  submissions: Submission[],
  leaderboards: Leaderboard[]
}
```

---

## 4.2 Team

```ts
{
  teamCode: string,
  hackathonSlug: string,
  name: string,
  isOpen: boolean,
  memberCount: number,
  lookingFor: string[],
  intro: string,
  contact: {
    type: string,
    url: string
  },
  createdAt: string
}
```

---

## 4.3 Submission

```ts
{
  hackathonSlug: string,
  teamCode: string,
  status: "draft" | "submitted",
  artifacts: {
    plan?: string,
    webUrl?: string,
    pdfUrl?: string
  },
  updatedAt: string
}
```

---

## 4.4 Leaderboard

```ts
{
  hackathonSlug: string,
  entries: [
    {
      rank: number,
      teamName: string,
      score: number,
      scoreBreakdown?: {
        participant: number,
        judge: number
      }
    }
  ]
}
```

---

## 5. 핵심 기능 요구사항

---

## 5.1 데이터 초기화

* 최초 접속 시 mock JSON을 localStorage에 저장
* 이후 데이터는 localStorage 기준으로 동작

---

## 5.2 제출 로직

* draft 상태로 저장 가능
* submitted 상태로 변경 시:

  * leaderboard 업데이트

---

## 5.3 리더보드 계산

* score = participant * 0.3 + judge * 0.7
  (구조는 제공 JSON 기준) 

---

## 5.4 상태 반영 UI

* 제출 여부 표시
* 팀 참여 여부 표시
* 빈 상태 처리

---

## 5.5 예외 처리

* 잘못된 slug → 404
* 데이터 없음 → empty UI
* localStorage 없음 → 초기화

---

# TECHNICAL REQUIREMENTS DOCUMENT (TRD)

---

## 1. 기술 스택

```txt
Next.js 14 (App Router)
TypeScript
Tailwind CSS 또는 shadcn/ui
localStorage
Vercel
```

---

## 2. 프로젝트 구조

```txt
app/
  page.tsx
  hackathons/
    page.tsx
    [slug]/page.tsx
  camp/page.tsx
  rankings/page.tsx

components/
  hackathon/
  team/
  submit/
  leaderboard/

lib/
  storage.ts
  mock/
  utils/

hooks/
```

---

## 3. 데이터 레이어

---

## 3.1 storage abstraction

```ts
export const storage = {
  get(key: string),
  set(key: string, value: any),
  update(key: string, updater: (prev) => any)
}
```

---

## 3.2 초기 데이터 로딩

```ts
initStorage() {
  if (!localStorage.getItem("hackathons")) {
    loadMockData()
  }
}
```

---

## 4. 핵심 로직

---

## 4.1 제출 처리

```ts
function submitSubmission(submission) {
  saveSubmission(submission)
  updateLeaderboard(submission)
}
```

---

## 4.2 리더보드 업데이트

```ts
function updateLeaderboard(submission) {
  // 제출된 팀 기준으로 점수 계산 후 삽입
}
```

---

## 5. 라우팅

```txt
/                 → 메인
/hackathons       → 목록
/hackathons/[slug] → 상세
/camp             → 팀
/rankings         → 랭킹
```

---

## 6. 컴포넌트 설계

---

## 6.1 Hackathon

* HackathonCard
* HackathonList
* HackathonTabs

---

## 6.2 Team

* TeamList
* TeamCard
* TeamCreateForm

---

## 6.3 Submit

* SubmitForm
* SubmissionStatus

---

## 6.4 Leaderboard

* LeaderboardTable
* ScoreBreakdown

---

## 7. 상태 관리 전략

* 기본: React state
* 필요 시 Zustand 사용

---

## 8. UX 요구사항

---

## 8.1 로딩 상태

* Skeleton UI

---

## 8.2 Empty 상태

* 데이터 없음 시 안내 메시지 표시

---

## 8.3 반응형

* 모바일 기준 우선 설계
