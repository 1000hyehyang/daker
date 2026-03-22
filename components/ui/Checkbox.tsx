"use client";

import { useId } from "react";
import { cn } from "@/lib/utils/cn";

export type CheckboxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
>;

/**
 * 시각적 박스 + 체크 아이콘. 네이티브 체크박스는 sr-only로 유지(접근성·폼 동작).
 */
export function Checkbox({
  id: idProp,
  className,
  disabled,
  checked,
  ...props
}: CheckboxProps) {
  const uid = useId();
  const id = idProp ?? uid;

  return (
    <span className={cn("relative inline-flex shrink-0", className)}>
      <input
        {...props}
        id={id}
        type="checkbox"
        disabled={disabled}
        checked={checked}
        className={cn("peer sr-only", "disabled:cursor-not-allowed")}
      />
      <span
        aria-hidden
        className={cn(
          "flex h-[1.125rem] w-[1.125rem] shrink-0 items-center justify-center rounded-[var(--radius-sm)] border border-border bg-elevated shadow-sm transition",
          "peer-hover:border-border-strong peer-hover:bg-muted-bg/50",
          "peer-active:bg-muted-bg/70",
          "peer-focus-visible:border-accent peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring/30",
          "peer-disabled:cursor-not-allowed peer-disabled:opacity-50 peer-disabled:hover:border-border",
          "peer-checked:border-accent peer-checked:bg-accent",
          "peer-checked:[&_svg]:opacity-100",
        )}
      >
        <svg
          viewBox="0 0 12 12"
          className="h-2.5 w-2.5 text-accent-fg opacity-0 transition-opacity"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2.5 6l2.5 2.5L9.5 3" />
        </svg>
      </span>
    </span>
  );
}
