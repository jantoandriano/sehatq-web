import { atom } from "jotai";

export const hcpScheduleSelectedAtom = atom<
  | {
      hcpId: number;
      hcfId: number;
      date: string;
      time: string;
      bookingOnline: number;
      refHcp: string;
    }
  | undefined
>(undefined);
