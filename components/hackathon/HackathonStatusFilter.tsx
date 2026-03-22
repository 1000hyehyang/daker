"use client";

import {
  HACKATHON_FILTER_OPTIONS,
  hackathonUiAria,
  type HackathonFilterStatus,
} from "@/lib/content/hackathon";

export interface HackathonStatusFilterProps {
  value: HackathonFilterStatus;
  onChange: (v: HackathonFilterStatus) => void;
  disabled?: boolean;
}

/** 하단 보더로 활성만 강조 — 칩/그라데이션 대신 문서형 필터 */
export function HackathonStatusFilter({
  value,
  onChange,
  disabled,
}: HackathonStatusFilterProps) {
  return (
    <div
      className="flex flex-wrap gap-6 border-b border-border"
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
            onClick={() => onChange(opt.value)}
            className={`-mb-px border-b-2 pb-3 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-40 ${
              active
                ? "border-accent text-foreground"
                : "border-transparent text-muted hover:border-border-strong hover:text-foreground"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
