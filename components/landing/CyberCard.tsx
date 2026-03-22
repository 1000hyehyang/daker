"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

export interface CyberCardProps {
  children: ReactNode;
  className?: string;
  /** 상단 네온 라인 강조 */
  accent?: boolean;
}

/** 다크 패널 + 미세 네온 보더, 호버 시 살짝 상승 */
export function CyberCard({
  children,
  className,
  accent = false,
}: CyberCardProps) {
  return (
    <motion.div
      className={cn(
        "cyber-card relative overflow-hidden rounded-sm border border-border bg-surface/80 p-5",
        accent && "cyber-card--accent",
        className,
      )}
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
    >
      {children}
    </motion.div>
  );
}
