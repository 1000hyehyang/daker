"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

/**
 * 여러 줄 입력 — 동일 보더·포커스 링, 세로 리사이즈만 허용.
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ className, rows = 3, ...props }, ref) {
    return (
      <textarea
        ref={ref}
        rows={rows}
        className={cn(
          "form-control-base min-h-[5.5rem] resize-y py-2.5 leading-relaxed",
          className,
        )}
        {...props}
      />
    );
  },
);
