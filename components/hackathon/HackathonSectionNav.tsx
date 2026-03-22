"use client";

import { useCallback, useEffect, useState } from "react";
import { HACKATHON_TAB_LABELS, hackathonUiAria } from "@/lib/content/hackathon";
import {
  HACKATHON_SECTION_IDS,
  type HackathonSectionId,
  isHackathonSectionId,
} from "@/lib/hackathon-tabs";
import { cn } from "@/lib/utils/cn";

/** sticky 네비 높이와 섹션 scroll-margin 정렬용 */
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

/**
 * 단일 스크롤 문서용 앵커 내비: 클릭 시 해당 섹션으로 부드럽게 스크롤,
 * 스크롤 시 현재 구역을 하단 강조선으로 표시합니다.
 */
export function HackathonSectionNav() {
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

  return (
    <div className="ds-sticky-tabs -mx-1 px-1">
      <nav
        className="flex gap-1 overflow-x-auto pb-0"
        aria-label={hackathonUiAria.sectionNav}
      >
        {HACKATHON_SECTION_IDS.map((id) => {
          const isActive = active === id;
          return (
            <a
              key={id}
              href={`#${id}`}
              aria-current={isActive ? "location" : undefined}
              data-state={isActive ? "active" : "inactive"}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(id);
                setActive(id);
              }}
              className={cn(
                "ds-tab shrink-0 whitespace-nowrap",
                !isActive && "border-b-transparent",
              )}
            >
              {HACKATHON_TAB_LABELS[id]}
            </a>
          );
        })}
      </nav>
    </div>
  );
}
