import { useState, useEffect } from "react";
import "./App.css";
import type { Memo } from "./utils/types";
import { initializeCurrentMemoId, initializeMemos } from "./utils/functions";

import AddButton from "./components/AddButton";
import DeleteButton from "./components/DeleteButton";
// import InputSearch from "./components/InputSearch";
import Memos from "./components/Memos";
// import TextArea from "./components/TextArea";

import { MemoContext, CurrentMemoIdContext } from "./contexts/contexts";


export function App() {
  const [memos, setMemos] = useState<Memo[]>([]);
  const [currentMemoId, setCurrentMemoId] = useState<number>(1);
  
  useEffect(() => {
    initializeMemos(setMemos);
    initializeCurrentMemoId(setCurrentMemoId);
  }, []);

  return (
    <MemoContext.Provider value={[memos, setMemos]}>
      <CurrentMemoIdContext.Provider value={[currentMemoId, setCurrentMemoId]}>
        <div
          className={`bg-[var(--bg-app)] p-4 w-[var(--width-app)] h-full flex flex-col gap-4`}
        >
          <div
            className={`w-full h-[var(--height-control)] bg-[var(--bg-control)]`}
          >
            {/* <InputSearch /> */}
            <AddButton />
            <DeleteButton />
            <Memos />
          </div>
          <div
            className={`w-full h-[var(--height-textarea)] bg-[var(--bg-textarea)]`}
          >
            {/* <TextArea /> */}
          </div>
        </div>
      </CurrentMemoIdContext.Provider>
    </MemoContext.Provider>
  );
}
