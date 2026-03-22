import Link from "next/link";
import { homeCopy } from "@/lib/content/home";

/**
 * Asymmetric home: primary narrative column + narrow “wayfinding” column.
 * Avoids equal card grids; hierarchy comes from type size and spacing (Stripe-like).
 */
export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col lg:flex-row lg:items-start lg:gap-16 xl:gap-24">
      <div className="max-w-measure flex-1">
        <p className="eyebrow">{homeCopy.eyebrow}</p>
        <h1 className="mt-4 text-display text-foreground">
          {homeCopy.headlineLine1}
          <br className="hidden sm:block" /> {homeCopy.headlineLine2}
        </h1>
        <p className="mt-6 max-w-measure text-base leading-relaxed text-muted">
          {homeCopy.description}
        </p>
      </div>

      <aside className="mt-14 w-full shrink-0 border-t border-border pt-10 lg:mt-0 lg:w-[min(100%,280px)] lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
        <p className="eyebrow">{homeCopy.navEyebrow}</p>
        <nav
          className="mt-6 flex flex-col gap-0"
          aria-label={homeCopy.navAriaLabel}
        >
          <Link
            href="/hackathons"
            className="group border-b border-border py-4 first:pt-0"
          >
            <span className="block text-title text-foreground transition group-hover:text-accent">
              {homeCopy.links.hackathons.title}
            </span>
            <span className="mt-1 block text-sm text-muted">
              {homeCopy.links.hackathons.desc}
            </span>
          </Link>
          <Link href="/camp" className="group border-b border-border py-4">
            <span className="block text-title text-foreground transition group-hover:text-accent">
              {homeCopy.links.camp.title}
            </span>
            <span className="mt-1 block text-sm text-muted">
              {homeCopy.links.camp.desc}
            </span>
          </Link>
          <Link href="/rankings" className="group py-4">
            <span className="block text-title text-foreground transition group-hover:text-accent">
              {homeCopy.links.rankings.title}
            </span>
            <span className="mt-1 block text-sm text-muted">
              {homeCopy.links.rankings.desc}
            </span>
          </Link>
        </nav>
      </aside>
    </main>
  );
}
