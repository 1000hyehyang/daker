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
    <div className="ds-tabtrack gap-1" role="group" aria-label={hackathonUiAria.statusFilter}>
      {HACKATHON_FILTER_OPTIONS.map((opt) => {
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            disabled={disabled}
            data-state={active ? "active" : "inactive"}
            onClick={() => onChange(opt.value)}
            className="ds-tab disabled:cursor-not-allowed disabled:opacity-40"
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
