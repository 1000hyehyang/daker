"use client";

import { useCallback, useId, useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { useTheme } from "@/components/providers/ThemeProvider";
import { landingCopy } from "@/lib/content/landing";
import { cn } from "@/lib/utils/cn";

import "swiper/css";

export function LandingShowcase() {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const { showcase } = landingCopy;
  const uid = useId();
  const swiperRef = useRef<SwiperType | null>(null);
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState<number>(showcase.slides.length);

  const go = (dir: "prev" | "next") => {
    if (!swiperRef.current) return;
    if (dir === "prev") swiperRef.current.slidePrev();
    else swiperRef.current.slideNext();
  };

  const progress = count > 0 ? ((index + 1) / count) * 100 : 0;

  const onSlideChange = useCallback((sw: SwiperType) => {
    setIndex(sw.activeIndex);
  }, []);

  return (
    <ScrollReveal
      as="section"
      id={showcase.id}
      className="landing-section py-20 sm:py-24"
      start="top 86%"
    >
      <div className="mx-auto max-w-content px-5 sm:px-8 lg:px-12">
        <p className="eyebrow text-neon">{showcase.eyebrow}</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {showcase.title}
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-muted">{showcase.subtitle}</p>

        <div
          className="mt-10 overflow-hidden rounded-sm border border-border bg-surface/60 shadow-[0_0_0_1px_hsl(var(--blue)/0.12),0_0_40px_-12px_hsl(var(--neon)/0.2)]"
          role="region"
          aria-roledescription="carousel"
          aria-labelledby={`${uid}-showcase-title`}
        >
          <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
            <span
              id={`${uid}-showcase-title`}
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint"
            >
              {showcase.carouselLabel}
            </span>
            <div className="ds-swiper-nav">
              <button
                type="button"
                className="inline-flex min-h-[36px] min-w-[36px] items-center justify-center rounded-sm border border-border bg-surface px-2 text-xs text-foreground transition hover:border-blue/50 hover:shadow-[0_0_20px_-8px_hsl(var(--blue)/0.5)]"
                aria-label="이전"
                onClick={() => go("prev")}
              >
                ←
              </button>
              <span className="ds-swiper-fraction text-neon/90">
                {index + 1}/{count}
              </span>
              <button
                type="button"
                className="inline-flex min-h-[36px] min-w-[36px] items-center justify-center rounded-sm border border-border bg-surface px-2 text-xs text-foreground transition hover:border-blue/50 hover:shadow-[0_0_20px_-8px_hsl(var(--blue)/0.5)]"
                aria-label="다음"
                onClick={() => go("next")}
              >
                →
              </button>
            </div>
          </div>

          <div className="border-b border-border/80 px-4 pb-2 pt-3">
            <div className="ds-swiper-progress h-1" aria-hidden>
              <div
                className="ds-swiper-progress-bar !bg-gradient-to-r !from-neon/50 !to-blue/90"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="swiper-viewport min-w-0 overflow-hidden">
            <Swiper
              spaceBetween={0}
              slidesPerView={1}
              watchOverflow
              resistanceRatio={0}
              onSwiper={(sw) => {
                swiperRef.current = sw;
                setCount(sw.slides.length);
              }}
              onSlideChange={onSlideChange}
              className="swiper-contained !w-full !pb-2 !pt-2"
            >
            {showcase.slides.map((s) => (
              <SwiperSlide key={s.title} className="!box-border">
                <div className="px-6 py-8 sm:px-10">
                  <h3 className="text-xl font-semibold text-foreground sm:text-2xl">
                    {s.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
                    {s.desc}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {s.tags.map((tag) => (
                      <li
                        key={tag}
                        className={cn(
                          "rounded-sm border px-2.5 py-1 font-mono text-[11px]",
                          isLight
                            ? "border-blue/20 bg-blue/[0.08] text-blue"
                            : "border-blue/30 bg-blue-deep/40 text-neon/90",
                        )}
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </SwiperSlide>
            ))}
            </Swiper>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}
