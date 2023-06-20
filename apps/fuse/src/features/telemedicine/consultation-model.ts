/* eslint-disable @typescript-eslint/ban-types */
import { formatDate, parseToDate } from "@sehatq/utils";

export interface General {
  id: number;
  name: string;
  slug: string;
}

export interface Summary {
  name: string;
  gender: string;
  birthDate: string;
  age: number;
  height: string;
  weight: string;
  symptom: string;
  historyDisease: string | null;
  ethicalDrug: string | null;
  allergies: string | null;
}

export interface Doctor {
  id: number;
  name: string;
  slug: string;
  sip: string;
  speciality: General;
  experience: string;
  photoUrl: string;
  hospital?: General;
}

export interface Payment {
  status: string;
  consultationFee: number;
  orderId: string;
}

export interface Recommendation {
  purchasable: number;
  id: number;
  status: string;
  expiredAt: string;
}

export interface DoctorNote {
  id: number;
  complaint: string;
  diagnosis: string;
  action: string;
  note: string;
  icds: {
    code: string;
    disease: string;
  }[];
}

export interface Booking {
  doctorScheduleId: number;
  bookingStartAt: string;
  bookingEndAt: string;
}

export interface CorporateInfo {
  user: {
    gender: string;
    dob: string;
  };
  mainUser: {
    phone: string;
    identityNumber: string;
    employee: {
      employeeNumber: string;
    };
  };
  company: {
    code: string;
    name: string;
  };
}

export type ConsultationScreen =
  | "closed"
  | "waiting"
  | "waiting-busy"
  | "chat"
  | "rating"
  | "unpaid"
  | "booked"
  | "uncomplete";

export type ConsultationStatus =
  | "init"
  | "pending"
  | "active"
  | "closed"
  | "booked"
  | "cancelled";

export interface ConsultationResponse {
  data: {
    id: number;
    patientId: number;
    consultedById: number;
    duration: number | null;
    sbChannelUrl: string | null;
    expire: string | null;
    startedAt: string;
    consultationDate: string;
    status: ConsultationStatus;
    rated: number;
    summary: Summary;
    doctor: Doctor | {};
    videocallEnable: number;
    sbDoctorId: string | null;
    payment: Payment | null;
    remainingConsultationDuration: number;
    recommendation: Recommendation | null;
    screen: ConsultationScreen;
    waitingEndAt: number | Date;
    doctorNote: DoctorNote | null;
    booking: Booking | null;
    corporateInfo: CorporateInfo | null;
    hasPrescription: boolean;
  };
}

export function modelConsultation(consultation: ConsultationResponse["data"]) {
  return {
    id: consultation.id,
    patientId: consultation.patientId,
    consultedById: consultation.consultedById,
    startedAt: consultation.startedAt,
    consultationDate:
      consultation.startedAt &&
      formatDate(
        parseToDate(consultation.startedAt, "yyyy-MM-dd HH:mm:ss"),
        "dd/mm/yy HH:mm"
      ),
    duration: consultation.duration,
    sbChannelUrl: consultation.sbChannelUrl,
    status: consultation.status,
    summary: consultation.summary,
    screen: consultation.screen,
    waitingEndAt: consultation.waitingEndAt,
    doctorNote: consultation.doctorNote,
    payment: consultation.payment,
    expire: consultation.expire,
    rated: consultation.rated,
    videocallEnable: consultation.videocallEnable,
    sbDoctorId: consultation.sbDoctorId,
    recommendation: consultation.recommendation,
    booking: consultation.booking,
    corporateInfo: consultation.corporateInfo,
    hasPrescription: consultation.hasPrescription,
    canVideoCall: consultation.videocallEnable === 1,
    doctor: "id" in consultation.doctor ? consultation.doctor : null,
    remainingConsultationDuration: consultation.remainingConsultationDuration,
  };
}

export type Consultation = ReturnType<typeof modelConsultation>;

export interface UpdateConsultationResponse {
  meta: { message: string };
  data: [];
}

export interface ConsultationRatingResponse {
  meta: { message: string };
  data: [];
}

export interface SubmitConsultationResponse {
  meta: { message: string };
  data: {
    id: number;
    expireAt: string;
    status: string;
    paymentPageUrl: string;
    waitingEndAt: string;
  };
}
export interface ConsultationCheckoutResponse {
  meta: { message: string };
  data: {
    id: number;
    expireAt: string;
    status: string;
    paymentPageUrl: string;
    waitingEndAt: string;
  };
}

export function modelLatestConsultation(
  response: ConsultationResponse["data"]
) {
  return {
    id: response.id,
    screen: response.screen,
    status: response.status,
    startedAt: response.startedAt,
    doctor: "id" in response.doctor ? response.doctor : null,
  };
}
