"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { teamFormCopy } from "@/lib/content/teamForm";
import { createTeam } from "@/lib/team-service";

export interface TeamCreateFormProps {
  hackathonSlug: string;
  onCreated?: (teamCode: string) => void;
}

/**
 * 필드를 논리적 덩어리로 나누고, 번호·설명으로 흐름을 안내.
 * 제출은 하단 고정 느낌으로 한 번에 ‘완료’ 행동만 강조.
 */
export function TeamCreateForm({ hackathonSlug, onCreated }: TeamCreateFormProps) {
  const [name, setName] = useState("");
  const [intro, setIntro] = useState("");
  const [contactUrl, setContactUrl] = useState("");
  const [lookingFor, setLookingFor] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [memberCount, setMemberCount] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const trimmed = name.trim();
    if (!trimmed) {
      setError(teamFormCopy.errorNameRequired);
      return;
    }
    setPending(true);
    try {
      const roles = lookingFor
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const team = createTeam({
        hackathonSlug,
        name: trimmed,
        isOpen,
        memberCount,
        lookingFor: roles,
        intro: intro.trim() || teamFormCopy.defaultIntro,
        contact: { type: "link", url: contactUrl.trim() || "#" },
      });
      onCreated?.(team.teamCode);
      setName("");
      setIntro("");
      setContactUrl("");
      setLookingFor("");
      setIsOpen(true);
      setMemberCount(1);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : teamFormCopy.errorCreateFailed,
      );
    } finally {
      setPending(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-12 border-t border-border pt-12"
    >
      <header className="max-w-measure">
        <p className="eyebrow">{teamFormCopy.pageEyebrow}</p>
        <h3 className="mt-2 text-title">{teamFormCopy.pageTitle}</h3>
        <p className="mt-2 text-sm text-muted">{teamFormCopy.pageIntro}</p>
      </header>

      <div className="mt-10 space-y-12">
        <fieldset className="space-y-5 border-0 p-0">
          <legend className="w-full border-b border-border pb-3 text-sm font-semibold text-foreground">
            {teamFormCopy.section1Title}
          </legend>
          <p className="text-xs text-faint">{teamFormCopy.section1Hint}</p>
          <div className="grid max-w-measure gap-5">
            <label className="block">
              <span className="text-sm font-medium text-foreground">
                {teamFormCopy.labelName}{" "}
                <span className="text-danger">*</span>
              </span>
              <Input
                required
                value={name}
                onChange={(ev) => setName(ev.target.value)}
                className="mt-2"
                placeholder={teamFormCopy.placeholderName}
                autoComplete="off"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-foreground">
                {teamFormCopy.labelIntro}
              </span>
              <Textarea
                value={intro}
                onChange={(ev) => setIntro(ev.target.value)}
                rows={3}
                className="mt-2"
                placeholder={teamFormCopy.placeholderIntro}
              />
            </label>
          </div>
        </fieldset>

        <fieldset className="space-y-5 border-0 p-0">
          <legend className="w-full border-b border-border pb-3 text-sm font-semibold text-foreground">
            {teamFormCopy.section2Title}
          </legend>
          <p className="text-xs text-faint">{teamFormCopy.section2Hint}</p>
          <div className="grid max-w-measure gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-foreground">
                {teamFormCopy.labelMembers}
              </span>
              <Input
                type="number"
                min={1}
                value={memberCount}
                onChange={(ev) => setMemberCount(Number(ev.target.value))}
                className="mt-2"
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="text-sm font-medium text-foreground">
                {teamFormCopy.labelRoles}
              </span>
              <Input
                value={lookingFor}
                onChange={(ev) => setLookingFor(ev.target.value)}
                className="mt-2"
                placeholder={teamFormCopy.placeholderRoles}
              />
            </label>
            <div className="sm:col-span-2">
              <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-border bg-muted-bg/40 px-4 py-3 transition hover:bg-muted-bg/80 focus-within:ring-2 focus-within:ring-ring/30">
                <Checkbox
                  checked={isOpen}
                  onChange={(ev) => setIsOpen(ev.target.checked)}
                  className="mt-0.5"
                />
                <span>
                  <span className="block text-sm font-medium text-foreground">
                    {teamFormCopy.labelRecruiting}
                  </span>
                  <span className="mt-0.5 block text-xs text-muted">
                    {teamFormCopy.recruitingHelp}
                  </span>
                </span>
              </label>
            </div>
          </div>
        </fieldset>

        <fieldset className="space-y-5 border-0 p-0">
          <legend className="w-full border-b border-border pb-3 text-sm font-semibold text-foreground">
            {teamFormCopy.section3Title}
          </legend>
          <p className="text-xs text-faint">{teamFormCopy.section3Hint}</p>
          <label className="block max-w-measure">
            <span className="text-sm font-medium text-foreground">
              {teamFormCopy.labelContact}
            </span>
            <Input
              value={contactUrl}
              onChange={(ev) => setContactUrl(ev.target.value)}
              className="mt-2"
              placeholder={teamFormCopy.placeholderUrl}
              inputMode="url"
            />
          </label>
        </fieldset>
      </div>

      {error && (
        <div className="state-error mt-10 max-w-measure" role="alert">
          {error}
        </div>
      )}

      <div className="mt-10 flex flex-col items-stretch gap-3 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-faint">{teamFormCopy.submitHint}</p>
        <button
          type="submit"
          disabled={pending}
          className="btn-primary-emphasis w-full min-w-[160px] sm:w-auto"
        >
          {pending ? teamFormCopy.submitPending : teamFormCopy.submitIdle}
        </button>
      </div>
    </form>
  );
}
