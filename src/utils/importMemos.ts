import {
  loadCurrentMemoId,
  loadMemos,
  saveCurrentMemoId,
  saveMemos,
} from "./storage";
import type { CurrentMemoId, Memo, MemoData } from "./types";
import { validateMemoData } from "./validators";

// ファイルを読み取ってJSONとしてパース
const readFileAsJson = (file: File): Promise<MemoData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const jsonData = e.target?.result as string;
        const parsed = JSON.parse(jsonData);
        resolve(parsed);
      } catch (error) {
        reject(new Error(`Failed to parse JSON: ${error}`));
      }
    };

    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
};

// 重複を排除してメモをマージ
const mergeMemosWithoutDuplicates = (
  existingMemos: Memo[],
  newMemos: Memo[]
): Memo[] => {
  const existingIds = new Set(existingMemos.map((m) => m.id));
  const filteredNewMemos = newMemos.filter((m) => !existingIds.has(m.id));
  return [...existingMemos, ...filteredNewMemos];
};

// 現在のメモIDを決定（新しいIDがあれば優先、なければ既存のIDを使用）
const determineCurrentMemoId = (
  importedCurrentMemoId: CurrentMemoId,
  existingCurrentMemoId: CurrentMemoId
): CurrentMemoId => {
  return importedCurrentMemoId ?? existingCurrentMemoId;
};

// インポートしたデータを処理してストレージに保存
const processImportedData = async (importedData: MemoData): Promise<void> => {
  const validation = validateMemoData(importedData);
  if (!validation.isValid) {
    throw new Error(`Invalid memo data: ${validation.error}`);
  }

  const { memos: importedMemos, currentMemoId: importedCurrentMemoId } =
    importedData;

  // 現在のデータを読み込み
  const [existingMemos, existingCurrentMemoId] = await Promise.all([
    loadMemos(),
    loadCurrentMemoId(),
  ]);

  // データをマージ
  const mergedMemos = mergeMemosWithoutDuplicates(existingMemos, importedMemos);
  const newCurrentMemoId = determineCurrentMemoId(
    importedCurrentMemoId,
    existingCurrentMemoId
  );

  // ストレージに保存
  await Promise.all([
    saveMemos(mergedMemos),
    saveCurrentMemoId(newCurrentMemoId),
  ]);

  console.info("Import successful");
};

// メイン関数：JSONファイルからメモをインポート
export const importMemosFromJson = async (file: File): Promise<void> => {
  try {
    const importedData = await readFileAsJson(file);
    await processImportedData(importedData);
  } catch (error) {
    console.error("Failed to import memos:", error);
    throw error; // エラーを再スローして呼び出し元で適切に処理できるようにする
  }
};
