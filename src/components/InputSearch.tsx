import { useState, useContext, useEffect, useRef } from "react";
import { MemoContext, FilteredMemosContext } from "../utils/contexts";

const InputSearch = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  const memoContext = useContext(MemoContext);
  const [memos] = memoContext ?? [[]];
  const filteredMemosContext = useContext(FilteredMemosContext);
  const [, setFilteredMemos] = filteredMemosContext ?? [[]];
  const [inputValue, setInputValue] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (inputValue === "") {
      setFilteredMemos(memos);
    } else {
      const filtered = memos.filter((memo) =>
        memo.content.includes(inputValue)
      );
      setFilteredMemos(filtered);
    }

  }, [inputValue, memos, setFilteredMemos]);

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder="検索する"
      value={inputValue}
      onChange={handleChange}
      className="col-span-10 row-span-2 self-center px-5 py-2 bg-[var(--bg-input-search)] rounded-sm min-w-[var(--width-input-search)] h-[var(--height-input-search)] outline-none"
    />
  );
};

export default InputSearch;
