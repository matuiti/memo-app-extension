export interface Memo {
  id: number;
  title: string;
  content: string;
}

export interface MemoData {
  memos: Memo[];
  currentMemoId: number | null;
}


