"use client";

import { motion } from "framer-motion";

import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils/cn";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <div
        className={cn(
          "h-8 w-[5.5rem] rounded-sm border border-border bg-surface/80",
          className,
        )}
        aria-hidden
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <div
      className={cn(
        "inline-flex rounded-sm border border-border bg-surface/90 p-0.5",
        className,
      )}
      role="group"
      aria-label="색 테마"
    >
      <motion.button
        type="button"
        onClick={() => setTheme("light")}
        className={cn(
          "relative rounded-sm px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide transition-colors",
          !isDark
            ? "bg-muted-bg text-foreground"
            : "text-muted hover:text-foreground",
        )}
        whileTap={{ scale: 0.98 }}
      >
        Light
      </motion.button>
      <motion.button
        type="button"
        onClick={() => setTheme("dark")}
        className={cn(
          "relative rounded-sm px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide transition-colors",
          isDark
            ? "bg-muted-bg text-foreground"
            : "text-muted hover:text-foreground",
        )}
        whileTap={{ scale: 0.98 }}
      >
        Dark
      </motion.button>
    </div>
  );
}
