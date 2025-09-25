import { useEffect, useState, useContext } from 'react';
import { generateTitle, saveMemos, saveCurrentMemoId } from '../utils/functions';
import { CurrentMemoIdContext, MemoContext, TextAreaRefContext } from '../utils/contexts';
import type { Memo } from '../utils/types';

const TextArea = () => {
  const textAreaRef = useContext(TextAreaRefContext);

  const memoContext = useContext(MemoContext);
  const [memos, setMemos] = memoContext ?? [[], () => {}];

  const currentMemoIdContext = useContext(CurrentMemoIdContext);
  const [currentMemoId] = currentMemoIdContext ?? [null];

  const [inputValue, setInputValue] = useState('');

  // メモ選択時に内容をinputValueへ反映
  useEffect(() => {
    if (currentMemoId === null || memos.length === 0) {
      setInputValue('');
      return;
    }
    // 選択されたメモのidを保存
    saveCurrentMemoId(currentMemoId);
    const currentMemo = memos.find((memo) => memo.id === currentMemoId);
    setInputValue(currentMemo?.content ?? '');
    window.scrollTo({ top: 0, behavior: 'auto' });
    if (textAreaRef?.current) {
      const textArea = textAreaRef.current;
      // スクロールバーがある場合のみスクロール位置をリセット
      if (textArea.scrollHeight > textArea.clientHeight) {
        textArea.scrollTop = 0;
      }
    }
  }, [currentMemoId, memos, textAreaRef]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (currentMemoId === null) return;

    const content = e.target.value;
    const title = generateTitle(content, 10);
    setInputValue(content);
    const newMemos = memos.map((memo: Memo) =>
      memo.id === currentMemoId ? { ...memo, title, content: content } : memo
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
      placeholder={memos.length === 0 ? '＋ボタンでメモを追加' : 'メモを書く'}
      className={`bg-[var(--bg-textarea)] w-full h-full min-h-[var(--height-textarea)] p-2 border outline-none text-[var(--text-textarea)] overflow-y-scroll ${
        memos.length === 0 ? 'bg-[var(--bg-textarea-disabled)]' : 'bg-[var(--bg-textarea)]'
      }`}
    ></textarea>
  );
};

export default TextArea;
