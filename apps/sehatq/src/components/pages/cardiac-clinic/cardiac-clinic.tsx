import React from "react";
import { CardiacClinicDesktop } from "./cardiac-clinic-desktop";
import { CardiacClinicMobile } from "./cardiac-clinic-mobile";

export type DiseaseListPageProps = {
  isMobile: boolean;
};

export function CardiacClinic({ isMobile }: DiseaseListPageProps) {
  const navigations: [number, string][] = [
    [1, "Chat Dokter"],
    [5, "Layanan Kesehatan"],
    [3, "Booking Dokter"],
    [7, "Artikel"],
    [6, "Toko"],
    [8, "Forum"],
  ];
  const props = {
    navigations,
    logoAlt: "Layanan Kesehatan Jantung Online - Spesialis Kardiologi",
  };
  if (isMobile) {
    return <CardiacClinicMobile {...props} />;
  }
  return <CardiacClinicDesktop {...props} />;
}
