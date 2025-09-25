import { useContext } from "react";
import { exportMemosToJson } from "../utils/exportMemos";
import { MemoContext, CurrentMemoIdContext } from "../utils/contexts";

const ExportButton = () => {
  const memoContext = useContext(MemoContext);
  const [memos] = memoContext;
  const currentMemoIdContext = useContext(CurrentMemoIdContext);
  const [currentMemoId] = currentMemoIdContext;

  const handleExport = () => {
    exportMemosToJson(memos, currentMemoId);
  };

  return (
    <button
      className="col-start-8 w-17 h-10 bg-[var(--bg-btn-export)] rounded-sm justify-self-center"
      onClick={handleExport}
    >
      Export
    </button>
  );
};

export default ExportButton;
