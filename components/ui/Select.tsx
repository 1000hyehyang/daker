"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils/cn";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  disabled?: boolean;
  id?: string;
  className?: string;
  triggerClassName?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={cn(
        "h-4 w-4 shrink-0 text-faint transition-transform duration-200",
        open && "rotate-180",
      )}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
    >
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** 네이티브 select 대신 트리거 버튼 + 드롭다운 패널. */
export function Select({
  value,
  onChange,
  options,
  disabled,
  id: idProp,
  className,
  triggerClassName,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
}: SelectProps) {
  const uid = useId();
  const listId = `${uid}-list`;
  const buttonId = idProp ?? `${uid}-trigger`;
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);
  const labelText = selected?.label ?? "";

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const pick = (v: string) => {
    onChange(v);
    close();
  };

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        id={buttonId}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        onClick={() => !disabled && setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (!disabled) setOpen((o) => !o);
          }
        }}
        className={cn(
          "form-control-base flex h-11 w-full cursor-pointer items-center justify-between gap-2 py-0 text-left leading-5",
          "hover:border-border-strong active:bg-muted-bg/40",
          "disabled:cursor-not-allowed",
          open && "border-accent ring-2 ring-ring/30",
          triggerClassName,
        )}
      >
        <span className="min-w-0 flex-1 truncate">{labelText}</span>
        <ChevronIcon open={open} />
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-labelledby={buttonId}
          className={cn(
            "absolute left-0 right-0 z-50 mt-1 max-h-60 overflow-auto rounded-md border border-border bg-elevated py-1 shadow-md",
          )}
        >
          {options.map((opt) => {
            const isSelected = opt.value === value;
            const isDisabled = opt.disabled;
            return (
              <li key={opt.value} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  disabled={isDisabled}
                  onClick={() => !isDisabled && pick(opt.value)}
                  className={cn(
                    "flex w-full cursor-pointer items-center px-3 py-2.5 text-left text-sm text-foreground transition",
                    "hover:bg-muted-bg/80",
                    "focus-visible:bg-muted-bg/80 focus-visible:outline-none",
                    "active:bg-muted-bg",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    isSelected && "bg-accent-muted/80 font-medium text-accent",
                  )}
                >
                  {opt.label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
