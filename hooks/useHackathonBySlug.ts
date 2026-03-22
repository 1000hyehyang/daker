"use client";

import { useCallback, useEffect, useState } from "react";
import type { Hackathon } from "@/lib/types/models";
import { getHackathons, initStorage } from "@/lib/storage";

export interface UseHackathonBySlugResult {
  hackathon: Hackathon | null;
  loading: boolean;
  error: string | null;
  reload: () => void;
}

export function useHackathonBySlug(slug: string): UseHackathonBySlugResult {
  const [hackathon, setHackathon] = useState<Hackathon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(() => {
    setLoading(true);
    setError(null);
    try {
      initStorage();
      const list = getHackathons();
      const found = list.find((h) => h.slug === slug) ?? null;
      setHackathon(found);
    } catch (e) {
      const message =
        e instanceof Error ? e.message : "데이터를 불러오지 못했습니다.";
      setError(message);
      setHackathon(null);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    reload();
  }, [reload]);

  return { hackathon, loading, error, reload };
}
