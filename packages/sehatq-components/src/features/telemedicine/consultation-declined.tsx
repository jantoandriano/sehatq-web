import React from "react";
import { ConsultationDeclinedDesktop } from "./consultation-declined-desktop";
import { ConsultationDeclinedMobile } from "./consultation-declined-mobile";
import { useGetConsultation, ConsultationCache } from "./consultation-queries";

export type ConsultationDeclinedProps = {
  isMobile?: boolean;
  consultationId: string;
};

function selectConsultation(consultation: ConsultationCache) {
  return consultation.data;
}

export function ConsultationDeclined(props: ConsultationDeclinedProps) {
  const { isMobile, consultationId } = props;

  const query = {
    consultationId,
  };

  const { data: consultation } = useGetConsultation(query, {
    select: selectConsultation,
  });

  const changeScheduleHref =
    "https://api.whatsapp.com/send?phone=6281288588167&text=Halo, saya ingin melaporkan kendala di chat dokter SehatQ dengan detail sebagai berikut: Nama pasien: Email: Nama dokter:";

  const otherProps = {
    isPaidChat: Boolean(
      consultation &&
        consultation.doctor &&
        (consultation.payment === null ||
          consultation.payment.status === "paid")
    ),
    changeScheduleHref,
  };

  if (isMobile) {
    return <ConsultationDeclinedMobile {...otherProps} />;
  }
  return <ConsultationDeclinedDesktop {...otherProps} />;
}
