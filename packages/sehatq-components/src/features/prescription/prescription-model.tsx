import {
  PrescriptionStatusCode,
  PrescriptionStatusName,
} from "./prescription-constant";

export interface PrescriptionStatus {
  id: PrescriptionStatusCode;
  name: PrescriptionStatusName;
  activityMessage: string;
}

export interface PrescriptionPatient {
  name: string;
  gender: string;
  age: string | null;
}

export interface PrescriptionDoctorInfo {
  name: string;
  slug: string;
  speciality: string;
  image: string;
}

export interface PrescriptionShipping {
  id: number;
  label: string;
  name: string;
  address: string;
  subdistrict: string;
  district: string;
  city: string;
  province: string;
  zipCode: string;
  phone: string;
  note: string;
}

export interface PrescriptionOrders {
  purchasedAt: string | null;
  merchantName: string | null;
  merchantOrders: {
    id: number;
    number: string;
    merchantName: string;
  }[];
}

export interface PrescriptionDetail {
  id: number;
  number: string;
  createdAt: string;
  expiredAt: string | null;
  notes: string | null;
  rejectionReason: string | null;
  images: string[] | null;
  shipping: PrescriptionShipping | null;
  source: {
    id: string;
    name: string;
  };
  status: PrescriptionStatus;
  patient: PrescriptionPatient;
  doctorInfo: PrescriptionDoctorInfo | null;
  consultationInfo: {
    id: number;
    channel: {
      id: number;
      name: string;
      code:
        | "ConsultationBooking"
        | "ConsultationPublic"
        | "ConsultationPrivate"
        | "ConsultationApp";
    };
  } | null;
  orders: PrescriptionOrders;
}

export interface PrescriptionResponse {
  data: PrescriptionDetail;
}

export function modelPrescription(prescription: PrescriptionResponse["data"]) {
  return prescription;
}

export type Prescription = ReturnType<typeof modelPrescription>;

export type CancelPrescriptionResponse = {
  meta: {
    message: string;
  };
};

export type CreatePrescriptionCartResponse = {
  meta: {
    message: string;
  };
};

export type RecreatePrescriptionResponse = {
  meta: {
    isSuccess: boolean;
    errorMessage: string;
  };
};

export interface PrescriptionSubmitResponse {
  data: { id: number; prNumber: string };
  meta: { message: string };
}

export function modelSubmitPrescription(
  prescription: PrescriptionSubmitResponse["data"]
) {
  return { id: prescription.id, prescriptionNumber: prescription.prNumber };
}
