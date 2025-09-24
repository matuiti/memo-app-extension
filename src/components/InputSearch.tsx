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
      // 全てのcontentを小文字に変換してから検索
      const lowerCaseInput = inputValue.toLowerCase();
      const filtered = memos.filter((memo) =>
        memo.content.toLowerCase().includes(lowerCaseInput)
      );
      setFilteredMemos(filtered);
    }

  }, [inputValue, memos, setFilteredMemos]);
// 検索バーにフォーカスが当たっているときのアウトラインを設定する
  return (
    <input
      ref={inputRef}
      type="text"
      placeholder="検索する"
      value={inputValue}
      onChange={handleChange}
      className="col-span-10 self-center px-5 py-2 bg-[var(--bg-input-search)] rounded-3xl min-w-[var(--width-input-search)] h-[var(--height-input-search)] focus:outline-1 focus:outline-[var(--outline-color-input-search)]"
    />
  );
};

export default InputSearch;
