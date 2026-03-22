"use client";

import Link from "next/link";

import { landingCopy } from "@/lib/content/landing";

export function SiteFooter() {
  const { footer } = landingCopy;

  return (
    <footer className="mt-24 border-t border-border/90 pb-12 pt-10">
      <div className="cyber-divider mx-auto mb-10 max-w-content opacity-70" />
      <div className="mx-auto flex max-w-content flex-col gap-8 px-5 sm:flex-row sm:items-end sm:justify-between sm:px-8 lg:px-12">
        <div>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-neon">
            {footer.product}
          </p>
          <p className="mt-2 text-xs text-faint">{footer.note}</p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="푸터 링크">
          {footer.links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted transition hover:text-neon"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
      <p className="mx-auto mt-10 max-w-content px-5 text-center text-[11px] text-faint sm:px-8 lg:px-12">
        © {new Date().getFullYear()} DAKER · {footer.copyrightTagline}
      </p>
    </footer>
  );
}
