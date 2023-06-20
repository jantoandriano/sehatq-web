import React from "react";
import { InternistClinicMobile } from "./internist-clinic-mobile";
import { InternistClinicDesktop } from "./internist-clinic-desktop";

export type DiseaseListPageProps = {
  isMobile: boolean;
};

export function InternistClinic({ isMobile }: DiseaseListPageProps) {
  const navigations: [number, string][] = [
    [1, "Chat Dokter"],
    [7, "Layanan Kesehatan"],
    [5, "Booking Dokter"],
    [8, "Artikel"],
    [9, "Toko"],
    [10, "Forum"],
  ];
  const props = {
    navigations,
    logoAlt: "Layanan Kesehatan Penyakit Dalam Internist Online",
  };
  if (isMobile) {
    return <InternistClinicMobile {...props} />;
  }
  return <InternistClinicDesktop {...props} />;
}
