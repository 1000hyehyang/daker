"use client";

import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { CyberCard } from "@/components/landing/CyberCard";
import { landingCopy } from "@/lib/content/landing";

export function LandingFAQ() {
  const { faq } = landingCopy;

  return (
    <ScrollReveal
      as="section"
      id={faq.id}
      className="landing-section border-t border-border/80 py-20 sm:py-24"
      start="top 86%"
    >
      <div className="mx-auto max-w-content px-5 sm:px-8 lg:px-12">
        <p className="eyebrow text-neon">{faq.eyebrow}</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {faq.title}
        </h2>
        <p className="mt-4 max-w-2xl text-sm text-muted">{faq.subtitle}</p>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {faq.items.map((item) => (
            <CyberCard key={item.q}>
              <h3 className="text-sm font-semibold text-foreground">{item.q}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.a}</p>
            </CyberCard>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
}
