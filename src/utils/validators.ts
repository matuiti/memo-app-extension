import type { MemoData, Memo } from "./types";

// 基本的なオブジェクト構造の検証
const hasValidStructure = (data: unknown): data is { memos: unknown; currentMemoId: unknown } => {
  return typeof data === 'object' && data !== null && 'memos' in data && 'currentMemoId' in data;
};

// 単一のメモオブジェクトの検証
const isValidMemo = (memo: unknown): memo is Memo => {
  if (typeof memo !== 'object' || memo === null) return false;

  const m = memo as { id: unknown; title: unknown; content: unknown };
  return typeof m.id === 'number' && typeof m.title === 'string' && typeof m.content === 'string';
};

// メモ配列の検証
const isValidMemoArray = (memos: unknown): memos is Memo[] => {
  return Array.isArray(memos) && memos.every(isValidMemo);
};

// currentMemoIdの検証
const isValidCurrentMemoId = (
  currentMemoId: unknown
): currentMemoId is number | null => {
  return typeof currentMemoId === "number" || currentMemoId === null;
};

// メインのバリデーション関数
export const isMemoData = (data: unknown): data is MemoData => {
  // 基本構造の検証
  if (!hasValidStructure(data)) {
    return false;
  }

  // 各プロパティの検証
  const { memos, currentMemoId } = data;

  return isValidMemoArray(memos) && isValidCurrentMemoId(currentMemoId);
};

// エラー情報付きバリデーション（オプション）
export const validateMemoData = (
  data: unknown
): { isValid: boolean; error?: string } => {
  if (!hasValidStructure(data)) {
    return {
      isValid: false,
      error: "Invalid structure: missing 'memos' or 'currentMemoId'",
    };
  }

  const { memos, currentMemoId } = data;

  if (!isValidMemoArray(memos)) {
    return {
      isValid: false,
      error: "Invalid memos: must be an array of valid memo objects",
    };
  }

  if (!isValidCurrentMemoId(currentMemoId)) {
    return {
      isValid: false,
      error: "Invalid currentMemoId: must be a number or null",
    };
  }

  return { isValid: true };
};
