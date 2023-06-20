import {
  PrescriptionStatusCode,
  PrescriptionStatusName,
} from "./prescription-constant";

export interface PrescriptionStatus {
  id: PrescriptionStatusCode;
  name: PrescriptionStatusName;
  activityMessage: string;
}

export interface PrescriptionHistories {
  id: string;
  name: string;
  createdAt: string;
}

export interface PrescriptionHistoryDetail {
  id: number;
  status: PrescriptionStatus;
  histories: PrescriptionHistories[];
}

export interface PrescriptionHistoryResponse {
  data: PrescriptionHistoryDetail;
}

export function modelPrescriptionHistory(
  prescription: PrescriptionHistoryResponse["data"]
) {
  return prescription;
}

export type PrescriptionHistory = ReturnType<typeof modelPrescriptionHistory>;
