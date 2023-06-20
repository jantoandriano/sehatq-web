import { ASSETS } from "@sehatq/constants";
import { formatDate, parseToDate } from "@sehatq/utils";

export interface MyBookedTelemedicinesResponse {
  data: {
    id: number;
    createdAt: string;
    status: string;
    patientId: number;
    rated: number;
    patientName: string;
    payment: {
      status: string;
      consultationFee: number;
      orderId: string;
    };
    doctor: {
      speciality: {
        id: number;
        name: string;
        slug: string;
      };
      hospital: {
        id: number;
        name: string;
        slug: string;
      };
      id: number;
      name: string;
      photoUrl: string;
      slug: string;
    };
    booking: {
      doctorScheduleId: number;
      bookingStartAt: string;
      bookingEndAt: string;
    };
  }[];
  meta: {
    pagination: {
      page: number;
      perPage: number;
      maxPage: number;
      total: number;
    };
  };
}

export function modelMyBookedTelemedicines(
  data: MyBookedTelemedicinesResponse["data"]
) {
  return data.map((myBookedTelemedice) => {
    const startDate = parseToDate(
      myBookedTelemedice.booking.bookingStartAt,
      "yyyy-MM-dd HH:mm:ss"
    );
    const schedule = formatDate(startDate, "EEEE, dd MMMM yyyy, HH.mm 'WIB'");
    const endDate = parseToDate(
      myBookedTelemedice.booking.bookingEndAt,
      "yyyy-MM-dd HH:mm:ss"
    );
    const now = new Date();
    const isOngoing = now >= startDate && now <= endDate;

    return {
      id: myBookedTelemedice.doctor.id,
      status: myBookedTelemedice.status,
      doctorImageUrl: myBookedTelemedice.doctor.photoUrl || ASSETS.NO_IMAGE,
      doctorName: myBookedTelemedice.doctor.name,
      speciality: myBookedTelemedice.doctor.speciality.name,
      hcfName: myBookedTelemedice.doctor.hospital.name,
      bookingStartAt: myBookedTelemedice.booking.bookingStartAt,
      bookingEndAt: myBookedTelemedice.booking.bookingEndAt,
      schedule,
      createdAt: myBookedTelemedice.createdAt,
      patientName: myBookedTelemedice.patientName,
      isOngoing,
      bookingStartDate: formatDate(startDate, "EEEE, dd MMMM yyyy"),
      bookingStartTime: formatDate(startDate, "HH.mm 'WIB'"),
    };
  });
}

export type MyBookedTelemedicine = ReturnType<
  typeof modelMyBookedTelemedicines
>[0];
