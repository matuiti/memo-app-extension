import { useContext } from "react";
import { CurrentMemoIdContext, MemoContext } from "../contexts/contexts";
import type { Memo } from "../utils/types";

const Memos = () => {
  const memoContext = useContext(MemoContext);
  const [memos] = memoContext;
  const currentMemoIdContext = useContext(CurrentMemoIdContext);
  const [currentMemoId, setCurrentMemoId] = currentMemoIdContext;

  const handleMemoClick = (id: number) => {
    setCurrentMemoId(id);
  };

  return (
    <ul className="flex flex-wrap gap-2">
      {memos.map((memo: Memo) => (
        <li key={memo.id}>
          <button
            className={`min-w-8 p-1.5 rounded-sm ${
              currentMemoId === memo.id
                ? "bg-[var(--bg-memo-current)]"
                : "bg-[var(--bg-memo)]"
            }`}
            onClick={() => handleMemoClick(memo.id)}
          >
            {memo.title}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Memos;
