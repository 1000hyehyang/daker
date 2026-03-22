"use client";

import type { ReactNode } from "react";
import { useCallback, useEffect } from "react";
import Link from "next/link";
import { HackathonSectionNav } from "@/components/hackathon/HackathonSectionNav";
import { LeaderboardTable } from "@/components/leaderboard/LeaderboardTable";
import { ScoreBreakdown } from "@/components/leaderboard/ScoreBreakdown";
import { SubmitForm } from "@/components/submit/SubmitForm";
import { TeamCreateForm } from "@/components/team/TeamCreateForm";
import { TeamList } from "@/components/team/TeamList";
import {
  hackathonDetailMetaCopy,
  hackathonDetailSectionCopy,
} from "@/lib/content/detailSections";
import {
  HACKATHON_STATUS_LABEL,
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
    <section
      id={id}
      className="scroll-mt-28 border-t border-border pt-14 first:border-t-0 first:pt-12"
    >
      <h2 className="text-title tracking-tight text-foreground">{title}</h2>
      <div className="mt-8 space-y-4 text-sm leading-relaxed text-muted">
        {children}
      </div>
    </section>
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
      });
    });
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

  return (
    <div className="mt-10">
      <header className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
        <div className="max-w-measure flex-1">
          <p className="eyebrow">{HACKATHON_STATUS_LABEL[hackathon.status]}</p>
          <h1 className="mt-3 text-display text-foreground lg:max-w-[20ch]">
            {hackathon.title}
          </h1>
          <p className="mt-4 text-sm text-muted">
            {hackathonDetailMetaCopy.deadlineLabel}{" "}
            {formatDateShort(hackathon.period.submissionDeadlineAt)}{" "}
            {hackathonDetailMetaCopy.metaSep} {hackathonDetailMetaCopy.endLabel}{" "}
            {formatDateShort(hackathon.period.endAt)}
          </p>
          <p className="mt-6 text-xs leading-relaxed text-faint">
            {hackathon.tags.join(" · ")}
          </p>
        </div>

        <dl className="w-full shrink-0 space-y-4 border-t border-border pt-6 text-sm lg:w-64 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
          <div>
            <dt className="text-faint">{hackathonDetailMetaCopy.myTeamDt}</dt>
            <dd className="mt-1 font-mono text-foreground">
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
          <div>
            <dt className="text-faint">{hackathonDetailMetaCopy.submitDt}</dt>
            <dd className="mt-1 text-foreground">
              {submission?.status === "submitted"
                ? SUBMISSION_SUMMARY_LABEL.submitted
                : submission?.status === "draft"
                  ? SUBMISSION_SUMMARY_LABEL.draft
                  : SUBMISSION_SUMMARY_LABEL.none}
            </dd>
          </div>
        </dl>
      </header>

      <div className="mt-12">
        <HackathonSectionNav />
      </div>

      <div className="mt-10 space-y-0">
        <SectionBlock id="overview" title={HACKATHON_TAB_LABELS.overview}>
          <p className="text-base text-foreground">{sections.overview.summary}</p>
          <div className="border-l-2 border-border pl-4 text-muted">
            <p className="text-xs font-semibold uppercase tracking-wide text-faint">
              {hackathonDetailSectionCopy.teamPolicyTitle}
            </p>
            <ul className="mt-3 list-inside list-disc space-y-1">
              <li>
                {hackathonDetailSectionCopy.soloLinePrefix}{" "}
                {sections.overview.teamPolicy.allowSolo
                  ? hackathonDetailSectionCopy.soloYes
                  : hackathonDetailSectionCopy.soloNo}
              </li>
              <li>
                {hackathonDetailSectionCopy.maxMembersPrefix}{" "}
                {sections.overview.teamPolicy.maxTeamSize}
                {hackathonDetailSectionCopy.maxMembersSuffix}
              </li>
            </ul>
          </div>
        </SectionBlock>

        <SectionBlock id="info" title={HACKATHON_TAB_LABELS.info}>
          <ul className="list-inside list-disc space-y-2 text-muted">
            {sections.info.notice.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-faint">
              {hackathonDetailSectionCopy.linksHeading}
            </p>
            <ul className="mt-3 space-y-2">
              {Object.entries(sections.info.links).map(([key, url]) => (
                <li key={key}>
                  <a href={url} target="_blank" rel="noreferrer" className="link">
                    {key.toUpperCase()}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </SectionBlock>

        <SectionBlock id="evaluation" title={HACKATHON_TAB_LABELS.evaluation}>
          <p>
            <span className="font-medium text-foreground">
              {sections.eval.metricName}
            </span>{" "}
            — {sections.eval.description}
          </p>
          {sections.eval.limits && (
            <ul className="text-muted">
              {Object.entries(sections.eval.limits).map(([k, v]) => (
                <li key={k}>
                  {k}: {v}
                </li>
              ))}
            </ul>
          )}
          {sections.eval.scoreDisplay ? (
            <div className="border-l-2 border-border pl-4">
              <p className="font-medium text-foreground">
                {sections.eval.scoreDisplay.label}
              </p>
              <ul className="mt-2 space-y-1">
                {sections.eval.scoreDisplay.breakdown.map((b) => (
                  <li key={b.key}>
                    {b.label}: {b.weightPercent}% ({b.key})
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-faint">
                {hackathonDetailSectionCopy.evalPrdNote}
              </p>
            </div>
          ) : (
            <p className="text-faint">
              {hackathonDetailSectionCopy.evalFallback}
            </p>
          )}
        </SectionBlock>

        <SectionBlock id="schedule" title={HACKATHON_TAB_LABELS.schedule}>
          <p className="text-faint">
            {hackathonDetailSectionCopy.timezonePrefix}{" "}
            {sections.schedule.timezone}
          </p>
          <ol className="relative mt-4 border-l border-border pl-5">
            {sections.schedule.milestones.map((m) => (
              <li key={m.at + m.name} className="mb-8 last:mb-0">
                <span className="absolute -left-[3px] top-1.5 h-[7px] w-[7px] rounded-full bg-foreground" />
                <p className="font-medium text-foreground">{m.name}</p>
                <p className="mt-1 text-faint">
                  {formatDateShort(m.at)} · {m.at}
                </p>
              </li>
            ))}
          </ol>
        </SectionBlock>

        <SectionBlock id="prize" title={HACKATHON_TAB_LABELS.prize}>
          {sections.prize.items.length === 0 ? (
            <p className="text-faint">
              {hackathonDetailSectionCopy.prizeEmpty}
            </p>
          ) : (
            <table className="w-full text-left text-sm">
              <tbody className="divide-y divide-border border-y border-border">
                {sections.prize.items.map((p) => (
                  <tr key={p.place}>
                    <th className="py-3 pr-6 font-medium text-foreground">
                      {p.place}
                    </th>
                    <td className="py-3 tabular-nums text-muted">
                      {p.amountKRW.toLocaleString("ko-KR")}원
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </SectionBlock>

        <section
          id="teams"
          className="scroll-mt-28 border-t border-border pt-14"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-title tracking-tight text-foreground">
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

          <div className="mt-8 space-y-6">
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
        </section>

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
            <SubmitForm
              hackathonSlug={slug}
              teamCode={myTeamCode}
              guideLines={sections.submit.guide}
              submission={submission}
              onUpdated={refreshSubmission}
            />
          )}
          {demoBreakdown && (
            <div className="border-l-2 border-border pl-4 text-muted">
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
          <p className="text-faint">{sections.leaderboard.note}</p>
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
  );
}
