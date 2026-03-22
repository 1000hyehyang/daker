"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { motion } from "framer-motion";

import { landingCopy } from "@/lib/content/landing";

export function LandingHero() {
  const root = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-hero-line]",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.62,
          stagger: 0.07,
          ease: "power3.out",
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative flex min-h-[min(88vh,840px)] flex-col justify-center overflow-hidden pb-16 pt-24"
    >
      <div className="landing-grid-bg absolute inset-0 opacity-[0.55]" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-blue-deep/25 via-transparent to-background"
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-content px-5 sm:px-8 lg:px-12">
        <p
          data-hero-line
          className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-neon"
        >
          {landingCopy.meta.badge}
        </p>

        <h1
          className="mt-6 max-w-[18ch] text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <span data-hero-line className="block">
            {landingCopy.meta.titleLine1}
          </span>
          <span
            data-hero-line
            className="mt-1 block bg-gradient-to-r from-neon via-accent to-blue bg-clip-text text-transparent"
          >
            {landingCopy.meta.titleLine2}
          </span>
        </h1>

        <p
          data-hero-line
          className="mt-8 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
        >
          {landingCopy.meta.tagline}
        </p>

        <div
          data-hero-line
          className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4"
        >
          <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
            <Link href="/hackathons" className="btn-primary inline-flex min-h-[44px] px-6">
              {landingCopy.meta.ctaPrimary}
            </Link>
          </motion.div>
          <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
            <Link href="/camp" className="btn-ghost-neon inline-flex min-h-[44px] px-6">
              {landingCopy.meta.ctaSecondary}
            </Link>
          </motion.div>
          <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
            <a
              href={`#${landingCopy.about.id}`}
              className="btn-secondary inline-flex min-h-[44px] px-5 text-sm"
            >
              {landingCopy.meta.ctaTertiary}
            </a>
          </motion.div>
        </div>
      </div>

      <div className="cyber-divider mx-auto mt-16 max-w-content px-8 opacity-80" />
    </section>
  );
}
