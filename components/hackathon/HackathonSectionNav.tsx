"use client";

import { useCallback, useEffect, useState } from "react";
import { HACKATHON_TAB_LABELS, hackathonUiAria } from "@/lib/content/hackathon";
import {
  HACKATHON_SECTION_IDS,
  type HackathonSectionId,
  isHackathonSectionId,
} from "@/lib/hackathon-tabs";
import { cn } from "@/lib/utils/cn";

const SCROLL_OFFSET_PX = 112;

function scrollToSection(id: HackathonSectionId) {
  const el = document.getElementById(id);
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.replaceState(null, "", `#${id}`);
}

function getActiveSectionId(): HackathonSectionId {
  const targetLine = window.scrollY + SCROLL_OFFSET_PX;
  let current: HackathonSectionId = HACKATHON_SECTION_IDS[0];
  for (const id of HACKATHON_SECTION_IDS) {
    const el = document.getElementById(id);
    if (!el) continue;
    const top = el.getBoundingClientRect().top + window.scrollY;
    if (top <= targetLine + 0.5) current = id;
  }
  return current;
}

export type HackathonSectionNavLayout = "vertical" | "horizontal" | "bottom";

export interface HackathonSectionNavProps {
  layout?: HackathonSectionNavLayout;
  className?: string;
}

/**
 * 해커톤 상세 앵커 내비 — 데스크톱: 왼쪽 타임라인, 모바일: 하단 고정( bottom ).
 */
export function HackathonSectionNav({
  layout = "vertical",
  className,
}: HackathonSectionNavProps) {
  const [active, setActive] = useState<HackathonSectionId>("overview");

  const syncActiveFromScroll = useCallback(() => {
    setActive((prev) => {
      const next = getActiveSectionId();
      return prev === next ? prev : next;
    });
  }, []);

  useEffect(() => {
    syncActiveFromScroll();
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        syncActiveFromScroll();
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [syncActiveFromScroll]);

  useEffect(() => {
    const onHash = () => {
      const raw = window.location.hash.replace(/^#/, "");
      if (raw && isHackathonSectionId(raw)) {
        setActive(raw);
      }
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const activeIndex = HACKATHON_SECTION_IDS.indexOf(active);

  const linkClass = (
    id: HackathonSectionId,
    isActive: boolean,
    done: boolean,
  ) => {
    if (layout === "horizontal") {
      return cn(
        "ds-tab shrink-0 whitespace-nowrap",
        !isActive && "border-b-transparent",
      );
    }
    if (layout === "bottom") {
      return cn(
        "platform-section-nav__pill shrink-0 whitespace-nowrap",
        isActive && "platform-section-nav__pill--active",
        done && !isActive && "platform-section-nav__pill--done",
      );
    }
    return cn(
      "platform-section-nav__link",
      isActive && "platform-section-nav__link--active",
      done && !isActive && "platform-section-nav__link--done",
    );
  };

  const navInner = (
    <>
      {HACKATHON_SECTION_IDS.map((id, index) => {
        const isActive = active === id;
        const done = index < activeIndex;
        return (
          <a
            key={id}
            href={`#${id}`}
            aria-current={isActive ? "location" : undefined}
            data-state={isActive ? "active" : done ? "done" : "upcoming"}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(id);
              setActive(id);
            }}
            className={linkClass(id, isActive, done)}
          >
            {layout === "vertical" && (
              <span className="platform-section-nav__dot" aria-hidden />
            )}
            <span className={layout === "vertical" ? "min-w-0 flex-1" : undefined}>
              {HACKATHON_TAB_LABELS[id]}
            </span>
          </a>
        );
      })}
    </>
  );

  if (layout === "horizontal") {
    return (
      <div className={cn("ds-sticky-tabs -mx-1 px-1", className)}>
        <nav
          className="flex gap-1 overflow-x-auto pb-0"
          aria-label={hackathonUiAria.sectionNav}
        >
          {navInner}
        </nav>
      </div>
    );
  }

  if (layout === "bottom") {
    return (
      <div className={cn("platform-section-nav--bottom", className)}>
        <nav
          className="platform-section-nav__bottom-bar"
          aria-label={hackathonUiAria.sectionNav}
        >
          {navInner}
        </nav>
      </div>
    );
  }

  return (
    <nav
      className={cn("platform-section-nav", className)}
      aria-label={hackathonUiAria.sectionNav}
    >
      <p className="platform-section-nav__label">Sections</p>
      <div className="platform-section-nav__track">{navInner}</div>
    </nav>
  );
}
