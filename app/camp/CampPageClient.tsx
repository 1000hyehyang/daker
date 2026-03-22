"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { TeamCreateForm } from "@/components/team/TeamCreateForm";
import { TeamList } from "@/components/team/TeamList";
import { Select } from "@/components/ui/Select";
import { Skeleton } from "@/components/ui/Skeleton";
import { campPageCopy } from "@/lib/content/pages";
import { useParticipationState } from "@/hooks/useParticipationState";
import { useTeams } from "@/hooks/useTeams";
import { getHackathons, initStorage } from "@/lib/storage";
import type { Hackathon } from "@/lib/types/models";

export function CampPageClient() {
  const hackathonFilterId = useId();
  const router = useRouter();
  const searchParams = useSearchParams();
  const querySlug = searchParams.get("hackathon");
  const filterSlug = querySlug ?? "all";

  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [hLoading, setHLoading] = useState(true);

  useEffect(() => {
    initStorage();
    setHackathons(getHackathons());
    setHLoading(false);
  }, []);

  const { teams, loading: teamsLoading, error: teamsError, reload } = useTeams(
    filterSlug === "all" ? undefined : filterSlug,
  );

  const { myTeamCode, join, leave, reload: reloadPart } =
    useParticipationState(filterSlug === "all" ? null : filterSlug);

  const reloadAll = () => {
    initStorage();
    setHackathons(getHackathons());
    reload();
    reloadPart();
  };

  const onHackathonChange = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (slug === "all") params.delete("hackathon");
    else params.set("hackathon", slug);
    const q = params.toString();
    router.replace(q ? `/camp?${q}` : "/camp");
  };

  if (hLoading) {
    return (
      <main className="flex flex-1 flex-col gap-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-24 w-full" />
      </main>
    );
  }

  return (
    <main className="flex flex-1 flex-col">
      <Link href="/" className="link-subtle text-sm">
        {campPageCopy.back}
      </Link>
      <h1 className="mt-8 text-display">{campPageCopy.title}</h1>
      <p className="mt-4 max-w-measure text-muted">{campPageCopy.description}</p>

      <div className="mt-12 max-w-md">
        <label className="block text-sm" htmlFor={hackathonFilterId}>
          <span className="text-faint">{campPageCopy.filterLabel}</span>
          <Select
            id={hackathonFilterId}
            className="mt-1.5"
            value={filterSlug}
            onChange={onHackathonChange}
            options={[
              { value: "all", label: campPageCopy.filterAllOption },
              ...hackathons.map((h) => ({
                value: h.slug,
                label: h.title,
              })),
            ]}
          />
        </label>
      </div>

      {filterSlug !== "all" && (
        <dl className="mt-10 grid max-w-measure gap-6 border-t border-border pt-10 sm:grid-cols-2">
          <div>
            <dt className="text-faint">{campPageCopy.myTeamDt}</dt>
            <dd className="mt-1 font-mono text-sm text-foreground">
              {myTeamCode ?? campPageCopy.emptyCode}
              {myTeamCode && (
                <button
                  type="button"
                  onClick={() => {
                    leave();
                    reloadAll();
                  }}
                  className="btn-ghost ml-3 p-0 text-xs font-sans"
                >
                  {campPageCopy.leaveParticipation}
                </button>
              )}
            </dd>
          </div>
        </dl>
      )}

      <div className="mt-12">
        {teamsLoading && (
          <p className="text-sm text-muted">{campPageCopy.loadingTeams}</p>
        )}
        {teamsError && (
          <div className="state-error max-w-measure" role="alert">
            {teamsError}
          </div>
        )}
        {!teamsLoading && !teamsError && (
          <TeamList
            teams={teams}
            myTeamCode={filterSlug === "all" ? undefined : myTeamCode}
            onJoinTeam={
              filterSlug === "all"
                ? undefined
                : (code) => {
                    join(code);
                    reloadAll();
                  }
            }
            joinDisabled={filterSlug !== "all" && Boolean(myTeamCode)}
          />
        )}
      </div>

      {filterSlug !== "all" && (
        <TeamCreateForm
          hackathonSlug={filterSlug}
          onCreated={() => reloadAll()}
        />
      )}

      {filterSlug === "all" && (
        <p className="mt-10 text-sm text-faint">{campPageCopy.createHint}</p>
      )}
    </main>
  );
}
