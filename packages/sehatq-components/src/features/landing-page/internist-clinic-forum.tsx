import React from "react";
import { InternistClinicForumMobile } from "./internist-clinic-forum-mobile";
import { InternistClinicForumDesktop } from "./internist-clinic-forum-desktop";
export type InternistClinicForumProps = { isMobile: boolean };

export function InternistClinicForum(props: InternistClinicForumProps) {
  const { isMobile } = props;
  const newProps = {
    title: "Forum Penyakit Dalam",
    description: "Cari jawaban yang kamu butuhkan dari ahlinya",
    link: {
      label: "Kunjungi Forum",
      value: {
        name: "FORUM",
      },
    },
  };
  if (isMobile) {
    return <InternistClinicForumMobile {...newProps} />;
  }
  return <InternistClinicForumDesktop {...newProps} />;
}
