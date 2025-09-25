import { createContext, type Dispatch, type RefObject, type SetStateAction } from "react";
import type { Memo, CurrentMemoId } from "../utils/types";

export const MemoContext = createContext<
  [Memo[], Dispatch<SetStateAction<Memo[]>>]
>([[], () => {}]);

export const CurrentMemoIdContext = createContext<
  [CurrentMemoId, Dispatch<SetStateAction<CurrentMemoId>>]
>([null, () => {}]);

export const TextAreaRefContext =
  createContext<RefObject<HTMLTextAreaElement | null> | null>(null);

export const FilteredMemosContext = createContext<
  [Memo[], Dispatch<SetStateAction<Memo[]>>]
>([[], () => {}]);