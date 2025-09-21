import { useEffect, useState, useContext } from "react";
import { generateTitle, saveMemos } from "../utils/functions";
import {
  CurrentMemoIdContext,
  MemoContext,
  TextAreaRefContext,
} from "../utils/contexts";
import type { Memo } from "../utils/types";

const TextArea = () => {
  const textAreaRef = useContext(TextAreaRefContext);

  const memoContext = useContext(MemoContext);
  const [memos, setMemos] = memoContext ?? [[], () => {}];

  const currentMemoIdContext = useContext(CurrentMemoIdContext);
  const [currentMemoId] = currentMemoIdContext ?? [null];

  const [inputValue, setInputValue] = useState("");

  // メモ選択時に内容をinputValueへ反映
  useEffect(() => {
    if (currentMemoId === null || memos.length === 0) {
      setInputValue("");
      return;
    }
    const currentMemo = memos.find((memo) => memo.id === currentMemoId);
    setInputValue(currentMemo?.content ?? "");
  }, [currentMemoId, memos]);

  // 編集時にリアルタイム保存
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (currentMemoId === null) return;
    const title = generateTitle(value, 5);

    // 新しいメモ配列を作成
    const newMemos = memos.map((memo: Memo) =>
      memo.id === currentMemoId ? { ...memo, title, content: value } : memo
    );

    setMemos(newMemos);
    saveMemos(newMemos);
  };

  return (
    <textarea
      ref={textAreaRef}
      value={inputValue}
      onChange={handleChange}
      disabled={memos.length === 0}
      placeholder={memos.length === 0 ? "＋ボタンでメモを追加" : "メモを編集"}
      className={`w-full h-full p-2 resize-none outline-none text-[var(--text-textarea)] overflow-y-scroll ${
        memos.length === 0
          ? "bg-[var(--bg-textarea-disabled)]"
          : "bg-[var(--bg-textarea)]"
      }`}
    ></textarea>
  );
};

export default TextArea;
