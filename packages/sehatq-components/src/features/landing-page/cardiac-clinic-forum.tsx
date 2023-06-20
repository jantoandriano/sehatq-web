import React from "react";
import { CardiacClinicForumDesktop } from "./cardiac-clinic-forum-desktop";
import { CardiacClinicForumMobile } from "./cardiac-clinic-forum-mobile";
export type CardiacClinicForumProps = { isMobile: boolean };

export function CardiacClinicForum(props: CardiacClinicForumProps) {
  const { isMobile } = props;
  const newProps = {
    title: "Forum Spesialis Jantung",
    description: "Cari jawaban yang kamu butuhkan dari ahlinya",
    link: {
      label: "Kunjungi Forum",
      value: {
        name: "FORUM",
        query: {
          slugs: "jantung",
        },
      },
    },
  };
  if (isMobile) {
    return <CardiacClinicForumMobile {...newProps} />;
  }
  return <CardiacClinicForumDesktop {...newProps} />;
}
