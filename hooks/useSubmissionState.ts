"use client";

import { useCallback, useEffect, useState } from "react";
import { getSubmission } from "@/lib/submission-service";
import type { Submission } from "@/lib/types/models";
import { initStorage } from "@/lib/storage";

export function useSubmissionState(
  hackathonSlug: string,
  teamCode: string | undefined,
) {
  const [submission, setSubmission] = useState<Submission | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState(true);

  const reload = useCallback(() => {
    setLoading(true);
    initStorage();
    if (!teamCode) {
      setSubmission(undefined);
      setLoading(false);
      return;
    }
    setSubmission(getSubmission(hackathonSlug, teamCode));
    setLoading(false);
  }, [hackathonSlug, teamCode]);

  useEffect(() => {
    reload();
  }, [reload]);

  return { submission, loading, reload };
}
