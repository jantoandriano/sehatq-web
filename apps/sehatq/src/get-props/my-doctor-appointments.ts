import {
  BookingDoctorStatusName,
  BookingDoctorConfirmationEmail,
} from "@sehatq/components";

export type MyDoctorAppointmentsQuery = {
  status?: BookingDoctorStatusName;
};

export type MyDoctorAppointmentsParams = {
  userId: string;
};

export type MyDoctorAppointmentParams = {
  bookingId: string;
};

export type MyDoctorAppointmentQuery = {
  utm_source?: BookingDoctorConfirmationEmail;
};
