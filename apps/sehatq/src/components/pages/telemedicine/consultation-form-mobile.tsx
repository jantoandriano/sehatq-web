import {
  ConsultationDurationInfo,
  ConsultationForm,
  ConsultationHCPInfo,
  ConsultationRedirection,
  VStack,
} from "@sehatq/components";
import React from "react";
import { SehatQHeader } from "@components/ui/sehatq-header";

export type ConsultationFormPageMobileProps = {
  consultationId: string;
  type: "booking" | "walk-in";
  isShowNikAndAddress: boolean;
  duration: number | null | undefined;
};
export function ConsultationFormPageMobile(
  props: ConsultationFormPageMobileProps
) {
  return (
    <>
      <SehatQHeader variant="text" text="Form Konsultasi" />
      <VStack align="start" p={4} spacing={4}>
        <ConsultationHCPInfo
          isMobile
          consultationId={Number(props.consultationId)}
        />
        {props.duration && (
          <ConsultationDurationInfo isMobile duration={props.duration} />
        )}
        <ConsultationRedirection currentNavigationName="TELEMEDICINE_FORM">
          <ConsultationForm isMobile {...props} />
        </ConsultationRedirection>
      </VStack>
    </>
  );
}
