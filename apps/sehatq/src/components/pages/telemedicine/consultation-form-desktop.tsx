import {
  Box,
  ConsultationDisclaimer,
  ConsultationDurationInfo,
  ConsultationForm,
  ConsultationRedirection,
  ConsultationHCPInfo,
  ConsultationScheduleInfo,
  GridBlock,
  GridBlockItem,
  SimpleSehatQFooter,
  VStack,
} from "@sehatq/components";
import React from "react";
import { SehatqNavbar } from "@components/ui/sehatq-navbar";

export type ConsultationFormPageDesktopProps = {
  doctorId: string;
  scheduleDay: string;
  scheduleTime: string;
  consultationId: string;
  type: "booking" | "walk-in";
  isShowNikAndAddress: boolean;
  duration: number | null | undefined;
};
export function ConsultationFormPageDesktop(
  props: ConsultationFormPageDesktopProps
) {
  return (
    <>
      <SehatqNavbar withCompanyPartner />
      <GridBlock my={6} isReverse>
        <GridBlockItem>
          <ConsultationRedirection currentNavigationName="TELEMEDICINE_FORM">
            <ConsultationForm {...props} />
          </ConsultationRedirection>
        </GridBlockItem>
        <GridBlockItem>
          <VStack spacing={6}>
            <ConsultationHCPInfo
              consultationId={Number(props.consultationId)}
            />
            {props.scheduleDay && (
              <ConsultationScheduleInfo
                isMobile={false}
                doctorId={props.doctorId}
                scheduleDay={props.scheduleDay}
                scheduleTime={props.scheduleTime}
              />
            )}
            <ConsultationDisclaimer isFullWidth />
            {props.duration && (
              <ConsultationDurationInfo
                isMobile={false}
                duration={props.duration}
              />
            )}
          </VStack>
        </GridBlockItem>
      </GridBlock>
      <Box marginTop={10}>
        <SimpleSehatQFooter isMobile={false} {...props} />
      </Box>
    </>
  );
}
