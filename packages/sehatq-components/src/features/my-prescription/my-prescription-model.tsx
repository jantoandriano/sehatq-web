import {
  PrescriptionStatusCode,
  PrescriptionStatusFlag,
  PrescriptionStatusName,
} from "../prescription";

export interface MyPrescriptions {
  id: string;
  number: string;
  updatedAt: string;
  createdAt: string;
  source: {
    id: "user_upload" | "teleconsultation";
    name: string;
  };
  status: {
    id: PrescriptionStatusCode;
    name: PrescriptionStatusName;
    flag: PrescriptionStatusFlag;
  };
  patient: {
    name: string;
  };
  products: {
    total: number;
  };
}

export interface MyPrescriptionsMeta {
  statusFlags: {
    id: string;
    name: number;
    statuses: string[];
  }[];
  families: {
    name: string;
  }[];
}

export interface MyPrescriptionsResponse {
  meta: MyPrescriptionsMeta;
  data: MyPrescriptions[];
}

export function modelMyPrescriptions(data: MyPrescriptionsResponse["data"]) {
  return data.map((item) => {
    return {
      ...item,
    };
  });
}

export function modelMetaMyPrescriptions(
  meta: MyPrescriptionsResponse["meta"]
) {
  return meta;
}

export type ModelMyPrescriptions = ReturnType<
  typeof modelMyPrescriptions
>[number];

export type MetaMyPrescriptions = ReturnType<typeof modelMetaMyPrescriptions>;
