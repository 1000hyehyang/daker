/** 해커톤 목록 카드 상태 */
export type HackathonStatus = "ended" | "ongoing" | "upcoming";

export interface HackathonPeriod {
  timezone: string;
  submissionDeadlineAt: string;
  endAt: string;
}

export interface HackathonLinks {
  detail: string;
  rules?: string;
  faq?: string;
}

/** 목록 카드용 선택 통계 */
export interface HackathonListStats {
  /** 총 상금 합(원) — 상세 prize와 별개로 요약 표시용 */
  prizeTotalKRW?: number;
  participantCount?: number;
  viewCount?: number;
}

/** 목록 API / localStorage hackathons 항목 */
export interface Hackathon {
  slug: string;
  title: string;
  status: HackathonStatus;
  tags: string[];
  thumbnailUrl?: string;
  period: HackathonPeriod;
  links: HackathonLinks;
  /** 주최/운영 표기 (DACON 스타일 목록) */
  organizer?: string;
  stats?: HackathonListStats;
}

export interface TeamContact {
  type: string;
  url: string;
}

export interface Team {
  teamCode: string;
  hackathonSlug: string;
  name: string;
  isOpen: boolean;
  memberCount: number;
  lookingFor: string[];
  intro: string;
  contact: TeamContact;
  createdAt: string;
}

export type SubmissionStatus = "draft" | "submitted";

export interface SubmissionArtifacts {
  plan?: string;
  webUrl?: string;
  pdfUrl?: string;
}

export interface Submission {
  hackathonSlug: string;
  teamCode: string;
  status: SubmissionStatus;
  artifacts: SubmissionArtifacts;
  updatedAt: string;
}

export interface ScoreBreakdown {
  participant: number;
  judge: number;
}

export interface LeaderboardEntry {
  rank: number;
  teamName: string;
  score: number;
  scoreBreakdown?: ScoreBreakdown;
  submittedAt?: string;
}

export interface Leaderboard {
  hackathonSlug: string;
  entries: LeaderboardEntry[];
}

/** 상세 페이지 sections — 예시 JSON 스키마에 맞춘 유연한 타입 */
export interface HackathonOverviewSection {
  summary: string;
  teamPolicy: {
    allowSolo: boolean;
    maxTeamSize: number;
  };
}

export interface HackathonInfoSection {
  notice: string[];
  links: Record<string, string>;
}

export interface HackathonEvalSection {
  metricName: string;
  description: string;
  limits?: Record<string, number>;
  scoreSource?: string;
  scoreDisplay?: {
    label: string;
    breakdown: Array<{
      key: string;
      label: string;
      weightPercent: number;
    }>;
  };
}

export interface HackathonScheduleSection {
  timezone: string;
  milestones: Array<{ name: string; at: string }>;
}

export interface HackathonPrizeSection {
  items: Array<{ place: string; amountKRW: number }>;
}

export interface HackathonTeamsSection {
  campEnabled: boolean;
  listUrl: string;
}

export interface HackathonSubmitSection {
  allowedArtifactTypes: string[];
  submissionUrl: string;
  guide: string[];
  submissionItems?: Array<{
    key: string;
    title: string;
    format: string;
  }>;
}

export interface HackathonLeaderboardSection {
  publicLeaderboardUrl: string;
  note: string;
}

export interface HackathonSections {
  overview: HackathonOverviewSection;
  info: HackathonInfoSection;
  eval: HackathonEvalSection;
  schedule: HackathonScheduleSection;
  prize: HackathonPrizeSection;
  teams: HackathonTeamsSection;
  submit: HackathonSubmitSection;
  leaderboard: HackathonLeaderboardSection;
}

export interface HackathonDetail {
  slug: string;
  title: string;
  sections: HackathonSections;
}
