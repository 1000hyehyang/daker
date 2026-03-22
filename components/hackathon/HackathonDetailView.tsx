"use client";

import type { ReactNode } from "react";
import { useCallback, useEffect } from "react";
import Link from "next/link";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HackathonSectionNav } from "@/components/hackathon/HackathonSectionNav";
import { HackathonStatusBadge } from "@/components/hackathon/HackathonStatusBadge";
import { ShareHackathonButton } from "@/components/hackathon/ShareHackathonButton";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { LeaderboardTable } from "@/components/leaderboard/LeaderboardTable";
import { ScoreBreakdown } from "@/components/leaderboard/ScoreBreakdown";
import { SubmitForm } from "@/components/submit/SubmitForm";
import { TeamCreateForm } from "@/components/team/TeamCreateForm";
import { TeamList } from "@/components/team/TeamList";
import {
  hackathonDetailHeroCopy,
  hackathonDetailMetaCopy,
  hackathonDetailSectionCopy,
} from "@/lib/content/detailSections";
import {
  HACKATHON_TAB_LABELS,
  SUBMISSION_SUMMARY_LABEL,
} from "@/lib/content/hackathon";
import { leaderboardCopy } from "@/lib/content/leaderboard";
import { useLeaderboardState } from "@/hooks/useLeaderboardState";
import { useParticipationState } from "@/hooks/useParticipationState";
import { useSubmissionState } from "@/hooks/useSubmissionState";
import { useTeams } from "@/hooks/useTeams";
import {
  type HackathonSectionId,
  isHackathonSectionId,
} from "@/lib/hackathon-tabs";
import { computeFinalScore, deriveScoreBreakdown } from "@/lib/score";
import type { Hackathon, HackathonDetail } from "@/lib/types/models";
import { formatDateShort } from "@/lib/utils/format";

function sumPrizeKRW(items: { amountKRW: number }[]) {
  return items.reduce((sum, p) => sum + p.amountKRW, 0);
}

export interface HackathonDetailViewProps {
  hackathon: Hackathon;
  detail: HackathonDetail;
}

function SectionBlock({
  id,
  title,
  children,
}: {
  id: HackathonSectionId;
  title: string;
  children: ReactNode;
}) {
  return (
    <ScrollReveal
      as="section"
      id={id}
      className="scroll-mt-28 border-t border-border/80 pb-16 pt-20 first:border-t-0 first:pb-12 first:pt-14"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="hack-section-title">{title}</h2>
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
          #{id}
        </span>
      </div>
      <div className="hack-section-body">{children}</div>
    </ScrollReveal>
  );
}

