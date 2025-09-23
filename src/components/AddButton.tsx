import { useContext } from "react";
import {
  CurrentMemoIdContext,
  MemoContext,
  TextAreaRefContext,
} from "../utils/contexts";
import { saveCurrentMemoId, saveMemos } from "../utils/functions";

const AddButton = () => {
  const textAreaRef = useContext(TextAreaRefContext);
  const memoContext = useContext(MemoContext);
  const [memos, setMemos] = memoContext ?? [[], () => {}];
  const currentMemoIdContext = useContext(CurrentMemoIdContext);
  const [, setCurrentMemoId] = currentMemoIdContext ?? [null, () => {}];

  const handleAddMemo = async () => {
    const createMemo = () => ({
      id: Date.now(),
      title: "",
      content: "",
    });
    const newMemo = createMemo();
    setMemos([...memos, newMemo]);
    setCurrentMemoId(newMemo.id);
    saveMemos([...memos, newMemo]);
    saveCurrentMemoId(newMemo.id);
    textAreaRef?.current?.focus();
  };

  return (
    <button
      className="col-start-11 w-9 h-9 bg-[var(--bg-btn-add)] rounded-sm"
      onClick={handleAddMemo}
    >
      ＋
    </button>
  );
};

export default AddButton;
