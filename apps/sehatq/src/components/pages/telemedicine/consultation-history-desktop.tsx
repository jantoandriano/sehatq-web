import React from "react";
import dynamic from "next/dynamic";
import {
  GridBlockItem,
  GridBlock,
  Flex,
  ConsultationSideMenu,
  ConsultationHistoryProps,
  ChatSkeleton,
  Box,
  SimpleSehatQFooter,
  DoctorDocument,
} from "@sehatq/components";
import { SehatqNavbar } from "@components/ui/sehatq-navbar";

const ConsultationHistory = dynamic<ConsultationHistoryProps>(
  () => import("@sehatq/components").then((mod) => mod.ConsultationHistory),
  {
    ssr: false,
    loading: () => (
      <Flex
        flex="1"
        direction="column"
        borderRadius="lg"
        border="0.5px solid"
        borderColor="veryLightPink"
        height="100%"
        align="center"
        justify="start"
        overflow="hidden"
      >
        <ChatSkeleton isHistory />
      </Flex>
    ),
  }
);

export type ConsultationHistoryDesktopProps = {
  consultationId: string;
  doctorId: string | null;
};

export function ConsultationHistoryDesktop(
  props: ConsultationHistoryDesktopProps
) {
  const { consultationId, doctorId } = props;
  return (
    <>
      <SehatqNavbar withCompanyPartner />
      <GridBlock my={6} isReverse>
        <GridBlockItem>
          <Flex direction="column" minH="calc(100vh - 168px)" w="100%">
            <ConsultationHistory consultationId={consultationId} />
          </Flex>
        </GridBlockItem>
        {doctorId && (
          <GridBlockItem>
            <ConsultationSideMenu doctorId={doctorId} />
            <Box mt={4}>
              <DoctorDocument consultationId={consultationId} />
            </Box>
          </GridBlockItem>
        )}
      </GridBlock>
      <Box marginTop={10}>
        <SimpleSehatQFooter />
      </Box>
    </>
  );
}
