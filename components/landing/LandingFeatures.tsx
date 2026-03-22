"use client";

import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { CyberCard } from "@/components/landing/CyberCard";
import { landingCopy } from "@/lib/content/landing";

export function LandingFeatures() {
  const { features } = landingCopy;

  return (
    <ScrollReveal
      as="section"
      id={features.id}
      className="landing-section border-t border-border/80 py-20 sm:py-24"
      start="top 86%"
    >
      <div className="mx-auto max-w-content px-5 sm:px-8 lg:px-12">
        <p className="eyebrow text-neon">{features.eyebrow}</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {features.title}
        </h2>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.items.map((item, i) => (
            <CyberCard key={item.title} accent={i % 2 === 0}>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 text-base font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.desc}</p>
            </CyberCard>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
}