export function HackathonDetailView({
  hackathon,
  detail,
}: HackathonDetailViewProps) {
  const slug = hackathon.slug;
  const { sections } = detail;

  useEffect(() => {
    const raw = window.location.hash.replace(/^#/, "");
    if (!raw || !isHackathonSectionId(raw)) return;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document
          .getElementById(raw)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
        ScrollTrigger.refresh();
      });
    });
  }, []);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(() => ScrollTrigger.refresh(), 120);
    };
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const {
    teams,
    loading: teamsLoading,
    error: teamsError,
    reload: reloadTeams,
  } = useTeams(slug);

  const {
    myTeamCode,
    join,
    leave,
    reload: reloadParticipation,
  } = useParticipationState(slug);

  const { submission, reload: reloadSubmission } = useSubmissionState(
    slug,
    myTeamCode,
  );

  const {
    leaderboard,
    loading: lbLoading,
    reload: reloadLeaderboard,
  } = useLeaderboardState(slug);

  const refreshAfterTeam = useCallback(
    (newTeamCode?: string) => {
      reloadTeams();
      reloadParticipation();
      if (newTeamCode) join(newTeamCode);
    },
    [join, reloadParticipation, reloadTeams],
  );

  const refreshSubmission = useCallback(() => {
    reloadSubmission();
    reloadLeaderboard();
  }, [reloadLeaderboard, reloadSubmission]);

  const demoBreakdown =
    myTeamCode && submission?.status === "submitted"
      ? deriveScoreBreakdown(myTeamCode, slug)
      : undefined;

  const goToTeams = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document
      .getElementById("teams")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", "#teams");
  };

  const prizeSum = sumPrizeKRW(sections.prize.items);

  return (
    <>
    <div className="mt-6 pb-[calc(5.5rem+env(safe-area-inset-bottom,0px))] lg:mt-10 lg:flex lg:gap-10 lg:pb-0">
      <aside className="mb-8 hidden shrink-0 lg:mb-0 lg:block lg:w-52">
        <div className="sticky top-28">
          <HackathonSectionNav layout="vertical" />
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="hack-detail-hero pb-8 pt-2 sm:pb-10 sm:pt-4">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
            <ScrollReveal
              as="div"
              className="min-w-0 flex-1"
              start="top 93%"
              y={12}
              duration={0.5}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <HackathonStatusBadge status={hackathon.status} />
                <ShareHackathonButton />
              </div>
              <h1 className="mt-5 text-display text-foreground lg:max-w-[20ch]">
                {hackathon.title}
              </h1>
              {hackathon.organizer && (
                <p className="mt-3 text-xs font-medium text-faint">
                  주최{" "}
                  <span className="text-muted">{hackathon.organizer}</span>
                </p>
              )}
              <p className="mt-4 max-w-measure text-sm leading-relaxed text-muted">
                {sections.overview.summary}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {hackathon.tags.map((tag) => (
                  <span key={tag} className="team-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </ScrollReveal>

            <dl className="hack-sticky-meta w-full shrink-0 space-y-0 py-1 pl-4 text-sm sm:pl-5 lg:sticky lg:top-28 lg:z-10 lg:w-[min(100%,19rem)] lg:self-start">
              <div className="border-b border-border pb-4">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-faint">
                  {hackathonDetailMetaCopy.myTeamDt}
                </dt>
                <dd className="mt-2 font-mono text-sm text-foreground">
                  {myTeamCode ?? hackathonDetailMetaCopy.emptyCode}
                  {myTeamCode && (
                    <button
                      type="button"
                      onClick={() => {
                        leave();
                        reloadSubmission();
                      }}
                      className="btn-ghost ml-3 p-0 text-xs font-sans text-muted"
                    >
                      {hackathonDetailMetaCopy.leaveTeam}
                    </button>
                  )}
                </dd>
              </div>
              <div className="pb-4 pt-4">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-faint">
                  {hackathonDetailMetaCopy.submitDt}
                </dt>
                <dd className="mt-2 font-semibold text-foreground">
                  {submission?.status === "submitted"
                    ? SUBMISSION_SUMMARY_LABEL.submitted
                    : submission?.status === "draft"
                      ? SUBMISSION_SUMMARY_LABEL.draft
                      : SUBMISSION_SUMMARY_LABEL.none}
                </dd>
              </div>
              {sections.teams.campEnabled && (
                <div className="border-t border-border pt-4">
                  <Link
                    href={`/camp?hackathon=${encodeURIComponent(slug)}`}
                    className="btn-secondary flex w-full justify-center text-center text-sm"
                  >
                    {hackathonDetailMetaCopy.campCta}
                  </Link>
                </div>
              )}
            </dl>
          </div>

          <ScrollReveal
            as="div"
            start="top 93%"
            y={12}
            duration={0.5}
          >
            <div className="hack-stat-row">
              <div className="hack-stat-item">
                <p className="hack-stat-item__label">
                  {hackathonDetailMetaCopy.deadlineLabel}
                </p>
                <p className="hack-stat-item__value font-mono">
                  {formatDateShort(hackathon.period.submissionDeadlineAt)}
                </p>
              </div>
              <div className="hack-stat-item">
                <p className="hack-stat-item__label">
                  {hackathonDetailMetaCopy.endLabel}
                </p>
                <p className="hack-stat-item__value font-mono">
                  {formatDateShort(hackathon.period.endAt)}
                </p>
              </div>
              {sections.prize.items.length > 0 && (
                <div className="hack-stat-item">
                  <p className="hack-stat-item__label">
                    {hackathonDetailHeroCopy.statPrize}
                  </p>
                  <p className="hack-stat-item__value">
                    <span className="font-mono tabular-nums">
                      {prizeSum.toLocaleString("ko-KR")}
                    </span>
                    <span className="ml-1 text-sm font-medium text-muted">원</span>
                  </p>
                </div>
              )}
              {hackathon.stats?.participantCount != null && (
                <div className="hack-stat-item">
                  <p className="hack-stat-item__label">
                    {hackathonDetailHeroCopy.statParticipants}
                  </p>
                  <p className="hack-stat-item__value font-mono">
                    {hackathon.stats.participantCount.toLocaleString("ko-KR")}
                  </p>
                </div>
              )}
              {hackathon.stats?.viewCount != null && (
                <div className="hack-stat-item">
                  <p className="hack-stat-item__label">
                    {hackathonDetailHeroCopy.statViews}
                  </p>
                  <p className="hack-stat-item__value font-mono">
                    {hackathon.stats.viewCount.toLocaleString("ko-KR")}
                  </p>
                </div>
              )}
            </div>
          </ScrollReveal>
        </header>

        <div className="space-y-0">
        <SectionBlock id="overview" title={HACKATHON_TAB_LABELS.overview}>
          <div className="grid gap-10 sm:grid-cols-2">
            <div>
              <p className="eyebrow">개요</p>
              <p className="mt-3 text-base leading-relaxed text-foreground">
                {sections.overview.summary}
              </p>
            </div>
            <div className="border-t border-border/70 pt-8 sm:border-l sm:border-t-0 sm:pl-10 sm:pt-0">
              <p className="eyebrow">{hackathonDetailSectionCopy.teamPolicyTitle}</p>
              <dl className="mt-4 space-y-0 text-sm">
                <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-border/80 py-3 first:pt-0">
                  <dt className="text-faint">
                    {hackathonDetailSectionCopy.soloLinePrefix}
                  </dt>
                  <dd className="font-semibold text-foreground">
                    {sections.overview.teamPolicy.allowSolo
                      ? hackathonDetailSectionCopy.soloYes
                      : hackathonDetailSectionCopy.soloNo}
                  </dd>
                </div>
                <div className="flex flex-wrap items-baseline justify-between gap-3 py-3">
                  <dt className="text-faint">
                    {hackathonDetailSectionCopy.maxMembersPrefix}
                  </dt>
                  <dd className="font-semibold text-foreground">
                    <span className="tabular-nums">
                      {sections.overview.teamPolicy.maxTeamSize}
                    </span>
                    {hackathonDetailSectionCopy.maxMembersSuffix}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </SectionBlock>

        <SectionBlock id="info" title={HACKATHON_TAB_LABELS.info}>
          <div className="space-y-10">
          <ul className="list-inside list-disc space-y-3 text-muted">
            {sections.info.notice.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-faint">
              {hackathonDetailSectionCopy.linksHeading}
            </p>
            <ul className="mt-4 space-y-2">
              {Object.entries(sections.info.links).map(([key, url]) => (
                <li key={key}>
                  <a href={url} target="_blank" rel="noreferrer" className="link">
                    {key.toUpperCase()}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          </div>
        </SectionBlock>

        <SectionBlock id="evaluation" title={HACKATHON_TAB_LABELS.evaluation}>
          <div className="hack-eval">
            <div className="hack-eval__lead">
              <p className="text-base leading-relaxed text-foreground">
                <span className="font-semibold">{sections.eval.metricName}</span>
                <span className="text-muted"> — {sections.eval.description}</span>
              </p>
            </div>
            {sections.eval.limits && (
              <ul className="hack-eval__limits">
                {Object.entries(sections.eval.limits).map(([k, v]) => (
                  <li key={k}>
                    <span className="text-faint">{k}</span>
                    <span className="mx-2 text-border">·</span>
                    <span className="font-mono tabular-nums text-foreground">
                      {v}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            {sections.eval.scoreDisplay ? (
              <div className="hack-eval__breakdown">
                <p className="font-semibold text-foreground">
                  {sections.eval.scoreDisplay.label}
                </p>
                <ul className="mt-3 space-y-2">
                  {sections.eval.scoreDisplay.breakdown.map((b) => (
                    <li
                      key={b.key}
                      className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border/70 py-3 last:border-b-0"
                    >
                      <span className="text-muted">{b.label}</span>
                      <span className="font-mono text-sm tabular-nums text-foreground">
                        {b.weightPercent}%{" "}
                        <span className="text-faint">({b.key})</span>
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-xs leading-relaxed text-faint">
                  {hackathonDetailSectionCopy.evalPrdNote}
                </p>
              </div>
            ) : (
              <p className="text-faint">
                {hackathonDetailSectionCopy.evalFallback}
              </p>
            )}
          </div>
        </SectionBlock>

        <SectionBlock id="schedule" title={HACKATHON_TAB_LABELS.schedule}>
          <p className="text-xs font-semibold uppercase tracking-wide text-faint">
            {hackathonDetailSectionCopy.timezonePrefix}{" "}
            <span className="text-muted">{sections.schedule.timezone}</span>
          </p>
          <div className="hack-timeline">
            {sections.schedule.milestones.map((m) => (
              <div key={m.at + m.name} className="hack-timeline__item">
                <span className="hack-timeline__dot" aria-hidden />
                <p className="font-semibold text-foreground">{m.name}</p>
                <p className="mt-1.5 font-mono text-xs text-faint">
                  {formatDateShort(m.at)} · {m.at}
                </p>
              </div>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock id="prize" title={HACKATHON_TAB_LABELS.prize}>
          {sections.prize.items.length === 0 ? (
            <p className="text-faint">
              {hackathonDetailSectionCopy.prizeEmpty}
            </p>
          ) : (
            <table className="hack-prize-table">
              <tbody>
                {sections.prize.items.map((p) => (
                  <tr key={p.place}>
                    <th scope="row" className="align-middle text-foreground">
                      {p.place}
                    </th>
                    <td className="text-right">
                      <span className="hack-prize-amount">
                        {p.amountKRW.toLocaleString("ko-KR")}
                        <span className="ml-1 text-sm font-medium text-muted">
                          원
                        </span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </SectionBlock>

        <ScrollReveal
          as="section"
          id="teams"
          className="scroll-mt-28 border-t border-border/80 pb-16 pt-20"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="hack-section-title">
                {HACKATHON_TAB_LABELS.teams}
              </h2>
              <p className="mt-3 max-w-measure text-sm leading-relaxed text-muted">
                {hackathonDetailMetaCopy.teamsLead}
              </p>
            </div>
            {sections.teams.campEnabled && (
              <Link
                href={`/camp?hackathon=${encodeURIComponent(slug)}`}
                className="btn-secondary shrink-0 text-sm"
              >
                {hackathonDetailMetaCopy.campCta}
              </Link>
            )}
          </div>

          <div className="mt-10 space-y-8">
            {teamsLoading && (
              <p className="text-sm text-muted">
                {hackathonDetailSectionCopy.teamsLoading}
              </p>
            )}
            {teamsError && (
              <div className="state-error" role="alert">
                {teamsError}
              </div>
            )}
            {!teamsLoading && !teamsError && (
              <TeamList
                teams={teams}
                myTeamCode={myTeamCode}
                onJoinTeam={(code) => {
                  join(code);
                  reloadSubmission();
                }}
                joinDisabled={Boolean(myTeamCode)}
              />
            )}
            <TeamCreateForm
              hackathonSlug={slug}
              onCreated={(teamCode) => refreshAfterTeam(teamCode)}
            />
          </div>
        </ScrollReveal>

        <SectionBlock id="submit" title={HACKATHON_TAB_LABELS.submit}>
          {!myTeamCode ? (
            <div className="state-empty max-w-measure">
              <p>
                {hackathonDetailSectionCopy.submitPrereqBefore}{" "}
                <a
                  href="#teams"
                  className="link font-medium"
                  onClick={goToTeams}
                >
                  {hackathonDetailSectionCopy.submitPrereqLink}
                </a>
                {hackathonDetailSectionCopy.submitPrereqAfter}
              </p>
            </div>
          ) : (
            <div className="form-panel">
              <SubmitForm
                hackathonSlug={slug}
                teamCode={myTeamCode}
                guideLines={sections.submit.guide}
                submission={submission}
                onUpdated={refreshSubmission}
              />
            </div>
          )}
          {demoBreakdown && (
            <div className="mt-8 border-l-2 border-border pl-4 text-muted">
              <p className="text-xs font-semibold uppercase tracking-wide text-faint">
                {hackathonDetailSectionCopy.scorePreviewTitle}
              </p>
              <div className="mt-2">
                <ScoreBreakdown breakdown={demoBreakdown} />
              </div>
              <p className="mt-2 text-xs text-faint">
                {hackathonDetailSectionCopy.scorePreviewFormula}{" "}
                {computeFinalScore(demoBreakdown).toFixed(2)}{" "}
                {hackathonDetailSectionCopy.scorePreviewSuffix}
              </p>
            </div>
          )}
        </SectionBlock>

        <SectionBlock id="leaderboard" title={HACKATHON_TAB_LABELS.leaderboard}>
          <p className="mb-6 text-faint leading-relaxed">{sections.leaderboard.note}</p>
          {lbLoading && (
            <p className="text-muted">
              {hackathonDetailSectionCopy.leaderboardLoading}
            </p>
          )}
          {!lbLoading && (
            <LeaderboardTable
              entries={leaderboard?.entries ?? []}
              emptyLabel={leaderboardCopy.detailEmpty}
            />
          )}
        </SectionBlock>
        </div>
      </div>
    </div>

    <HackathonSectionNav
      layout="bottom"
      className="fixed bottom-0 left-0 right-0 z-[var(--z-sticky)] lg:hidden"
    />
    </>
  );
}
