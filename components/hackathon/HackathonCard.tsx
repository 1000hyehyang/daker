"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { HackathonStatusBadge } from "@/components/hackathon/HackathonStatusBadge";
import { hackathonCardCopy } from "@/lib/content/hackathon";
import type { Hackathon } from "@/lib/types/models";
import { hackathonThumbnailSrc } from "@/lib/utils/hackathon-thumb";
import { formatPeriodRange } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";

const MotionLink = motion(Link);

function formatKRW(n: number) {
  return `${n.toLocaleString("ko-KR")}원`;
}

function ctaLabel(status: Hackathon["status"]) {
  if (status === "ended") return hackathonCardCopy.ctaEnded;
  if (status === "ongoing") return hackathonCardCopy.ctaJoin;
  return hackathonCardCopy.ctaView;
}

export interface HackathonCardProps {
  hackathon: Hackathon;
}

export function HackathonCard({ hackathon }: HackathonCardProps) {
  const { slug, title, status, tags, period, organizer, stats } = hackathon;
  const periodLabel = formatPeriodRange(
    period.submissionDeadlineAt,
    period.endAt,
  );
  const org = organizer?.trim() || hackathonCardCopy.organizerFallback;
  const thumbSrc = hackathonThumbnailSrc(hackathon);

  return (
    <MotionLink
      href={`/hackathons/${slug}`}
      className="hack-list-card group h-full min-h-0 w-full"
      transition={{ type: "spring", stiffness: 420, damping: 36 }}
    >
      <div className="hack-list-card__thumb relative aspect-[3/2] w-full shrink-0 overflow-hidden rounded-2xl">
        <Image
          src={thumbSrc}
          alt={title}
          fill
          className="object-cover transition duration-500 group-hover:scale-[1.02] group-hover:opacity-[0.97]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={false}
        />
      </div>

      <div className="flex min-h-0 flex-1 flex-col pt-5">
        <div className="flex flex-col gap-2.5">
          <HackathonStatusBadge status={status} />

          <h2 className="line-clamp-2 min-h-[2.75rem] text-lg font-semibold leading-snug tracking-tight text-foreground sm:text-xl">
            {title}
          </h2>
          <p className="text-[13px] leading-relaxed text-muted">{org}</p>
          <p className="text-[13px] tabular-nums leading-normal text-faint">
            {periodLabel}
          </p>

          {(stats?.prizeTotalKRW != null ||
            stats?.participantCount != null ||
            stats?.viewCount != null) && (
            <dl className="flex flex-wrap gap-x-5 gap-y-1 text-[12px] leading-relaxed text-muted">
              {stats?.prizeTotalKRW != null && (
                <div>
                  <dt className="inline text-faint">
                    {hackathonCardCopy.prizeShort}
                  </dt>{" "}
                  <dd className="inline tabular-nums text-foreground">
                    {formatKRW(stats.prizeTotalKRW)}
                  </dd>
                </div>
              )}
              {stats?.participantCount != null && (
                <div>
                  <dt className="inline text-faint">
                    {hackathonCardCopy.participantsShort}
                  </dt>{" "}
                  <dd className="inline tabular-nums text-foreground">
                    {stats.participantCount.toLocaleString("ko-KR")}
                  </dd>
                </div>
              )}
              {stats?.viewCount != null && (
                <div>
                  <dt className="inline text-faint">
                    {hackathonCardCopy.viewsShort}
                  </dt>{" "}
                  <dd className="inline tabular-nums text-foreground">
                    {stats.viewCount.toLocaleString("ko-KR")}
                  </dd>
                </div>
              )}
            </dl>
          )}
        </div>

        <div className="mt-auto flex flex-col pt-7">
          {tags.length > 0 && (
            <p className="text-[12px] leading-relaxed text-muted/90">
              {tags.join(" · ")}
            </p>
          )}
          <p
            className={cn(
              "text-[15px] font-medium",
              tags.length > 0 && "mt-3",
              status === "ongoing" && "text-foreground",
              status === "upcoming" && "text-foreground",
              status === "ended" && "text-muted",
            )}
          >
            <span className="underline decoration-border/60 underline-offset-4 transition group-hover:decoration-foreground/40">
              {ctaLabel(status)}
            </span>
          </p>
        </div>
      </div>
    </MotionLink>
  );
}
