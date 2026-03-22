import {
  HACKATHON_STATUS_LABEL,
} from "@/lib/content/hackathon";
import type { Hackathon } from "@/lib/types/models";
import { cn } from "@/lib/utils/cn";

const STATUS_CLASS: Record<Hackathon["status"], string> = {
  ongoing: "status-badge status-badge--live",
  upcoming: "status-badge status-badge--upcoming",
  ended: "status-badge status-badge--ended",
};

export interface HackathonStatusBadgeProps {
  status: Hackathon["status"];
  className?: string;
}

/** 진행 / 예정 / 종료 — 색상으로 한눈에 구분 */
export function HackathonStatusBadge({
  status,
  className,
}: HackathonStatusBadgeProps) {
  return (
    <span className={cn(STATUS_CLASS[status], className)}>
      {HACKATHON_STATUS_LABEL[status]}
    </span>
  );
}
