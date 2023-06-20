import React from "react";
import { useRouter } from "next/router";
import { ConsultationCache, useGetConsultation } from "@sehatq/components";
import { ConsultationMobile } from "./consultation-mobile";
import { ConsultationDesktop } from "./consultation-desktop";

export type ConsultationPageProps = {
  isMobile: boolean;
};

function selectDoctorId(cache: ConsultationCache) {
  return cache.data.doctor?.id.toString() ?? null;
}

export function ConsultationPage(props: ConsultationPageProps) {
  const { isMobile } = props;
  const router = useRouter();
  const { consultationId } = router.query;

  const query = {
    consultationId: `${consultationId}` ?? "",
  };

  const { data: doctorId = null } = useGetConsultation(query, {
    select: selectDoctorId,
    enabled: Boolean(consultationId),
  });

  const newProps = {
    consultationId: `${consultationId}`,
    doctorId,
  };

  if (isMobile) {
    return <ConsultationMobile {...newProps} />;
  }
  return <ConsultationDesktop {...newProps} />;
}
