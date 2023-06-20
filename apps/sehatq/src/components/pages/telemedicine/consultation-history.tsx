import React from "react";
import { useRouter } from "next/router";
import { ConsultationCache, useGetConsultation } from "@sehatq/components";
import { ConsultationHistoryMobile } from "./consultation-history-mobile";
import { ConsultationHistoryDesktop } from "./consultation-history-desktop";

export type ConsultationHistoryPageProps = {
  isMobile: boolean;
};

function selectDoctorId(cache: ConsultationCache) {
  return cache.data.doctor?.id.toString() ?? null;
}

export function ConsultationHistoryPage(props: ConsultationHistoryPageProps) {
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
    return <ConsultationHistoryMobile {...newProps} />;
  }
  return <ConsultationHistoryDesktop {...newProps} />;
}
