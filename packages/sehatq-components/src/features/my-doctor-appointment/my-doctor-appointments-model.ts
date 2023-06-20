import { MyDoctorAppointmentReviewStepKey } from "../review/my-doctor-appointment-review-constants";
import { BOOKING_DOCTOR_STATUS } from "./my-doctor-appointment-constant";

export interface MyDoctorAppointmentsResponse {
  data: {
    id: string;
    isConfirmedAttendance: number | null;
    hcp: {
      id: number;
      name: string;
      slug: string;
      imageUrl: string;
      actived: boolean;
    };
    hcpSpeciality: {
      id: number;
      name: string;
    };
    hcf: {
      id: number;
      name: string;
      district: string;
      city: string;
      isBookingAvailable: boolean;
    };
    booking: {
      created: string;
      updated: string;
      date: string;
      time: string;
      status: number;
      statusName: string;
      isGuestBooking: number;
    };
    patient: {
      name: string;
    };
    rating?: {
      status: string;
      stepBackdrop: MyDoctorAppointmentReviewStepKey;
    };
  }[];
}

export function modelMyDoctorAppointments(
  data: MyDoctorAppointmentsResponse["data"]
) {
  const bookingStatus = Object.values(BOOKING_DOCTOR_STATUS);
  return data.map((modelBookingDoctor) => {
    const {
      booking,
      hcp,
      hcf,
      patient,
      hcpSpeciality,
      id,
      rating,
      isConfirmedAttendance,
    } = modelBookingDoctor;

    return {
      status: bookingStatus[booking.status].status,
      createdDate: booking.created,
      bookingDate: booking.date,
      bookingTime: booking.time,
      bookingId: id,
      doctorName: hcp.name,
      doctorSlug: hcp.slug,
      doctorImgSrc: hcp.imageUrl,
      doctorSpeciality: hcpSpeciality.name,
      patientName: patient.name,
      hospitalName: hcf.name,
      rating: rating,
      isConfirmedAttendance,
    };
  });
}

export type ModelMyDoctorAppointments = ReturnType<
  typeof modelMyDoctorAppointments
>[number];

export type ModelMyDoctorAppointment = ReturnType<
  typeof modelMyDoctorAppointment
>;

export type CancelMyDoctorAppointmentsResponse = {
  data: [];
  meta: {
    message: string;
  };
};

export type AttendanceConfirmationMyDoctorAppointmentsResponse = {
  data: [];
  meta: {
    message: string;
  };
};

/**
 * Model Detail MyDoctorAppointment
 */
export interface MyDoctorAppointmentResponse {
  data: {
    id: string;
    isConfirmedAttendance: number | null;
    partnerUrl: string | null;
    hcp: {
      id: number;
      name: string;
      slug: string;
      imageUrl: string;
      actived: boolean;
    };
    hcpSpeciality: {
      id: number;
      name: string;
    };
    hcf: {
      id: number;
      name: string;
      district: string;
      city: string;
      isBookingAvailable: boolean;
    };
    booking: {
      created: string;
      updated: string;
      date: string;
      time: string;
      status: number;
      statusName: string;
      name: string;
      dob: string;
      phone: string;
      address: string;
      isGuestBooking: number;
    };
    rating?: {
      status: string;
      stepBackdrop: MyDoctorAppointmentReviewStepKey;
      bookingDoctor: {
        rating: number;
        review: string;
        bookingId: string;
        tags: string[];
      };
      cs: {
        rating: number;
        review: string;
        bookingId: string;
        tags: string[];
      };
    };
  };
}

export function modelMyDoctorAppointment(
  data: MyDoctorAppointmentResponse["data"]
) {
  const bookingStatus = Object.values(BOOKING_DOCTOR_STATUS);
  const {
    booking,
    hcp,
    hcf,
    hcpSpeciality,
    id,
    rating,
    isConfirmedAttendance,
    partnerUrl,
  } = data;
  const doctorSpeciality =
    hcpSpeciality.name === "umum"
      ? `Dokter ${hcpSpeciality.name}`
      : `Dokter Spesialis ${hcpSpeciality.name}`;
  return {
    status: bookingStatus[booking.status].status,
    createdDate: booking.created,
    bookingDate: booking.date,
    bookingTime: booking.time,
    bookingId: id,
    doctorName: hcp?.name,
    doctorSlug: hcp.slug,
    doctorImgSrc: hcp.imageUrl,
    doctorSpeciality,
    hospitalName: hcf.name,
    hospitalAddress: `${hcf.district}, ${hcf.city}`,
    patientName: booking.name,
    patientDob: booking.dob,
    patientAddress: booking.address,
    patientPhone: booking.phone,
    rating,
    isConfirmedAttendance,
    partnerUrl,
  };
}
