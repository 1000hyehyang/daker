"use client";

import { useCallback, useEffect, useState } from "react";
import {
  clearMyTeam,
  getMyTeamCode,
  setMyTeam,
} from "@/lib/participation";
import { initStorage } from "@/lib/storage";

/** hackathonSlug가 null이면 참여 상태를 읽지 않음 (캠프 전체 보기 등) */
export function useParticipationState(hackathonSlug: string | null) {
  const [myTeamCode, setMyTeamCode] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(() => {
    setLoading(true);
    initStorage();
    if (!hackathonSlug) {
      setMyTeamCode(undefined);
      setLoading(false);
      return;
    }
    setMyTeamCode(getMyTeamCode(hackathonSlug));
    setLoading(false);
  }, [hackathonSlug]);

  useEffect(() => {
    reload();
  }, [reload]);

  const join = useCallback(
    (teamCode: string) => {
      if (!hackathonSlug) return;
      setMyTeam(hackathonSlug, teamCode);
      setMyTeamCode(teamCode);
    },
    [hackathonSlug],
  );

  const leave = useCallback(() => {
    if (!hackathonSlug) return;
    clearMyTeam(hackathonSlug);
    setMyTeamCode(undefined);
  }, [hackathonSlug]);

  return { myTeamCode, loading, reload, join, leave };
}
