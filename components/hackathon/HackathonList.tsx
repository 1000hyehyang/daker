import type { Hackathon } from "@/lib/types/models";
import { hackathonListCopy } from "@/lib/content/hackathon";
import { HackathonCard } from "@/components/hackathon/HackathonCard";

export interface HackathonListProps {
  hackathons: Hackathon[];
  totalCount: number;
}

export function HackathonList({ hackathons, totalCount }: HackathonListProps) {
  if (totalCount === 0) {
    return (
      <div className="state-empty" role="status">
        <p className="font-medium text-foreground">
          {hackathonListCopy.emptyAllTitle}
        </p>
        <p className="mt-2 max-w-measure text-muted">
          {hackathonListCopy.emptyAllHint}
        </p>
      </div>
    );
  }

  if (hackathons.length === 0) {
    return (
      <div className="state-empty" role="status">
        <p className="font-medium text-foreground">
          {hackathonListCopy.emptyFilterTitle}
        </p>
        <p className="mt-2 text-muted">
          {hackathonListCopy.emptyFilterHint}
        </p>
      </div>
    );
  }

  return (
    <ul
      className="grid w-full grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-14 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-16"
      role="list"
    >
      {hackathons.map((h) => (
        <li key={h.slug} className="flex min-w-0">
          <HackathonCard hackathon={h} />
        </li>
      ))}
    </ul>
  );
}
