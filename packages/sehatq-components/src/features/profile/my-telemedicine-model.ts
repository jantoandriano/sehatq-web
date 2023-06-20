import { generatePriceDisplay, formatDate } from "@sehatq/utils";
import { ConsultationResponse } from "../telemedicine/consultation-model";

export interface Doctor {
  id: number;
  name: string;
  slug: string;
}

export interface MyTelemedicinesResponse {
  meta: {
    pagination: {
      page: number;
      perPage: number;
      maxPage: number;
      total: number;
    };
  };
  data: {
    id: number;
    sbChannelUrl: string;
    status: string;
    createdAt: string;
    duration: number;
    hasDoctorNote: boolean;
    payment: {
      status: string;
      consultationFee: number;
      orderId: string;
    } | null;
    doctor:
      | (Doctor & {
          photoUrl: string;
          speciality: Doctor;
          hospital: Doctor | null;
          rating: { average: number | null; count: number | null } | null;
        })
      | null;
    patient: {
      name: string;
    };
    doctorNote: {
      id: number;
    };
    hasDrugRecommendation: boolean;
  }[];
}

export function modelMyTelemedicines(data: MyTelemedicinesResponse["data"]) {
  return data.map((modelMyTelemedicine) => {
    const reformatDate = modelMyTelemedicine.createdAt.replace(/-/g, "/");
    return {
      id: modelMyTelemedicine.id,
      sbChannelUrl: modelMyTelemedicine.sbChannelUrl,
      chatDuration: modelMyTelemedicine.duration,
      hasDoctorNote: modelMyTelemedicine.hasDoctorNote,
      chatId: `${modelMyTelemedicine.id}`,
      chatDate: `${formatDate(new Date(reformatDate), "dd MMMM, HH.mm")}`,
      doctorId: modelMyTelemedicine.doctor?.id,
      doctorName: modelMyTelemedicine.doctor?.name || "",
      doctorImageSrc:
        modelMyTelemedicine.doctor?.photoUrl ||
        "https://static.sehatq.com/telemed/profile/20210216223625",
      doctorLink: {
        query: { id: modelMyTelemedicine.doctor?.slug },
        asPath: `/telemed/dokter/${modelMyTelemedicine.doctor?.slug}`,
      },
      doctorHospital: modelMyTelemedicine.doctor?.hospital?.name || "",
      doctorSpeciality: modelMyTelemedicine.doctor?.speciality.name || "",
      doctorRating: modelMyTelemedicine.doctor?.rating?.average || 0,
      doctorRatingTotal: modelMyTelemedicine.doctor?.rating?.count || 0,
      consultationFee: modelMyTelemedicine.payment?.consultationFee
        ? generatePriceDisplay(modelMyTelemedicine.payment?.consultationFee)
        : "GRATIS",
      isFreeChat: Boolean(!modelMyTelemedicine.payment),
      createdAt: modelMyTelemedicine.createdAt,
      patientName: modelMyTelemedicine.patient?.name,
      doctorNoteId: modelMyTelemedicine.doctorNote?.id,
      hasDrugRecommendation: modelMyTelemedicine.hasDrugRecommendation,
    };
  });
}

export type MyTelemedicine = ReturnType<typeof modelMyTelemedicines>[0];

export interface MyTelemedicineResponse {
  meta: {
    consultation: {
      free: {
        counter: {
          current: number;
          max: number;
        };
        ctaMessage: string;
      };
      freeConsultationDrugPrescription?: {
        counter: {
          current: number;
          max: number;
        };
      };
    };
  };
  data: ConsultationResponse["data"];
}

export function modelMyTelemedicine(response: MyTelemedicineResponse) {
  const { meta, data } = response;
  return {
    id: data.id,
    rated: data.rated,
    screen: data.screen,
    status: data.status,
    payment: data.payment,
    startedAt: data.startedAt,
    booking: data.booking,
    doctor: "id" in data.doctor ? data.doctor : null,
    hasFreeCorporateConsultation:
      meta.consultation.free.counter.current <
      meta.consultation.free.counter.max,
    hasFreeEthicalDrugConsultation: meta.consultation
      .freeConsultationDrugPrescription
      ? meta.consultation.freeConsultationDrugPrescription.counter.current <
        meta.consultation.freeConsultationDrugPrescription.counter.max
      : false,
  };
}

export type MyTelemedicineDetail = ReturnType<typeof modelMyTelemedicine>;
