import type { CurrentMemoId, Memo } from "./types";

// ストレージ操作
export const saveMemos = async (memos: Memo[]): Promise<void> => {
  await chrome.storage.local.set({ memos });
};

export const loadMemos = async (): Promise<Memo[]> => {
  const result = await chrome.storage.local.get("memos");
  return result.memos || [];
};

export const saveCurrentMemoId = async (
  currentMemoId: CurrentMemoId
): Promise<void> => {
  await chrome.storage.local.set({ currentMemoId });
};

export const loadCurrentMemoId = async (): Promise<CurrentMemoId> => {
  const result = await chrome.storage.local.get("currentMemoId");
  return result.currentMemoId;
};