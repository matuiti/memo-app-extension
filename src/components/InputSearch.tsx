// import { useState, useContext } from "react";
// import { CurrentMemoIdContext, MemoContext } from "../contexts/contexts";

// const InputSearch = () => {
//   const memoContext = useContext(MemoContext);
//   const [memos, setMemos] = memoContext ?? [[], () => {}];

//   const currentMemoIdContext = useContext(CurrentMemoIdContext);
//   const [currentMemoId, setCurrentMemoId] = currentMemoIdContext ?? [
//     null,
//     () => {},
//   ];
  
//   const [inputValue, setInputValue] = useState<string>("");

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setInputValue(e.target.value);
//   };

//   return (
//     <input
//       type="text"
//       placeholder="Search memos..."
//       value={inputValue}
//       onChange={handleChange}
//     />
//   );
// };

// export default InputSearch;
