import { atom } from "jotai";

export const activeLocationAtom = atom<{ lat: number; long: number } | null>(
  null
);
