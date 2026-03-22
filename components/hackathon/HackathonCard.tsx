import Link from "next/link";
import { HACKATHON_STATUS_LABEL } from "@/lib/content/hackathon";
import type { Hackathon } from "@/lib/types/models";
import { formatPeriodRange } from "@/lib/utils/format";

/** 상태는 색이 아니라 라벨·굵기로만 구분 (과한 시맨틱 색 배지 지양) */
const STATUS_EMPHASIS: Record<Hackathon["status"], string> = {
  ongoing: "font-medium text-foreground",
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
    <Link
      href={`/hackathons/${slug}`}
      className="group block border-b border-border py-6 transition first:pt-0 hover:bg-muted-bg/40"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
        <div className="min-w-0 flex-1">
          <h2 className="text-title text-foreground transition group-hover:text-accent">
            {title}
          </h2>
          <p className="mt-2 text-sm text-muted">{periodLabel}</p>
        </div>
        <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end sm:text-right">
          <span
            className={`text-xs uppercase tracking-[0.08em] ${STATUS_EMPHASIS[status]}`}
          >
            {HACKATHON_STATUS_LABEL[status]}
          </span>
          <p className="max-w-[14rem] text-xs leading-relaxed text-faint sm:text-right">
            {tags.join(" · ")}
          </p>
        </div>
      </div>
    </Link>
  );
}
