export const MY_PRESCRIPTION_STATUS = {
  all: { id: "", name: "Semua", color: undefined },
  created: { id: "created", name: "Resep Baru", color: "sea" },
  requested: {
    id: "requested",
    name: "Pending Request",
    color: "squash",
  },
  approved: {
    id: "approved",
    name: "Rekomendasi Obat Tersedia",
    color: "squash",
  },
  rejected: {
    id: "rejected",
    name: "Request Ditolak",
    color: "cherry",
  },
  request_expired: {
    id: "request_expired",
    name: "Request Kadaluarsa",
    color: "cherry",
  },
  purchased: { id: "purchased", name: "Ditebus", color: "shamrock" },
  purchased_offline: {
    id: "purchased_offline",
    name: "Ditebus offline",
    color: "shamrock",
  },
  expired: {
    id: "expired",
    name: "Rekomendasi Obat Kadaluarsa",
    color: "cherry",
  },
} as const;

export type MyPrescriptionStatusCode = keyof typeof MY_PRESCRIPTION_STATUS;

export type MyPrescriptionStatusColor =
  typeof MY_PRESCRIPTION_STATUS[MyPrescriptionStatusCode]["color"];

export type MyPrescriptionStatusName =
  typeof MY_PRESCRIPTION_STATUS[MyPrescriptionStatusCode]["id"];
