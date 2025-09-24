import type { MemoData } from "./types";

export const isMemoData = (data: unknown): data is MemoData => {
  if (
    typeof data !== "object" ||
    data === null ||
    !("memos" in data) ||
    !("currentMemoId" in data)
  ) {
    return false;
  }

  const memos = (data as MemoData).memos;
  const currentMemoId = (data as MemoData).currentMemoId;

  if (
    !Array.isArray(memos) ||
    !memos.every(
      (memo) =>
        typeof memo === 'object' &&
        memo !== null &&
        typeof memo.id === 'number' &&
        typeof memo.title === 'string' &&
        typeof memo.content === 'string'
    )
  ) {
    return false;
  }

  if (typeof currentMemoId !== "number" && currentMemoId !== null) {
    return false;
  }

  return true;
};
