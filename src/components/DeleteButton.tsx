import { CurrentMemoIdContext, MemoContext } from "../utils/contexts";
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
    const newMemos = memos.filter((memo) => memo.id !== currentMemoId);
    if (newMemos.length === 0) {
      setMemos([]);
      setCurrentMemoId(null);
      saveMemos([]);
      saveCurrentMemoId(null);
      return;
    }

    setMemos(newMemos);
    saveMemos(newMemos);
    setCurrentMemoId(newMemos[0].id);
    saveCurrentMemoId(newMemos[0].id);
  };

  return (
    <button
      className="col-start-12 w-9 h-9 bg-[var(--bg-btn-delete)] rounded-sm"
      disabled={currentMemoId === null || memos.length === 0}
      onClick={handleDeleteMemo}
    >
      －
    </button>
  );
};

export default DeleteButton;
