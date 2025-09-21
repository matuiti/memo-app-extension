import { useContext } from "react";
import {
  CurrentMemoIdContext,
  MemoContext,
  TextAreaRefContext,
} from "../utils/contexts";

const Memos = () => {
  const textAreaRef = useContext(TextAreaRefContext);
  const memoContext = useContext(MemoContext);
  const [memos] = memoContext;
  const currentMemoIdContext = useContext(CurrentMemoIdContext);
  const [currentMemoId, setCurrentMemoId] = currentMemoIdContext;

  const handleMemoClick = (id: number) => {
    setCurrentMemoId(id);
    textAreaRef?.current?.focus();
  };

  return (
    <ul className="flex flex-wrap gap-2">
      {memos.map((memo) => (
        <li key={memo.id}>
          <button
            className={`min-w-8 min-h-8 p-1.5 rounded-sm ${
              currentMemoId === memo.id
                ? "bg-[var(--bg-memo-current)]"
                : "bg-[var(--bg-memo)]"
            }`}
            onClick={() => handleMemoClick(memo.id)}
          >
            {memo.content.length === 0 ? "No Memo" : memo.title}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Memos;
