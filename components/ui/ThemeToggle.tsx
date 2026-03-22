"use client";

import { motion } from "framer-motion";

import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils/cn";

function SunIcon({ className }: { className?: string }) {
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
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
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
      <path d="M12 3a6.65 6.65 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

export interface ThemeToggleProps {
  className?: string;
  /** 모바일 등 — 최소 터치 영역(44px) 유지 */
  compact?: boolean;
}

export function ThemeToggle({ className, compact }: ThemeToggleProps) {
  const { theme, setTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <div
        className={cn(
          "rounded-sm bg-muted-bg/40",
          compact ? "h-11 w-11 sm:h-9 sm:w-9" : "h-9 w-9",
          className,
        )}
        aria-hidden
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <motion.button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "inline-flex items-center justify-center rounded-sm text-foreground transition-colors",
        "hover:bg-muted-bg/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
        compact
          ? "min-h-[44px] min-w-[44px] sm:min-h-9 sm:min-w-9"
          : "h-9 w-9",
        className,
      )}
      aria-label={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
      whileTap={{ scale: 0.96 }}
    >
      {isDark ? (
        <SunIcon className="text-neon" />
      ) : (
        <MoonIcon className="text-muted" />
      )}
    </motion.button>
  );
}
