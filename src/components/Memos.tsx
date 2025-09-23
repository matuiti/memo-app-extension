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
    <ul className="col-span-12 row-span-full col-start-1 row-start-3 flex flex-wrap gap-2 py-1 h-auto overflow-y-scroll">
      {memolistType.map((memo) => (
        <li key={memo.id}>
          <button
            className={`min-w-8 min-h-8 px-3.5 py-2.5 rounded-sm ${
              currentMemoId === memo.id
                ? "bg-[var(--bg-memo-current)] outline outline-[var(--outline-color)]"
                : "bg-[var(--bg-memo)]"
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
