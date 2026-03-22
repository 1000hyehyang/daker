"use client";

import { useId, useState } from "react";

import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { landingCopy } from "@/lib/content/landing";
import { cn } from "@/lib/utils/cn";

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function LandingFAQ() {
  const { faq } = landingCopy;
  const uid = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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

        <div className="mt-12 divide-y divide-border/60 rounded-sm border border-border/70 bg-surface/35">
          {faq.items.map((item, i) => {
            const open = openIndex === i;
            const panelId = `${uid}-faq-panel-${i}`;
            const triggerId = `${uid}-faq-trigger-${i}`;

            return (
              <div key={item.q} className="px-4 sm:px-5">
                <h3 className="text-base font-semibold leading-snug">
                  <button
                    type="button"
                    id={triggerId}
                    className={cn(
                      "flex w-full items-start justify-between gap-4 py-4 text-left text-foreground transition-colors",
                      "hover:text-neon/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
                    )}
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() =>
                      setOpenIndex((prev) => (prev === i ? null : i))
                    }
                  >
                    <span className="min-w-0 flex-1 pr-2">{item.q}</span>
                    <ChevronIcon
                      className={cn(
                        "mt-0.5 shrink-0 text-muted transition-transform duration-200",
                        open && "rotate-180 text-neon",
                      )}
                    />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  hidden={!open}
                  className="border-t border-border/40 pb-4 pt-3"
                >
                  <p className="text-sm leading-relaxed text-muted">{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ScrollReveal>
  );
}
