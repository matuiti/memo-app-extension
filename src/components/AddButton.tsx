import { useContext } from "react"
import { CurrentMemoIdContext, MemoContext } from "../contexts/contexts";
import type { Memo } from "../utils/types";
import { saveCurrentMemoId, saveMemos } from "../utils/functions";

const AddButton = () => {
 const memoContext = useContext(MemoContext);
 const [memos, setMemos] = memoContext ?? [[], () => {}];

  const currentMemoIdContext = useContext(CurrentMemoIdContext);
  const [, setCurrentMemoId] = currentMemoIdContext ?? [
    null,
    () => {},
  ];
  
    const handleAddMemo = () => {
      const createMemo = (): Memo => {
        return {
          id: Date.now(),
          title: "",
          content: "",
        };
      };
      const newMemo = createMemo();

      setMemos([...memos, newMemo]);
      setCurrentMemoId(newMemo.id);
      saveMemos(memos);
      saveCurrentMemoId(newMemo.id);
    };

  return (
    <button className="w-8 h-8 bg-[var(--bg-btn-add)] rounded-sm" onClick={handleAddMemo}>＋</button>
  )
}

export default AddButton