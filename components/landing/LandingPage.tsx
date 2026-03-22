"use client";

import { LandingAbout } from "@/components/landing/LandingAbout";
import { LandingCTA } from "@/components/landing/LandingCTA";
import { LandingFAQ } from "@/components/landing/LandingFAQ";
import { LandingFeatures } from "@/components/landing/LandingFeatures";
import { LandingHero } from "@/components/landing/LandingHero";
import { LandingSchedule } from "@/components/landing/LandingSchedule";
import { LandingShowcase } from "@/components/landing/LandingShowcase";
import { LandingTracks } from "@/components/landing/LandingTracks";

/**
 * 해커톤 이벤트 랜딩 — 포트폴리오형 구조가 아닌 제품/행사 페이지 흐름
 */
export function LandingPage() {
  return (
    <div className="flex flex-1 flex-col">
      <LandingHero />
      <LandingAbout />
      <LandingFeatures />
      <LandingTracks />
      <LandingSchedule />
      <LandingShowcase />
      <LandingFAQ />
      <LandingCTA />
    </div>
  );
}
