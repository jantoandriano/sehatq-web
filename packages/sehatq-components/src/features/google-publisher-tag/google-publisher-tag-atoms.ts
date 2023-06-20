import { atom } from "jotai";
import { AdItem, Targets } from "./google-publisher-tag-utils";

interface GPTAtom {
  ads: AdItem[];
  status: "IDLE" | "LOADING" | "SUCCESS" | "ERROR";
  globalTargets?: Targets;
}
export const gptAtom = atom<GPTAtom>({
  ads: [],
  status: "IDLE",
});
export const writeOnlyGQTAtom = atom(null, (get, set, newValue: GPTAtom) => {
  set(gptAtom, newValue);
});
export const readOnlyGQTAtom = atom((get) => get(gptAtom));
