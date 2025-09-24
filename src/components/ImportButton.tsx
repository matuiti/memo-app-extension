import { useRef, useContext } from "react";
import { importMemosFromJson } from "../utils/importMemos";
import { initializeMemos, initializeCurrentMemoId } from "../utils/functions";
import { MemoContext, CurrentMemoIdContext } from "../utils/contexts";

const ImportButton = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const memoContext = useContext(MemoContext);
  const [, setMemos] = memoContext ?? [[], () => {}];
  const currentMemoIdContext = useContext(CurrentMemoIdContext);
  const [, setCurrentMemoId] = currentMemoIdContext ?? [null, () => {}];

  const handleClick = () => inputRef.current?.click();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await importMemosFromJson(file);
    await initializeMemos(setMemos);
    await initializeCurrentMemoId(setCurrentMemoId);
    e.target.value = "";
  };

  return (
    <>
      <button
        className="col-start-11 col-span-2 row-start-4 w-15 h-10 bg-[var(--bg-btn-import)] rounded-sm justify-self-center"
        onClick={handleClick}
      >
        Import
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="application/json"
        style={{ display: "none" }}
        onChange={handleChange}
      />
    </>
  );
};

export default ImportButton;
