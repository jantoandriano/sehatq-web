import React from "react";
import { PediatricClinicMobile } from "./pediatric-clinic-mobile";
import { PediatricClinicDesktop } from "./pediatric-clinic-desktop";

export type DiseaseListPageProps = {
  isMobile: boolean;
};

export function PediatricClinic({ isMobile }: DiseaseListPageProps) {
  const navigations: [number, string][] = [
    [1, "Chat Dokter"],
    [3, "Layanan Kesehatan"],
    [4, "Booking Dokter"],
    [5, "Artikel"],
    [6, "Toko"],
    [7, "Forum"],
  ];
  const props = {
    navigations,
    logoAlt: "Klinik Online Spesialis Anak",
  };
  if (isMobile) {
    return <PediatricClinicMobile {...props} />;
  }
  return <PediatricClinicDesktop {...props} />;
}
