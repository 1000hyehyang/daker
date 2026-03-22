"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ className, rows = 3, ...props }, ref) {
    return (
      <textarea
        ref={ref}
        rows={rows}
        className={cn(
          "ds-field min-h-[5.5rem] resize-y py-2.5 leading-relaxed",
          className,
        )}
        {...props}
      />
    );
  },
);
