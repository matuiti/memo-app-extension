import { CurrentMemoIdContext, MemoContext } from "../utils/contexts";
import { useContext } from "react";
import { saveCurrentMemoId, saveMemos } from "../utils/storage";

const DeleteButton = () => {
  const memoContext = useContext(MemoContext);
  const [memos, setMemos] = memoContext ?? [[], () => {}];

  const currentMemoIdContext = useContext(CurrentMemoIdContext);
  const [currentMemoId, setCurrentMemoId] = currentMemoIdContext ?? [
    null,
    () => {},
  ];

  const handleDeleteMemo = () => {
    if (
      !window.confirm(
        "選択中のメモを削除します。削除後にデータは復元できません。"
      )
    )
      return;
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
      className="col-start-7 w-17 h-10 bg-[var(--bg-btn-delete)] rounded-sm justify-self-center"
      disabled={currentMemoId === null || memos.length === 0}
      onClick={handleDeleteMemo}
    >
      －
    </button>
  );
};

export default DeleteButton;
