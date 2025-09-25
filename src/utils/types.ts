export type MemoId = number;
export type CurrentMemoId = number | null;

export interface Memo {
  id: MemoId;
  title: string;
  content: string;
}

export interface MemoData {
  memos: Memo[];
  currentMemoId: CurrentMemoId;
}
