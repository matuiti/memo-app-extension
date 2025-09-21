import { createContext, type Dispatch, type SetStateAction } from "react";
import type { Memo } from "../utils/types";

export const MemoContext = createContext<
  [Memo[], Dispatch<SetStateAction<Memo[]>>]
>([[], () => {}]);

export const CurrentMemoIdContext = createContext<
  [number, Dispatch<SetStateAction<number>>]
>([1, () => {}]);
