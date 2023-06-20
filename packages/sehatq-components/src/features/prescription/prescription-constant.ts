export const PRESCRIPTION_STATUS = {
  created: {
    id: "created",
    name: "Resep Baru",
    flag: "new",
    color: "#F39F1E",
    backgroundColor: "#FBE2BC",
    borderColor: "#A65C00",
    notes:
      "Resep dapat ditebus di Apotek yang telah bekerja sama dengan SehatQ.",
    case: "positive",
  },
  requested: {
    id: "requested",
    name: "Diproses",
    flag: "new",
    color: "#F39F1E",
    backgroundColor: "#FBE2BC",
    borderColor: "#A65C00",
    notes:
      "Resep dapat ditebus di Apotek yang telah bekerja sama dengan SehatQ.",
    case: "positive",
  },
  approved: {
    id: "approved",
    name: "Siap Ditebus",
    flag: "ready",
    color: "#279CDF",
    backgroundColor: "#BEE1F5",
    borderColor: "#175E86",
    notes:
      "Periksa kembali rekomendasi resep dari dokter. Pastikan resep yang akan ditebus sudah benar dan sesuai.",
    case: "positive",
  },
  purchased: {
    id: "purchased",
    name: "Ditebus",
    flag: "completed",
    color: "#0AAD53",
    backgroundColor: "#E6FDE8",
    borderColor: "#066832",
    notes: "Resep ini sudah ditebus dan tidak dapat digunakan lagi.",
    case: "positive",
  },
  request_expired: {
    id: "request_expired",
    name: "Gagal Diproses",
    flag: "cancelled",
    color: "#D63B3B",
    backgroundColor: "#F3C4C4",
    borderColor: "#802323",
    notes: "",
    case: "negative",
  },
  rejected: {
    id: "rejected",
    name: "Ditolak",
    flag: "cancelled",
    color: "#D63B3B",
    backgroundColor: "#F3C4C4",
    borderColor: "#802323",
    notes: "",
    case: "negative",
  },
  expired: {
    id: "expired",
    name: "Kedaluwarsa",
    flag: "cancelled",
    color: "#D63B3B",
    backgroundColor: "#F3C4C4",
    borderColor: "#802323",
    notes: "",
    case: "negative",
  },
  cancelled: {
    id: "cancelled",
    name: "Batal",
    flag: "cancelled",
    color: "#A7A7A7",
    backgroundColor: "#DADADA",
    borderColor: "#646464",
    notes: "",
    case: "negative",
  },
} as const;

export type PrescriptionStatusCode = keyof typeof PRESCRIPTION_STATUS;

export type PrescriptionStatusName =
  typeof PRESCRIPTION_STATUS[PrescriptionStatusCode]["name"];

export type PrescriptionStatusFlag =
  typeof PRESCRIPTION_STATUS[PrescriptionStatusCode]["flag"];

export type PrescriptionStatusColor =
  typeof PRESCRIPTION_STATUS[PrescriptionStatusCode]["color"];

export type PrescriptionStatusBackgroundColor =
  typeof PRESCRIPTION_STATUS[PrescriptionStatusCode]["backgroundColor"];

export type PrescriptionStatusBorderColor =
  typeof PRESCRIPTION_STATUS[PrescriptionStatusCode]["borderColor"];
