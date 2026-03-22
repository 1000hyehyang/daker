import type {
  Hackathon,
  HackathonDetail,
  HackathonPrizeSection,
  HackathonSections,
  Leaderboard,
  LeaderboardEntry,
  Submission,
  Team,
} from "@/lib/types/models";
import hackathonDetailRaw from "@/lib/mock/hackathon_detail_raw.json";
import hackathonsJson from "@/lib/mock/hackathons.json";
import leaderboardRaw from "@/lib/mock/leaderboard_raw.json";
import monthlyHackathonDetail from "@/lib/mock/monthly_hackathon_detail.json";
import submissionsJson from "@/lib/mock/submissions.json";
import teamsJson from "@/lib/mock/teams.json";

type RawDetailRoot = typeof hackathonDetailRaw;

const EMPTY_PRIZE: HackathonPrizeSection = { items: [] };

function ensureSections(sections: Partial<HackathonSections>): HackathonSections {
  const prize: HackathonPrizeSection = sections.prize ?? EMPTY_PRIZE;
  return {
    overview: sections.overview!,
    info: sections.info!,
    eval: sections.eval!,
    schedule: sections.schedule!,
    prize,
    teams: sections.teams!,
    submit: sections.submit!,
    leaderboard: sections.leaderboard!,
  };
}

function buildMonthlyDetail(hackathons: Hackathon[]): HackathonDetail {
  const { slug, titleFallback, sections: rawSections } = monthlyHackathonDetail;
  const row = hackathons.find((h) => h.slug === slug);
  const title = row?.title ?? titleFallback;

  return {
    slug,
    title,
    sections: ensureSections(rawSections as Partial<HackathonSections>),
  };
}

function rawToDetail(
  slug: string,
  title: string,
  sections: RawDetailRoot["sections"] | RawDetailRoot["extraDetails"][0]["sections"],
): HackathonDetail {
  return {
    slug,
    title,
    sections: ensureSections(sections as Partial<HackathonSections>),
  };
}

/** slug → 상세 (정적 JSON + 월간 보강) */
export function buildHackathonDetailsMap(
  hackathons: Hackathon[],
): Record<string, HackathonDetail> {
  const root = hackathonDetailRaw as RawDetailRoot;
  const map: Record<string, HackathonDetail> = {};

  map[root.slug] = rawToDetail(root.slug, root.title, root.sections);

  for (const extra of root.extraDetails ?? []) {
    map[extra.slug] = rawToDetail(extra.slug, extra.title, extra.sections);
  }

  map[monthlyHackathonDetail.slug] = buildMonthlyDetail(hackathons);

  return map;
}

function mapLeaderboardEntries(
  entries: Array<{
    rank: number;
    teamName: string;
    score: number;
    submittedAt?: string;
    scoreBreakdown?: { participant: number; judge: number };
  }>,
): LeaderboardEntry[] {
  return entries.map((e) => ({
    rank: e.rank,
    teamName: e.teamName,
    score: e.score,
    submittedAt: e.submittedAt,
    scoreBreakdown: e.scoreBreakdown,
  }));
}

/** 리더보드 원본 → HackathonSlug별 배열 */
export function buildInitialLeaderboards(): Leaderboard[] {
  const main: Leaderboard = {
    hackathonSlug: leaderboardRaw.hackathonSlug,
    entries: mapLeaderboardEntries(leaderboardRaw.entries),
  };

  const extras = (leaderboardRaw.extraLeaderboards ?? []).map((lb) => ({
    hackathonSlug: lb.hackathonSlug,
    entries: mapLeaderboardEntries(lb.entries),
  }));

  const withMonthly: Leaderboard[] = [
    ...extras,
    main,
    {
      hackathonSlug: monthlyHackathonDetail.slug,
      entries: [],
    },
  ];

  const seen = new Set<string>();
  return withMonthly.filter((lb) => {
    if (seen.has(lb.hackathonSlug)) return false;
    seen.add(lb.hackathonSlug);
    return true;
  });
}

export const INITIAL_HACKATHONS: Hackathon[] = hackathonsJson as Hackathon[];
export const INITIAL_TEAMS: Team[] = teamsJson as Team[];
export const INITIAL_SUBMISSIONS: Submission[] =
  submissionsJson as Submission[];
export const INITIAL_LEADERBOARDS: Leaderboard[] = buildInitialLeaderboards();
