import { atom } from "jotai";
import { SendbirdMessage } from "./sendbird-queries";

export const selectedSendbirdMessageAtom = atom<SendbirdMessage | null>(null);
export const targetSendbirdMessageIdAtom = atom<number | null>(null);
