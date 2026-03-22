import { submissionStatusLabel } from "@/lib/content/submit";
import type { SubmissionStatus as T } from "@/lib/types/models";

export interface SubmissionStatusProps {
  status: T | undefined;
}

export function SubmissionStatus({ status }: SubmissionStatusProps) {
  if (!status) {
    return (
      <span className="text-faint">{submissionStatusLabel.none}</span>
    );
  }
  const label =
    status === "draft"
      ? submissionStatusLabel.draft
      : submissionStatusLabel.submitted;
  return <span className="font-medium text-foreground">{label}</span>;
}
