"use client";

import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { CyberCard } from "@/components/landing/CyberCard";
import { landingCopy } from "@/lib/content/landing";

export function LandingTracks() {
  const { tracks } = landingCopy;

  return (
    <ScrollReveal
      as="section"
      id={tracks.id}
      className="landing-section py-20 sm:py-24"
      start="top 86%"
    >
      <div className="mx-auto max-w-content px-5 sm:px-8 lg:px-12">
        <p className="eyebrow text-neon">{tracks.eyebrow}</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {tracks.title}
        </h2>
        <p className="mt-4 max-w-2xl text-muted">{tracks.subtitle}</p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {tracks.items.map((t) => (
            <CyberCard key={t.name} accent>
              <span className="inline-block rounded-sm border border-neon/35 bg-neon/10 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-neon">
                {t.tag}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-foreground">{t.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{t.desc}</p>
            </CyberCard>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
}
