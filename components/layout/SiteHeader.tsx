"use client";

import type { ReactNode } from "react";
import {
  useCallback,
  useEffect,
  useId,
  useState,
} from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useTheme } from "@/components/providers/ThemeProvider";
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
  onClick,
}: {
  hash: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  if (pathname === "/") {
    return (
      <a href={`#${hash}`} className={className} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <Link href={`/#${hash}`} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

function MenuIcon({ className }: { className?: string }) {
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
      aria-hidden
    >
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
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
      aria-hidden
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

/** 데스크톱 내비 링크 터치 보조 */
const navTouch =
  "max-sm:min-h-[44px] max-sm:items-center max-sm:justify-center max-sm:touch-manipulation";

export function SiteHeader() {
  const pathname = usePathname();
  const { theme } = useTheme();
  const isHome = pathname === "/";
  const isLight = theme === "light";
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuId = useId();

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const mobileDrawer =
    mounted &&
    menuOpen &&
    createPortal(
      <>
        <button
          type="button"
          className="fixed inset-0 z-[var(--z-modal)] bg-foreground/25 backdrop-blur-[2px] sm:hidden"
          aria-hidden
          tabIndex={-1}
          onClick={closeMenu}
        />
        <div
          id={menuId}
          role="dialog"
          aria-modal="true"
          aria-label="메인 내비게이션"
          className="fixed right-0 top-0 z-[101] flex h-[100dvh] w-[min(100%,18.5rem)] flex-col border-l border-border bg-background shadow-[0_0_40px_-12px_hsl(var(--foreground)/0.2)] sm:hidden"
        >
          <div className="flex items-center justify-between border-b border-border px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top,0px))]">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-faint">
              Menu
            </span>
            <button
              type="button"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-sm text-foreground transition-colors hover:bg-muted-bg/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
              aria-label="메뉴 닫기"
              onClick={closeMenu}
            >
              <CloseIcon />
            </button>
          </div>
          <div className="flex min-h-0 flex-1 flex-col">
            <nav
              className="flex-1 overflow-y-auto px-3 py-4 pb-2"
              aria-label="메인 내비게이션"
            >
              <p className="px-3 pb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-faint">
                페이지
              </p>
              <ul className="space-y-0.5">
                {APP.map((item) => {
                  const active =
                    item.href === "/hackathons"
                      ? pathname.startsWith("/hackathons")
                      : pathname === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={closeMenu}
                        className={cn(
                          "block rounded-sm px-3 py-3 text-sm font-semibold transition-colors",
                          active
                            ? "bg-muted-bg text-foreground"
                            : "text-muted hover:bg-muted-bg/60 hover:text-foreground",
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="my-4 border-t border-border/80" />
              <p className="px-3 pb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-faint">
                랜딩
              </p>
              <ul className="space-y-0.5">
                {ANCHORS.map((a) => (
                  <li key={a.hash}>
                    <AnchorLink
                      hash={a.hash}
                      onClick={closeMenu}
                      className="block rounded-sm px-3 py-3 text-sm font-semibold text-muted transition-colors hover:bg-muted-bg/60 hover:text-foreground"
                    >
                      {a.label}
                    </AnchorLink>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="shrink-0 border-t border-border px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom,0px))]">
              <p className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-faint">
                테마
              </p>
              <div className="flex justify-center">
                <ThemeToggle compact className="shrink-0" />
              </div>
            </div>
          </div>
        </div>
      </>,
      document.body,
    );

  return (
    <header
      className={cn(
        "sticky top-0 z-[var(--z-sticky)] mb-6 border-b border-border/90 bg-background/88 backdrop-blur-md sm:mb-8",
        /* 노치 safe-area + 상·하 동일(0.75rem) */
        "pb-3 pt-[calc(env(safe-area-inset-top,0px)+0.75rem)]",
      )}
    >
      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div className="flex min-w-0 items-center justify-between gap-3 sm:justify-start sm:gap-4">
          <div className="min-w-0">
            <Link
              href="/"
              className="block truncate font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-neon"
            >
              DAKER
            </Link>
            <p className="mt-0.5 hidden text-[11px] text-faint sm:block">
              해커톤 모집·팀·제출·랭킹
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle
              compact
              className="hidden shrink-0 sm:inline-flex"
            />
            <button
              type="button"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-sm text-foreground transition-colors hover:bg-muted-bg/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 sm:hidden"
              aria-expanded={menuOpen}
              aria-controls={menuId}
              aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        <nav
          className="hidden touch-manipulation items-stretch gap-1 sm:flex sm:flex-wrap sm:items-center sm:justify-end"
          aria-label="메인 내비게이션"
        >
          {isHome &&
            ANCHORS.map((a) => (
              <motion.span
                key={a.hash}
                className="max-sm:shrink-0"
                whileHover={{ y: -1 }}
                whileTap={{ y: 0 }}
              >
                <AnchorLink
                  hash={a.hash}
                  className={cn(
                    "inline-flex rounded-sm border border-transparent px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted transition hover:border-neon/35 hover:text-neon",
                    navTouch,
                  )}
                >
                  {a.label}
                </AnchorLink>
              </motion.span>
            ))}

          {isHome && (
            <span
              className="mx-1 hidden h-4 w-px shrink-0 self-center bg-border sm:inline"
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
                className={cn(!isHome && "min-w-0")}
                whileHover={{ y: -1 }}
                whileTap={{ y: 0 }}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "inline-flex w-full items-center justify-center rounded-sm border px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide transition-colors sm:inline-flex sm:w-auto sm:justify-start",
                    navTouch,
                    active
                      ? isLight
                        ? "border-border bg-muted-bg text-foreground"
                        : "border-neon/45 bg-surface text-foreground shadow-[0_0_20px_-8px_hsl(var(--neon)/0.45)]"
                      : "border-transparent text-muted hover:border-border hover:text-foreground",
                  )}
                >
                  {active && (
                    <span
                      className={cn(
                        "mr-1.5 hidden h-1 w-1 shrink-0 rounded-[1px] sm:inline-block",
                        isLight
                          ? "bg-foreground"
                          : "bg-neon shadow-[0_0_8px_hsl(var(--neon)/0.9)]",
                      )}
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
      {mobileDrawer}
    </header>
  );
}
