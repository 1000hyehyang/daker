"use client";

import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { CyberCard } from "@/components/landing/CyberCard";
import { landingCopy } from "@/lib/content/landing";

export function LandingAbout() {
  const { about } = landingCopy;

  return (
    <ScrollReveal
      as="section"
      id={about.id}
      className="landing-section py-20 sm:py-24"
      start="top 86%"
    >
      <div className="mx-auto max-w-content px-5 sm:px-8 lg:px-12">
        <p className="eyebrow text-neon">{about.eyebrow}</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {about.title}
        </h2>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted sm:text-lg">
          {about.lead}
        </p>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {about.columns.map((col) => (
            <CyberCard key={col.title} accent>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
                {col.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{col.body}</p>
            </CyberCard>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
}
