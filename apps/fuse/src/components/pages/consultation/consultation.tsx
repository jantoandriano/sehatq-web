import React from "react";
import { useRouter } from "next/router";
import {
  useGetConsultation,
  ConsultationCache,
  ConsultationChat,
  ConsultationDeclined,
  ConsultationWaiting,
} from "src/features/telemedicine";

function selectConsultation(cache: ConsultationCache) {
  return cache.data;
}

export function ConsultationPage() {
  const router = useRouter();
  const { consultationId } = router.query;

  const query = {
    consultationId: `${consultationId}` ?? "",
  };

  const { data: consultation } = useGetConsultation(query, {
    select: selectConsultation,
    enabled: !!consultationId,
  });

  if (
    !consultation ||
    consultation.status === "init" ||
    consultation.screen === "unpaid" ||
    consultation.screen === "uncomplete" ||
    consultation.screen === "booked" ||
    (consultation.status === "pending" && consultation.screen === "waiting")
  ) {
    return <ConsultationWaiting consultationId={`${consultationId}`} />;
  }

  if (
    consultation.status === "cancelled" ||
    (consultation.status === "pending" &&
      consultation.screen === "waiting-busy")
  ) {
    return <ConsultationDeclined consultationId={`${consultationId}`} />;
  }

  if (consultation.doctor && consultation.sbChannelUrl) {
    return <ConsultationChat consultationId={`${consultationId}`} />;
  }

  return null;
}
