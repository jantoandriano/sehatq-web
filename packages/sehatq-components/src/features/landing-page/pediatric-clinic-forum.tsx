import React from "react";
import { PediatricClinicForumMobile } from "./pediatric-clinic-forum-mobile";
import { PediatricClinicForumDesktop } from "./pediatric-clinic-forum-desktop";
export type PediatricClinicForumProps = { isMobile: boolean };

export function PediatricClinicForum(props: PediatricClinicForumProps) {
  const { isMobile } = props;
  const newProps = {
    title: "Forum Spesialis Anak",
    description: `Tenang, Ayah & Bunda bisa tanyakan langsung di forum seputar kesehatan
    Si Kecil. Pasti akan dijawab oleh Tim Dokter SehatQ`,
    link: {
      label: "Lihat Selengkapnya",
      value: {
        name: "FORUM",
        query: { slugs: "anak" },
      },
    },
  };
  if (isMobile) {
    return <PediatricClinicForumMobile {...newProps} />;
  }
  return <PediatricClinicForumDesktop {...newProps} />;
}
