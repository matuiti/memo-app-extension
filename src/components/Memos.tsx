import { useContext } from "react";
import {
  CurrentMemoIdContext,
  MemoContext,
  TextAreaRefContext,
  FilteredMemosContext,
} from "../utils/contexts";

const Memos = () => {
  const textAreaRef = useContext(TextAreaRefContext);
  const memoContext = useContext(MemoContext);
  const [memos] = memoContext;
  const currentMemoIdContext = useContext(CurrentMemoIdContext);
  const [currentMemoId, setCurrentMemoId] = currentMemoIdContext;
  const filteredMemosContext = useContext(FilteredMemosContext);
  const [filteredMemos] = filteredMemosContext ?? [[]];

  const memolistType = filteredMemos.length > 0 ? filteredMemos : memos;

  const handleMemoClick = (id: number) => {
    setCurrentMemoId(id);
    textAreaRef?.current?.focus();
  };

  return (
    <ul className="col-span-full row-span-full row-start-2 flex flex-wrap gap-2 pt-1.5 pb-3 pl-0.5 h-auto overflow-y-scroll">
      {memolistType.map((memo) => (
        <li key={memo.id}>
          <button
            className={`min-w-8 min-h-8 px-3.5 py-2.5 rounded-sm ${
              currentMemoId === memo.id
                ? "bg-[var(--bg-memo-current)] outline outline-[var(--outline-color-memo)] outline-offset-1"
                : "bg-[var(--bg-memo)] border border-[var(--border-color-memo)]"
            }
            ${memo.title.length === 0 ? "text-[var(--text-color-muted)]" : ""}`}
            onClick={() => handleMemoClick(memo.id)}
          >
            {memo.content.length === 0 ? "No Title" : memo.title}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Memos;
