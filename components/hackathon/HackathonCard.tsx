import Link from "next/link";
import { motion } from "framer-motion";
import { HACKATHON_STATUS_LABEL } from "@/lib/content/hackathon";
import type { Hackathon } from "@/lib/types/models";
import { formatPeriodRange } from "@/lib/utils/format";

const MotionLink = motion(Link);

/** 상태는 라벨·굵기로 구분 — HUD 슬롯형 리스트 행 */
const STATUS_EMPHASIS: Record<Hackathon["status"], string> = {
  ongoing: "font-semibold text-foreground",
  upcoming: "text-muted",
  ended: "text-faint",
};

export interface HackathonCardProps {
  hackathon: Hackathon;
}

export function HackathonCard({ hackathon }: HackathonCardProps) {
  const { slug, title, status, tags, period } = hackathon;
  const periodLabel = formatPeriodRange(
    period.submissionDeadlineAt,
    period.endAt,
  );

  return (
    <MotionLink
      href={`/hackathons/${slug}`}
      className="ds-hack-row group block"
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.997 }}
      transition={{ type: "spring", stiffness: 520, damping: 38 }}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
        <div className="min-w-0 flex-1">
          <h2 className="text-title text-foreground transition group-hover:text-neon">
            {title}
          </h2>
          <p className="mt-2 font-mono text-xs text-muted">{periodLabel}</p>
        </div>
        <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end sm:text-right">
          <span
            className={`text-[11px] font-semibold uppercase tracking-[0.12em] ${STATUS_EMPHASIS[status]}`}
          >
            {HACKATHON_STATUS_LABEL[status]}
          </span>
          <p className="max-w-[14rem] text-xs leading-relaxed text-faint sm:text-right">
            {tags.join(" · ")}
          </p>
        </div>
      </div>
    </MotionLink>
  );
}
