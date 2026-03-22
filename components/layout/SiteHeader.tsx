"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils/cn";

const ANCHORS = [
  { hash: "about", label: "소개" },
  { hash: "features", label: "하이라이트" },
  { hash: "schedule", label: "일정" },
  { hash: "faq", label: "FAQ" },
] as const;

const APP = [
  { href: "/hackathons", label: "해커톤" },
  { href: "/camp", label: "캠프" },
  { href: "/rankings", label: "랭킹" },
] as const;

function AnchorLink({
  hash,
  children,
  className,
}: {
  hash: string;
  children: ReactNode;
  className?: string;
}) {
  const pathname = usePathname();
  if (pathname === "/") {
    return (
      <a href={`#${hash}`} className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={`/#${hash}`} className={className}>
      {children}
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className="sticky top-0 z-[var(--z-sticky)] mb-8 border-b border-border/90 bg-background/88 pb-4 pt-1 backdrop-blur-md">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-start gap-4 sm:items-center">
          <div>
            <Link
              href="/"
              className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-neon"
            >
              DAKER
            </Link>
            <p className="mt-1 text-[11px] text-faint">
              Hackathon platform · local demo
            </p>
          </div>
          <ThemeToggle />
        </div>

        <nav
          className="flex flex-wrap items-center gap-1 sm:justify-end"
          aria-label="메인 내비게이션"
        >
          {isHome &&
            ANCHORS.map((a) => (
              <motion.span key={a.hash} whileHover={{ y: -1 }} whileTap={{ y: 0 }}>
                <AnchorLink
                  hash={a.hash}
                  className="inline-flex items-center rounded-sm border border-transparent px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted transition hover:border-neon/35 hover:text-neon"
                >
                  {a.label}
                </AnchorLink>
              </motion.span>
            ))}

          {isHome && (
            <span
              className="mx-1 hidden h-4 w-px bg-border sm:inline"
              aria-hidden
            />
          )}

          {APP.map((item) => {
            const active =
              item.href === "/hackathons"
                ? pathname.startsWith("/hackathons")
                : pathname === item.href;
            return (
              <motion.div
                key={item.href}
                whileHover={{ y: -1 }}
                whileTap={{ y: 0 }}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "inline-flex items-center rounded-sm border px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide transition-colors",
                    active
                      ? "border-neon/45 bg-surface text-foreground shadow-[0_0_20px_-8px_hsl(var(--neon)/0.45)]"
                      : "border-transparent text-muted hover:border-border hover:text-foreground",
                  )}
                >
                  {active && (
                    <span
                      className="mr-1.5 h-1 w-1 rounded-[1px] bg-neon shadow-[0_0_8px_hsl(var(--neon)/0.9)]"
                      aria-hidden
                    />
                  )}
                  {item.label}
                </Link>
              </motion.div>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
