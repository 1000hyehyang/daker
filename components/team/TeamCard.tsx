"use client";

import { motion } from "framer-motion";
import { teamCardCopy, teamRecruitmentBadge } from "@/lib/content/team";
import type { Team } from "@/lib/types/models";

export interface TeamCardProps {
  team: Team;
  isMyTeam?: boolean;
  onJoin?: () => void;
  joinDisabled?: boolean;
}

/**
 * 인벤토리 슬롯형 카드 — 참여 시 전체 행이 눌리는 HUD 인터랙션.
 */
export function TeamCard({
  team,
  isMyTeam,
  onJoin,
  joinDisabled,
}: TeamCardProps) {
  const canJoin = Boolean(onJoin && !isMyTeam && !joinDisabled);
  const recruiting = team.isOpen;

  const meta = (
    <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 border-t border-border pt-4 text-xs text-faint">
      <span>
        {teamCardCopy.metaMember}{" "}
        <span className="font-medium text-muted">{team.memberCount}</span>명
      </span>
      {team.lookingFor.length > 0 && (
        <span className="max-w-full">
          {teamCardCopy.metaLookingForPrefix}{" "}
          <span className="text-muted">{team.lookingFor.join(", ")}</span>
        </span>
      )}
      <a
        href={team.contact.url}
        target="_blank"
        rel="noreferrer"
        className="link font-medium text-accent"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        {teamCardCopy.contactLink}
      </a>
    </div>
  );

  const titleRow = (
    <div className="flex flex-wrap items-center gap-2 gap-y-2">
      <h3 className="text-[1.125rem] font-semibold leading-snug tracking-tight text-foreground md:text-xl">
        {team.name}
      </h3>
      {isMyTeam && (
        <span className="badge badge-mine">{teamCardCopy.mineBadge}</span>
      )}
      <span
        className={
          recruiting ? "badge badge-recruiting" : "badge badge-closed"
        }
      >
        {recruiting
          ? teamRecruitmentBadge.open
          : teamRecruitmentBadge.closed}
      </span>
    </div>
  );

  const body = (
    <>
      <div className="min-w-0 flex-1">
        {titleRow}
        <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.08em] text-faint">
          {team.teamCode}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted">{team.intro}</p>
        {meta}
      </div>
      {canJoin && (
        <div className="flex shrink-0 flex-col justify-center sm:w-[11rem]">
          <div className="btn-primary-emphasis pointer-events-none text-center sm:py-3">
            {teamCardCopy.joinCta}
          </div>
          <p className="mt-2 hidden text-center text-[11px] text-faint sm:block">
            {teamCardCopy.joinHint}
          </p>
        </div>
      )}
    </>
  );

  if (canJoin && onJoin) {
    return (
      <article className="outline-none">
        <motion.div
          role="button"
          tabIndex={0}
          aria-label={`${team.name}${teamCardCopy.joinAriaLabelSuffix}`}
          onClick={onJoin}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onJoin();
            }
          }}
          className="team-row-shell-interactive group flex flex-col gap-4 p-4 sm:flex-row sm:items-stretch sm:gap-6"
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.996 }}
          transition={{ type: "spring", stiffness: 520, damping: 36 }}
        >
          {body}
        </motion.div>
      </article>
    );
  }

  return (
    <article className="team-row-shell overflow-hidden">
      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-stretch sm:gap-6">
        {body}
      </div>
      {joinDisabled && onJoin && !isMyTeam && (
        <p className="border-t border-dashed border-border bg-muted-bg/30 px-4 py-3 text-xs text-muted">
          {teamCardCopy.cannotJoinOther}
        </p>
      )}
    </article>
  );
}
