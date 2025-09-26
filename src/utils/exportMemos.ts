import type { CurrentMemoId, Memo } from './types';

// File System Access API の型定義
interface FileSystemFileHandle {
  createWritable(): Promise<FileSystemWritableFileStream>;
}

interface FileSystemWritableFileStream {
  write(data: Blob): Promise<void>;
  close(): Promise<void>;
}

interface ShowSaveFilePickerOptions {
  suggestedName?: string;
  types?: Array<{
    description: string;
    accept: Record<string, string[]>;
  }>;
}

// Window インターフェースを拡張
declare global {
  interface Window {
    showSaveFilePicker?(options?: ShowSaveFilePickerOptions): Promise<FileSystemFileHandle>;
  }
}

export const exportMemosToJson = async (
  memos: Memo[],
  currentMemoId: CurrentMemoId
): Promise<void> => {
  const exportData = { memos, currentMemoId };
  const jsonData = JSON.stringify(exportData, null, 2);
  const blob = new Blob([jsonData], { type: 'application/json' });

  // File System Access API が利用可能かチェック
  if (window.showSaveFilePicker) {
    try {
      const timestamp = new Date().toISOString().replace(/[:]/g, '-');
      const fileHandle = await window.showSaveFilePicker({
        suggestedName: `memo-data-${timestamp}.json`,
        types: [
          {
            description: 'JSON files',
            accept: {
              'application/json': ['.json'],
            },
          },
        ],
      });

      const writable = await fileHandle.createWritable();
      await writable.write(blob);
      await writable.close();
    } catch (error) {
      // ユーザーがキャンセルした場合は何もしない
      if (error instanceof DOMException && error.name === 'AbortError') {
        console.log('User cancelled file save');
        return;
      }

      // その他のエラーの場合は従来の方法にフォールバック
      console.log('File System Access API failed, falling back to traditional download', error);
      fallbackDownload(blob);
    }
  } else {
    // File System Access API が利用できない場合は従来の方法を使用
    fallbackDownload(blob);
  }
};

// 従来のダウンロード方法（フォールバック）
const fallbackDownload = (blob: Blob) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  const timestamp = new Date().toISOString().replace(/[:]/g, '-');
  link.download = `memo-data-${timestamp}.json`;
  link.click();
  URL.revokeObjectURL(url);
};
