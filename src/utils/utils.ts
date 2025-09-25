import type { CurrentMemoId, Memo } from "./types";

// ユーティリティ関数
export const isEmpty = (val: Memo[] | CurrentMemoId): boolean => {
  return val ? false : true;
};

// contentの最初の文字を任意の文字数分返す
export const generateTitle = (content: string, length: number = 10): string => {
  const trimmedContent = content.trim();
  return trimmedContent.length > length
    ? trimmedContent.slice(0, length) + "..."
    : trimmedContent;
};