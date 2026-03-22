/** ISO 문자열을 로케일 날짜로 (짧게) */
export function formatDateShort(iso: string, locale = "ko-KR"): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatPeriodRange(
  startIso: string,
  endIso: string,
  locale = "ko-KR",
): string {
  return `${formatDateShort(startIso, locale)} — ${formatDateShort(endIso, locale)}`;
}
