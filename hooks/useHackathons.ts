"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { HackathonFilterStatus } from "@/lib/content/hackathon";
import type { Hackathon } from "@/lib/types/models";
import { getHackathons, initStorage } from "@/lib/storage";

export type { HackathonFilterStatus };

function isHackathonArray(value: unknown): value is Hackathon[] {
  if (!Array.isArray(value)) return false;
  return value.every(
    (item) =>
      item &&
      typeof item === "object" &&
      typeof (item as Hackathon).slug === "string" &&
      typeof (item as Hackathon).title === "string" &&
      typeof (item as Hackathon).status === "string",
  );
}

export interface UseHackathonsResult {
  items: Hackathon[];
  filtered: Hackathon[];
  statusFilter: HackathonFilterStatus;
  setStatusFilter: (v: HackathonFilterStatus) => void;
  loading: boolean;
  error: string | null;
  reload: () => void;
}

export function useHackathons(): UseHackathonsResult {
  const [items, setItems] = useState<Hackathon[]>([]);
  const [statusFilter, setStatusFilter] =
    useState<HackathonFilterStatus>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(() => {
    setLoading(true);
    setError(null);
    try {
      initStorage();
      const raw = getHackathons();
      if (!isHackathonArray(raw)) {
        setError("저장된 해커톤 데이터 형식이 올바르지 않습니다.");
        setItems([]);
        return;
      }
      setItems(raw);
    } catch (e) {
      const message =
        e instanceof Error ? e.message : "데이터를 불러오지 못했습니다.";
      setError(message);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const filtered = useMemo(() => {
    if (statusFilter === "all") return items;
    return items.filter((h) => h.status === statusFilter);
  }, [items, statusFilter]);

  return {
    items,
    filtered,
    statusFilter,
    setStatusFilter,
    loading,
    error,
    reload,
  };
}
