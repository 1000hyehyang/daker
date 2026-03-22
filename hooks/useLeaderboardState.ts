"use client";

import { useCallback, useEffect, useState } from "react";
import { getLeaderboardForHackathon } from "@/lib/leaderboard-service";
import type { Leaderboard } from "@/lib/types/models";
import { initStorage } from "@/lib/storage";

export function useLeaderboardState(hackathonSlug: string) {
  const [leaderboard, setLeaderboard] = useState<Leaderboard | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState(true);

  const reload = useCallback(() => {
    setLoading(true);
    initStorage();
    setLeaderboard(getLeaderboardForHackathon(hackathonSlug));
    setLoading(false);
  }, [hackathonSlug]);

  useEffect(() => {
    reload();
  }, [reload]);

  return { leaderboard, loading, reload };
}
