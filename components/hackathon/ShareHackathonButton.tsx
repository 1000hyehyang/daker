"use client";

import { useCallback, useState } from "react";
import { hackathonDetailHeroCopy } from "@/lib/content/detailSections";

export function ShareHackathonButton() {
  const [label, setLabel] = useState<string>(hackathonDetailHeroCopy.share);

  const onShare = useCallback(() => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    void (async () => {
      try {
        await navigator.clipboard.writeText(url);
        setLabel(hackathonDetailHeroCopy.shareDone);
        setTimeout(() => setLabel(hackathonDetailHeroCopy.share), 2000);
      } catch {
        setLabel(hackathonDetailHeroCopy.shareFail);
        setTimeout(() => setLabel(hackathonDetailHeroCopy.share), 2500);
      }
    })();
  }, []);

  return (
    <button
      type="button"
      onClick={onShare}
      className="btn-ghost shrink-0 border border-border px-3 py-2 text-xs font-semibold uppercase tracking-wide text-muted transition hover:border-neon/35 hover:text-foreground"
    >
      {label}
    </button>
  );
}
