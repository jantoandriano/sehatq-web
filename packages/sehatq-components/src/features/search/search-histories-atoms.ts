import { atomWithStorage } from "jotai/utils";

export type SearchHistoriesAtom = {
  id: string;
  name: string;
}[];
export const searchHistoriesAtom = atomWithStorage<SearchHistoriesAtom>(
  "searchHistories",
  []
);
