const errorColor = "cherry";
const warningColor = "squash";

export const HEALTH_SERVICE_STATUS = {
  "": {
    id: "0",
    status: "",
    statusLabel: "Semua",
    statusColor: undefined,
  },
  new: {
    id: "1",
    status: "new",
    statusLabel: "Baru",
    statusColor: warningColor,
  },
  confirmed: {
    id: "2",
    status: "confirmed",
    statusLabel: "Dikonfirmasi",
    statusColor: "shamrock",
  },
  done: {
    id: "3",
    status: "done",
    statusLabel: "Selesai",
    statusColor: "azure",
  },
  "not-attended": {
    id: "4",
    status: "not-attended",
    statusLabel: "Tidak Hadir",
    statusColor: errorColor,
  },
  "cancelled-by-hcf": {
    id: "5",
    status: "cancelled-by-hcf",
    statusLabel: "Dibatalkan HCF",
    statusColor: errorColor,
  },
  cancelled: {
    id: "6",
    status: "cancelled",
    statusLabel: "Dibatalkan",
    statusColor: errorColor,
  },
  attended: {
    id: "7",
    status: "attended",
    statusLabel: "Dihadiri",
    statusColor: "sea",
  },
  "checked-in": {
    id: "8",
    status: "checked-in",
    statusLabel: "Dihadiri",
    statusColor: "sea",
  },
  "waiting-list": {
    id: "9",
    status: "waiting-list",
    statusLabel: "Dalam Antrian",
    statusColor: "sea",
  },
  verified: {
    id: "10",
    status: "verified",
    statusLabel: "Terverifikasi",
    statusColor: "sea",
  },
  transfer: {
    id: "11",
    status: "transfer",
    statusLabel: "Pindah",
    statusColor: warningColor,
  },
  pending: {
    id: "12",
    status: "pending",
    statusLabel: "Menunggu",
    statusColor: warningColor,
  },
  prebooked: {
    id: "13",
    status: "new",
    statusLabel: "Baru",
    statusColor: warningColor,
  },
  "prebooked-cancelled": {
    id: "14",
    status: "cancelled",
    statusLabel: "Dibatalkan",
    statusColor: errorColor,
  },
} as const;

export type HealthServiceStatusCode = keyof typeof HEALTH_SERVICE_STATUS;
