import { isMemoData } from './validators';
import { loadMemos, loadCurrentMemoId, saveMemos, saveCurrentMemoId } from './functions';

export const importMemosFromJson = async (file: File): Promise<void> => {
  try {
    await new Promise<void>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = async (e) => {
        try {
          const jsonData = e.target?.result as string;
          const parsed = JSON.parse(jsonData);

          if (!isMemoData(parsed)) {
            console.error('Invalid file format: MemoData structure mismatch');
            resolve(); // 異常系でもハングしないように resolve
            return;
          }

          const { memos, currentMemoId } = parsed;

          const loadedMemos = await loadMemos();
          const loadedCurrentMemoId = await loadCurrentMemoId();

          // 重複排除（IDベース）
          const existingIds = new Set(loadedMemos.map((m) => m.id));
          const filteredNewMemos = memos.filter((m) => !existingIds.has(m.id));

          const newMemos = [...loadedMemos, ...filteredNewMemos];
          const newCurrentMemoId = currentMemoId ?? loadedCurrentMemoId;

          await saveMemos(newMemos);
          await saveCurrentMemoId(newCurrentMemoId);

          console.info('Import successful');
          resolve();
        } catch (error) {
          console.error('Failed to parse or import JSON:', error);
          reject(error);
        }
      };

      reader.onerror = () => reject(reader.error);
      reader.readAsText(file);
    });
  } catch (error) {
    console.error('Failed to read file:', error);
  }
};
