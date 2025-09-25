import type { Dispatch, SetStateAction } from "react";
import type { CurrentMemoId, Memo } from "./types";
import { loadCurrentMemoId, loadMemos } from "./storage";
import { isEmpty } from "./utils";

// 初期化関数
export const initializeMemos = async (
  setMemos: Dispatch<SetStateAction<Memo[]>>
): Promise<void> => {
  try {
    const loadedMemos = await loadMemos();
    if (!isEmpty(loadedMemos)) {
      setMemos(loadedMemos);
    }
  } catch (error) {
    console.error("Failed to initialize memos:", error);
  }
};

export const initializeCurrentMemoId = async (
  setCurrentMemoId: Dispatch<SetStateAction<CurrentMemoId>>
): Promise<void> => {
  try {
    const loadedCurrentMemoId = await loadCurrentMemoId();
    if (!isEmpty(loadedCurrentMemoId)) {
      setCurrentMemoId(loadedCurrentMemoId);
    }
  } catch (error) {
    console.error("Failed to initialize current memo ID:", error);
  }
};