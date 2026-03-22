"use client";

import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { landingCopy } from "@/lib/content/landing";

export function LandingSchedule() {
  const { schedule } = landingCopy;

  return (
    <ScrollReveal
      as="section"
      id={schedule.id}
      className="landing-section border-t border-border/80 py-20 sm:py-24"
      start="top 86%"
    >
      <div className="mx-auto max-w-content px-5 sm:px-8 lg:px-12">
        <p className="eyebrow text-neon">{schedule.eyebrow}</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {schedule.title}
        </h2>
        <p className="mt-2 font-mono text-xs text-faint">{schedule.timezone}</p>

        <ol className="relative mt-12 max-w-3xl border-l border-border pl-6">
          {schedule.milestones.map((m) => (
            <li key={m.label} className="relative mb-12 last:mb-0">
              <span
                className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-[1px] bg-gradient-to-br from-neon to-blue shadow-[0_0_12px_-2px_hsl(var(--neon)/0.8)]"
                aria-hidden
              />
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-neon">
                  {m.date}
                </span>
                <span className="text-base font-semibold text-foreground">
                  {m.label}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted">{m.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </ScrollReveal>
  );
}
