"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { hackathonDetailHeroCopy } from "@/lib/content/detailSections";
import { cn } from "@/lib/utils/cn";

type ShareState = "idle" | "copied" | "error";

function LinkChainIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function AlertIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4M12 16h.01" />
    </svg>
  );
}

export function ShareHackathonButton() {
  const [state, setState] = useState<ShareState>("idle");
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    };
  }, []);

  const onShare = useCallback(() => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    void (async () => {
      try {
        await navigator.clipboard.writeText(url);
        setState("copied");
        if (resetTimer.current) clearTimeout(resetTimer.current);
        resetTimer.current = setTimeout(() => setState("idle"), 2000);
      } catch {
        setState("error");
        if (resetTimer.current) clearTimeout(resetTimer.current);
        resetTimer.current = setTimeout(() => setState("idle"), 2500);
      }
    })();
  }, []);

  const ariaLabel =
    state === "copied"
      ? hackathonDetailHeroCopy.shareDone
      : state === "error"
        ? hackathonDetailHeroCopy.shareFail
        : hackathonDetailHeroCopy.share;

  return (
    <button
      type="button"
      onClick={onShare}
      aria-label={ariaLabel}
      title={hackathonDetailHeroCopy.share}
      className={cn(
        "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
        "text-muted transition-colors",
        "hover:bg-muted-bg/70 hover:text-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        state === "copied" && "text-accent-green hover:text-accent-green",
        state === "error" && "text-danger hover:text-danger",
      )}
    >
      {state === "copied" ? (
        <CheckIcon className="text-current" />
      ) : state === "error" ? (
        <AlertIcon className="text-current" />
      ) : (
        <LinkChainIcon className="text-current" />
      )}
    </button>
  );
}
