/** 제출 폼·상태 배지 */
export const submitFormCopy = {
  labelStatus: "상태",
  draft: "임시저장",
  submit: "최종 제출",
  draftPending: "저장 중…",
  submitPending: "제출 중…",
  errorDraft: "임시저장에 실패했습니다.",
  errorSubmit: "제출에 실패했습니다.",
  lockedHint:
    "제출이 완료되어 수정할 수 없습니다. 리더보드에 점수가 반영되었습니다.",
  placeholderUrl: "https://",
} as const;

export const submissionStatusLabel = {
  draft: "임시저장",
  submitted: "제출 완료",
  none: "제출 이력 없음",
} as const;
