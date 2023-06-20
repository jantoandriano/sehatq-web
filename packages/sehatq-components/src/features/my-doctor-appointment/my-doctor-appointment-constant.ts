export const BOOKING_DOCTOR_STATUS = {
  all: { id: "0", status: "all", label: "Semua", color: undefined },
  new: { id: "1", status: "new", label: "Baru", color: "squash" },
  pending: { id: "2", status: "pending", label: "Menunggu", color: "squash" },
  confirmed: {
    id: "3",
    status: "confirmed",
    label: "Dikonfirmasi",
    color: "shamrock",
  },
  cancelled: {
    id: "4",
    status: "cancelled",
    label: "Dibatalkan",
    color: "cherry",
  },
  attended: { id: "5", status: "attended", label: "Dihadiri", color: "azure" },
  "not-attended": {
    id: "6",
    status: "not-attended",
    label: "Tidak Hadir",
    color: "cherry",
  },
  transfer: { id: "7", status: "transfer", label: "Pindah", color: "squash" },
  "checked-in": {
    id: "8",
    status: "checked-in",
    label: "Mendaftar",
    color: "sea",
  },
  "waiting-list": {
    id: "9",
    status: "waiting-list",
    label: "Dalam Antrian",
    color: "sea",
  },
  verified: {
    id: "10",
    status: "verified",
    label: "Terverifikasi",
    color: "sea",
  },
  "cancelled-by-hcf": {
    id: "11",
    status: "cancelled-by-hcf",
    label: "Dibatalkan HCF",
    color: "cherry",
  },
} as const;

export type BookingDoctorStatusCode = keyof typeof BOOKING_DOCTOR_STATUS;

export type BookingDoctorStatusColor =
  typeof BOOKING_DOCTOR_STATUS[BookingDoctorStatusCode]["color"];

export type BookingDoctorStatus =
  typeof BOOKING_DOCTOR_STATUS[BookingDoctorStatusCode];

export type BookingDoctorStatusName =
  typeof BOOKING_DOCTOR_STATUS[BookingDoctorStatusCode]["status"];

export type BookingDoctorConfirmationEmail = "attendance-confirmation-email";
