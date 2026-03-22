"use client";

import {
  type ElementType,
  type ReactNode,
  useLayoutEffect,
  useRef,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface ScrollRevealProps {
  /** 기본 `div`. 상세 섹션은 `section` 권장 */
  as?: ElementType;
  children: ReactNode;
  className?: string;
  id?: string;
  /** ScrollTrigger start (기본: 뷰포트 하단 근처 진입 시) */
  start?: string;
  /** 등장 전 지연(초) */
  delay?: number;
  /** 세로 이동 거리(px) */
  y?: number;
  /** 재생 시간(초) */
  duration?: number;
}

/**
 * Lenis와 함께 쓰기 위해 ScrollTrigger만 사용 (스크롤러는 부모에서 동기화).
 * 과한 바운스 없이 짧은 상승 + 페이드.
 */
export function ScrollReveal({
  as: Comp = "div",
  children,
  className,
  id,
  start = "top 88%",
  delay = 0,
  y = 16,
  duration = 0.42,
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start,
            once: true,
          },
        },
      );
    }, el);

    const raf = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(raf);
      ctx.revert();
    };
  }, [delay, duration, start, y]);

  return (
    <Comp ref={ref as never} id={id} className={className}>
      {children}
    </Comp>
  );
}
