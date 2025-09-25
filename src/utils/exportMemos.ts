import type { CurrentMemoId, Memo } from "./types";

export const exportMemosToJson = async (
  memos: Memo[],
  currentMemoId: CurrentMemoId
): Promise<void> => {
  const exportData = { memos, currentMemoId };
  const jsonData = JSON.stringify(exportData, null, 2);
  const blob = new Blob([jsonData], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  const timestamp = new Date().toISOString().replace(/[:]/g, "-");
  link.download = `memo-data-${timestamp}.json`;
  link.click();

  URL.revokeObjectURL(url);
};
