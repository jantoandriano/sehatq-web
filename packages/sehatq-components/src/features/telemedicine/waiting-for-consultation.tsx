import React, { useEffect } from "react";

import { WaitingForConsultationDesktop } from "./waiting-for-consultation-desktop";
import { WaitingForConsultationMobile } from "./waiting-for-consultation-mobile";
import { useGetConsultation, ConsultationCache } from "./consultation-queries";

export type WaitingForConsultationProps = {
  isMobile?: boolean;
  isWebview?: boolean;
  consultationId?: string;
};

function selectConsultationScreen(consultation: ConsultationCache) {
  return consultation.data.screen;
}

export function WaitingForConsultation(props: WaitingForConsultationProps) {
  const { isMobile, consultationId } = props;
  const query = {
    consultationId: consultationId ?? "",
  };
  const { data: screen, refetch: refetchConsultation } = useGetConsultation(
    query,
    {
      select: selectConsultationScreen,
      enabled: Boolean(consultationId),
    }
  );

  useEffect(() => {
    const delay = 5000;
    function tick() {
      refetchConsultation({ cancelRefetch: true });
    }
    if (screen === "waiting") {
      const intervalId = setInterval(tick, delay);
      return () => clearInterval(intervalId);
    }
  }, [screen, refetchConsultation]);

  function onRefresh() {
    refetchConsultation({ cancelRefetch: true });
  }

  const otherProps = {
    onRefresh,
  };

  if (isMobile) {
    return <WaitingForConsultationMobile {...otherProps} />;
  }
  return <WaitingForConsultationDesktop />;
}
