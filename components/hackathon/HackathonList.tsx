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
    <div className="border-t border-border">
      {hackathons.map((h) => (
        <HackathonCard key={h.slug} hackathon={h} />
      ))}
    </div>
  );
}
