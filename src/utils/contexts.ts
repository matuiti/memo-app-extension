import { createContext, type Dispatch, type RefObject, type SetStateAction } from "react";
import type { Memo } from "../utils/types";

export const MemoContext = createContext<
  [Memo[], Dispatch<SetStateAction<Memo[]>>]
>([[], () => {}]);

export const CurrentMemoIdContext = createContext<
  [number | null, Dispatch<SetStateAction<number | null>>]
>([null, () => {}]);

export const TextAreaRefContext =
  createContext<RefObject<HTMLTextAreaElement | null> | null>(null);

export const FilteredMemosContext = createContext<
  [Memo[], Dispatch<SetStateAction<Memo[]>>]
>([[], () => {}]);