import { useState, useEffect, useRef } from "react";
import "./App.css";
import type { Memo } from "./utils/types";
import { initializeCurrentMemoId, initializeMemos } from "./utils/functions";

import AddButton from "./components/AddButton";
import DeleteButton from "./components/DeleteButton";
// import InputSearch from "./components/InputSearch";
import Memos from "./components/Memos";
import TextArea from "./components/TextArea";

import {
  MemoContext,
  CurrentMemoIdContext,
  TextAreaRefContext,
} from "./utils/contexts";

export function App() {
  const [memos, setMemos] = useState<Memo[]>([]);
  const [currentMemoId, setCurrentMemoId] = useState<number | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    initializeMemos(setMemos);
    initializeCurrentMemoId(setCurrentMemoId);
  }, []);

  return (
    <MemoContext.Provider value={[memos, setMemos]}>
      <CurrentMemoIdContext.Provider value={[currentMemoId, setCurrentMemoId]}>
        <TextAreaRefContext.Provider value={textAreaRef}>
          <div
            className={`bg-[var(--bg-app)] p-4 w-[var(--width-app)] h-[var(--height-app)] flex flex-col gap-4`}
          >
            <div
              className={`w-full h-[var(--height-control)] bg-[var(--bg-control)] p-2 overflow-y-scroll`}
            >
              {/* <InputSearch /> */}
              <AddButton />
              <DeleteButton />
              <Memos />
            </div>
            <div
              className={`w-full h-[var(--height-textarea)] bg-[var(--bg-textarea)]`}
            >
              <TextArea />
            </div>
          </div>
        </TextAreaRefContext.Provider>
      </CurrentMemoIdContext.Provider>
    </MemoContext.Provider>
  );
}
