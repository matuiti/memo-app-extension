import type { Dispatch, SetStateAction } from "react";
import type { Memo } from "./types";

// contentの最初の任意文字数の文字を返す
export const generateTitle = (content: string, length: number = 10): string => {
  const trimmedContent = content.trim();
  return trimmedContent.length > length
    ? trimmedContent.slice(0, length) + "..."
    : trimmedContent;
};

// メモの処理
export const saveMemos = async (memos: Memo[]) => {
  await chrome.storage.local.set({ memos });
};

export const loadMemos = async (): Promise<Memo[]> => {
  const result = await chrome.storage.local.get("memos");
  return result.memos || [];
};

export const initializeLoadMemos = async (): Promise<Memo[] | undefined> => {
  try {
    const loadedMemos = await loadMemos();
    if (isStorageEmpty(loadedMemos)) return;
    return loadedMemos;
  } catch (error) {
    console.error("Failed to load memos:", error);
  }
};

export const isStorageEmpty = (memos: Memo[]): boolean => {
  return memos.length === 0;
};

export const initializeSetMemos = (
  memos: Memo[],
  setMemos: Dispatch<SetStateAction<Memo[]>>
) => {
  setMemos(memos);
};

export const initializeMemos = async (
  setMemos: Dispatch<SetStateAction<Memo[]>>
) => {
  try {
    const loadedMemos = await initializeLoadMemos();
    if (loadedMemos) initializeSetMemos(loadedMemos, setMemos);
  } catch (error) {
    console.error("Failed to initialize memos:", error);
  }
};

// カレントIDの処理
export const saveCurrentMemoId = async (currentMemoId: number | null) => {
  await chrome.storage.local.set({ currentMemoId });
};

export const loadCurrentMemoId = async (): Promise<number | null> => {
  const result = await chrome.storage.local.get("currentMemoId");
  return result.currentMemoId || null;
};

export const initializeLoadCurrentMemoId = async (): Promise<
  number | null | undefined
> => {
  try {
    return await loadCurrentMemoId();
  } catch (error) {
    console.error("Failed to load current memo ID:", error);
  }
};

export const initializeSetCurrentMemoId = (
  currentMemoId: number | null,
  setCurrentMemoId: Dispatch<SetStateAction<number | null>>
) => {
  setCurrentMemoId(currentMemoId ?? null);
};

export const initializeCurrentMemoId = async (
  setCurrentMemoId: Dispatch<SetStateAction<number | null>>
) => {
  try {
    const loadedCurrentMemoId = await initializeLoadCurrentMemoId();
    if (loadedCurrentMemoId) {
      initializeSetCurrentMemoId(loadedCurrentMemoId, setCurrentMemoId);
    }
  } catch (error) {
    console.error("Failed to initialize current memo ID:", error);
  }
};
