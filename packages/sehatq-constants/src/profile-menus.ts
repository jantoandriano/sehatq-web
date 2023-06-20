import { ASSETS } from "./assets";

export const PROFILE_MENUS = {
  EXTERNAL_PROFILE_ORDER: {
    desc: "Lihat kembali riwayat transaksi milikmu di SehatQ.",
    iconSrc: ASSETS.MENU_ICON_TRANSACTION,
    id: 4,
    navigationName: "EXTERNAL_PROFILE_ORDER",
    title: "Transaksi",
  },
  MY_BOOKING_DOCTORS: {
    desc: "Cek riwayat di SehatQ untuk booking, chat dokter, dan reservasi tindakan medis.",
    iconSrc: ASSETS.MENU_ICON_ACTIVITY,
    id: 3,
    navigationName: "MY_BOOKING_DOCTORS",
    title: "Aktivitas",
  },
  PROFILE_CORPORATE: {
    desc: "Ada lebih banyak kemudahan dan layanan di SehatQ sebagai benefit dari perusahaan.",
    iconSrc: ASSETS.MENU_ICON_CORPORATE,
    id: 6,
    navigationName: "PROFILE_CORPORATE",
    title: "Corporate",
  },
  PROFILE_ECLAIM: {
    desc: "Fitur ini membantumu untuk mengajukan reimbursement ke kantor.",
    iconSrc: ASSETS.MENU_ICON_ECLAIM,
    id: 7,
    navigationName: "PROFILE_ECLAIM",
    title: "Eklaim",
  },
  PROFILE_FAMILY_LIST: {
    desc: "Daftarkan seluruh anggota keluargamu untuk melakukan berbagai aktivitas di SehatQ.",
    iconSrc: ASSETS.MENU_ICON_FAMILY,
    id: 1,
    navigationName: "PROFILE_FAMILY_LIST",
    title: "Keluarga",
  },
  PROFILE_HEALTHRECORD_LIST: {
    desc: "Baca catatan konsultasi dengan dokter untuk kondisi kesehatanmu dan anggota keluarga.",
    iconSrc: ASSETS.MENU_ICON_RECORD,
    id: 5,
    navigationName: "PROFILE_HEALTHRECORD_LIST",
    title: "Record",
  },
  PROFILE_PRESCRIPTIONS: {
    desc: "Semua riwayat resep anggota keluargamu lengkap ada di sini.",
    iconSrc: "/images/menu-icon-prescription.svg",
    id: 2,
    navigationName: "PROFILE_PRESCRIPTIONS",
    title: "Riwayat Resep",
  },
} as const;
