"use client";

import { useCallback, useEffect, useState } from "react";
import type { Team } from "@/lib/types/models";
import { getTeams, initStorage } from "@/lib/storage";

export function useTeams(hackathonSlug?: string) {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(() => {
    setLoading(true);
    setError(null);
    try {
      initStorage();
      let list = getTeams();
      if (hackathonSlug) {
        list = list.filter((t) => t.hackathonSlug === hackathonSlug);
      }
      setTeams(list);
    } catch (e) {
      setError(e instanceof Error ? e.message : "팀 목록을 불러오지 못했습니다.");
      setTeams([]);
    } finally {
      setLoading(false);
    }
  }, [hackathonSlug]);

  useEffect(() => {
    reload();
  }, [reload]);

  return { teams, loading, error, reload };
}
