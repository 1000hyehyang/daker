"use client";

import {
  HACKATHON_FILTER_OPTIONS,
  hackathonUiAria,
  type HackathonFilterStatus,
} from "@/lib/content/hackathon";
import { cn } from "@/lib/utils/cn";

export interface HackathonStatusFilterProps {
  value: HackathonFilterStatus;
  onChange: (v: HackathonFilterStatus) => void;
  disabled?: boolean;
}

/** 텍스트 탭 스타일 필터 — 박스 없이 구분선만 */
export function HackathonStatusFilter({
  value,
  onChange,
  disabled,
}: HackathonStatusFilterProps) {
  return (
    <div
      className="flex flex-wrap gap-x-6 gap-y-1 border-b border-border/40 sm:gap-x-8"
      role="group"
      aria-label={hackathonUiAria.statusFilter}
    >
      {HACKATHON_FILTER_OPTIONS.map((opt) => {
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            disabled={disabled}
            data-state={active ? "active" : "inactive"}
            onClick={() => onChange(opt.value)}
            className={cn(
              "-mb-px border-b-2 pb-3 text-sm transition-colors",
              active
                ? "border-foreground font-semibold text-foreground"
                : "border-transparent font-medium text-muted hover:text-foreground",
              disabled && "cursor-not-allowed opacity-45",
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
