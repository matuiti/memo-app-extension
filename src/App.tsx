import { useState, useEffect, useRef } from 'react';
import './App.css';
import AddButton from './components/AddButton';
import DeleteButton from './components/DeleteButton';
import InputSearch from './components/InputSearch';
import ExportButton from './components/ExportButton';
import ImportButton from './components/ImportButton';
import Memos from './components/Memos';
import TextArea from './components/TextArea';
import { initializeCurrentMemoId, initializeMemos } from './utils/functions';
import {
  MemoContext,
  CurrentMemoIdContext,
  TextAreaRefContext,
  FilteredMemosContext,
} from './utils/contexts';
import type { Memo } from './utils/types';

export function App() {
  const [memos, setMemos] = useState<Memo[]>([]);
  const [currentMemoId, setCurrentMemoId] = useState<number | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [filteredMemos, setFilteredMemos] = useState<Memo[]>([]);

  useEffect(() => {
    initializeMemos(setMemos);
    initializeCurrentMemoId(setCurrentMemoId);
  }, []);

  return (
    <MemoContext.Provider value={[memos, setMemos]}>
      <CurrentMemoIdContext.Provider value={[currentMemoId, setCurrentMemoId]}>
        <TextAreaRefContext.Provider value={textAreaRef}>
          <FilteredMemosContext.Provider value={[filteredMemos, setFilteredMemos]}>
            <div
              className={`p-2.5 w-[var(--width-app)] min-h-[var(--height-app)] flex flex-col tracking-[var(--letter-spacing)]`}
            >
              <div
                className={`grid grid-cols-12 grid-rows-4 gap-2 w-full h-full max-h-[var(--height-control)] bg-[var(--bg-control)] px-1 py-2.5`}
              >
                <InputSearch />
                <AddButton />
                <DeleteButton />
                <ExportButton />
                <ImportButton />
                <Memos />
              </div>
              <div className={`w-full h-full`}>
                <TextArea />
              </div>
            </div>
          </FilteredMemosContext.Provider>
        </TextAreaRefContext.Provider>
      </CurrentMemoIdContext.Provider>
    </MemoContext.Provider>
  );
}
