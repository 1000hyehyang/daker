import type { Team } from "@/lib/types/models";
import { teamListCopy } from "@/lib/content/team";
import { TeamCard } from "@/components/team/TeamCard";

export interface TeamListProps {
  teams: Team[];
  myTeamCode?: string;
  onJoinTeam?: (teamCode: string) => void;
  joinDisabled?: boolean;
}

/**
 * 균등 그리드 대신 세로 스택 + 행 간 여백으로 리듬을 줌.
 * 상단에 짧은 설명으로 스캔 기대치를 맞춤.
 */
export function TeamList({
  teams,
  myTeamCode,
  onJoinTeam,
  joinDisabled,
}: TeamListProps) {
  if (teams.length === 0) {
    return (
      <div className="state-empty max-w-measure" role="status">
        <p className="font-medium text-foreground">{teamListCopy.emptyTitle}</p>
        <p className="mt-2">{teamListCopy.emptyHint}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-1 border-b border-border pb-4">
        <p className="eyebrow">{teamListCopy.sectionEyebrow}</p>
        <p className="text-sm text-muted">{teamListCopy.sectionDescription}</p>
      </div>
      <ul className="flex flex-col gap-3" role="list">
        {teams.map((t) => (
          <li key={t.teamCode}>
            <TeamCard
              team={t}
              isMyTeam={myTeamCode === t.teamCode}
              onJoin={onJoinTeam ? () => onJoinTeam(t.teamCode) : undefined}
              joinDisabled={joinDisabled}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
