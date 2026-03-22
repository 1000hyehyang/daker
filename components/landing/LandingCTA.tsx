"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { landingCopy } from "@/lib/content/landing";

export function LandingCTA() {
  const { cta } = landingCopy;

  return (
    <ScrollReveal
      as="section"
      id={cta.id}
      className="landing-section py-20 sm:py-28"
      start="top 86%"
    >
      <div className="mx-auto max-w-content px-5 sm:px-8 lg:px-12">
        <div className="relative overflow-hidden rounded-sm border border-border bg-gradient-to-br from-blue-deep/50 via-surface to-surface p-8 sm:p-12">
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-neon/10 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-20 left-1/3 h-40 w-40 rounded-full bg-blue/15 blur-3xl"
            aria-hidden
          />

          <p className="eyebrow text-neon">{cta.eyebrow}</p>
          <h2 className="relative mt-3 max-w-xl text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {cta.title}
          </h2>
          <p className="relative mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            {cta.body}
          </p>

          <div className="relative mt-8 flex flex-wrap gap-3">
            <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
              <Link href="/hackathons" className="btn-primary inline-flex min-h-[44px] px-6">
                {cta.primary}
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
              <Link href="/camp" className="btn-ghost-neon inline-flex min-h-[44px] px-6">
                {cta.secondary}
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}
