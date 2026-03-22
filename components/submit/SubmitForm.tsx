"use client";

import { useEffect, useState } from "react";
import { submitFormCopy } from "@/lib/content/submit";
import { saveDraft, submitSubmission } from "@/lib/submission-service";
import type { Submission } from "@/lib/types/models";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { SubmissionStatus } from "@/components/submit/SubmissionStatus";

export interface SubmitFormProps {
  hackathonSlug: string;
  teamCode: string;
  guideLines: string[];
  submission: Submission | undefined;
  onUpdated: () => void;
}

export function SubmitForm({
  hackathonSlug,
  teamCode,
  guideLines,
  submission,
  onUpdated,
}: SubmitFormProps) {
  const [plan, setPlan] = useState("");
  const [webUrl, setWebUrl] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState<"draft" | "submit" | null>(null);

  useEffect(() => {
    setPlan(submission?.artifacts.plan ?? "");
    setWebUrl(submission?.artifacts.webUrl ?? "");
    setPdfUrl(submission?.artifacts.pdfUrl ?? "");
  }, [submission]);

  const artifacts = { plan, webUrl, pdfUrl };

  const handleDraft = () => {
    setError(null);
    setPending("draft");
    try {
      saveDraft({ hackathonSlug, teamCode, artifacts });
      onUpdated();
    } catch (e) {
      setError(
        e instanceof Error ? e.message : submitFormCopy.errorDraft,
      );
    } finally {
      setPending(null);
    }
  };

  const handleSubmit = () => {
    setError(null);
    setPending("submit");
    try {
      submitSubmission({ hackathonSlug, teamCode, artifacts });
      onUpdated();
    } catch (e) {
      setError(
        e instanceof Error ? e.message : submitFormCopy.errorSubmit,
      );
    } finally {
      setPending(null);
    }
  };

  const submittedLocked = submission?.status === "submitted";

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="text-faint">{submitFormCopy.labelStatus}</span>
        <SubmissionStatus status={submission?.status} />
      </div>
      <ul className="list-inside list-disc space-y-1 text-muted">
        {guideLines.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm sm:col-span-2">
          <span className="text-faint">기획 / 메모</span>
          <Textarea
            disabled={submittedLocked}
            value={plan}
            onChange={(ev) => setPlan(ev.target.value)}
            rows={4}
            className="mt-1.5"
          />
        </label>
        <label className="block text-sm">
          <span className="text-faint">웹 URL</span>
          <Input
            disabled={submittedLocked}
            value={webUrl}
            onChange={(ev) => setWebUrl(ev.target.value)}
            className="mt-1.5"
            placeholder={submitFormCopy.placeholderUrl}
          />
        </label>
        <label className="block text-sm">
          <span className="text-faint">PDF URL</span>
          <Input
            disabled={submittedLocked}
            value={pdfUrl}
            onChange={(ev) => setPdfUrl(ev.target.value)}
            className="mt-1.5"
            placeholder={submitFormCopy.placeholderUrl}
          />
        </label>
      </div>
      {error && (
        <div className="state-error max-w-measure" role="alert">
          {error}
        </div>
      )}
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          disabled={submittedLocked || pending !== null}
          onClick={handleDraft}
          className="btn-secondary"
        >
          {pending === "draft"
            ? submitFormCopy.draftPending
            : submitFormCopy.draft}
        </button>
        <button
          type="button"
          disabled={submittedLocked || pending !== null}
          onClick={handleSubmit}
          className="btn-primary"
        >
          {pending === "submit"
            ? submitFormCopy.submitPending
            : submitFormCopy.submit}
        </button>
      </div>
      {submittedLocked && (
        <p className="text-sm text-faint">{submitFormCopy.lockedHint}</p>
      )}
    </div>
  );
}
