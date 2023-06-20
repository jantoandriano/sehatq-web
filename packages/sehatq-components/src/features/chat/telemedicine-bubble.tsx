import React from "react";
import { useRouter } from "next/router";
import { useUpdateConsultationDoctorRecommendation } from "../telemedicine";
import {
  TelemedicineBubbleDesktop,
  TelemedicineBubbleDesktopProps,
} from "./telemedicine-bubble-desktop";
import {
  TelemedicineBubbleMobile,
  TelemedicineBubbleMobileProps,
} from "./telemedicine-bubble-mobile";

export type TelemedicineBubbleProps =
  | ({ isMobile: true } & TelemedicineBubbleMobileProps)
  | ({ isMobile: false } & TelemedicineBubbleDesktopProps);

export function TelemedicineBubble(props: TelemedicineBubbleProps) {
  const { isMobile, doctorRecommendationId, doctorSlug, ...otherProps } = props;
  const router = useRouter();
  const { consultationId } = router.query;

  const updateDoctorRecommendation =
    useUpdateConsultationDoctorRecommendation();

  const handleClickDoctorRecommendation = () => {
    if (consultationId) {
      updateDoctorRecommendation.mutate(
        {
          consultationId: `${consultationId}`,
          doctorRecommendationId,
          status: "user_clicked",
        },
        {
          onSuccess: () =>
            router.push(
              `/telemed/dokter/${doctorSlug}?doctorRecommendationId=${doctorRecommendationId}`
            ),
        }
      );
    }
  };

  const newProps = {
    ...otherProps,
    doctorSlug,
    doctorRecommendationId,
    handleClickDoctorRecommendation,
  };

  if (isMobile) {
    return <TelemedicineBubbleMobile {...newProps} />;
  }
  return <TelemedicineBubbleDesktop {...newProps} />;
}
