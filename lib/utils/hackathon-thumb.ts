import type { Hackathon } from "@/lib/types/models";

/** 목록 썸네일 URL — placeholder(example.com)는 slug 기반 고정 이미지로 대체 */
export function hackathonThumbnailSrc(hackathon: Hackathon): string {
  const u = hackathon.thumbnailUrl?.trim();
  if (u && !u.includes("example.com")) return u;
  return `https://picsum.photos/seed/${encodeURIComponent(hackathon.slug)}/400/225`;
}
