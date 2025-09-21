
import { CurrentMemoIdContext, MemoContext } from "../contexts/contexts";
import { saveCurrentMemoId, saveMemos } from "../utils/functions";
import { useContext } from "react";

const DeleteButton = () => {
   const memoContext = useContext(MemoContext);
   const [memos, setMemos] = memoContext ?? [[], () => {}];
  
    const currentMemoIdContext = useContext(CurrentMemoIdContext);
    const [currentMemoId, setCurrentMemoId] = currentMemoIdContext ?? [
      null,
      () => {},
    ];

      const handleDeleteMemo = () => {
        const newMemos = memos.filter(memo => memo.id !== currentMemoId);
        setMemos(newMemos);
        saveMemos(newMemos);
        if (newMemos.length > 0) {
          setCurrentMemoId(newMemos[0].id);
          saveCurrentMemoId(newMemos[0].id);
        } else {
          setCurrentMemoId(0);
          saveCurrentMemoId(0);
        }
      };
  return (
    <button className="w-8 h-8 bg-[var(--bg-btn-delete)] rounded-sm" onClick={handleDeleteMemo}>－</button>
  )
}

export default DeleteButton