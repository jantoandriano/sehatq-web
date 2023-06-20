import React from "react";
import dynamic from "next/dynamic";
import {
  GridBlockItem,
  GridBlock,
  Flex,
  ConsultationSideMenu,
  ConsultationProps,
  WaitingForConsultation,
  Box,
  SimpleSehatQFooter,
} from "@sehatq/components";
import { SehatqNavbar } from "@components/ui/sehatq-navbar";

const Consultation = dynamic<ConsultationProps>(
  () => import("@sehatq/components").then((mod) => mod.Consultation),
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
        paddingY={5}
        paddingX={12}
      >
        <WaitingForConsultation />
      </Flex>
    ),
  }
);

export type ConsultationDesktopProps = {
  consultationId: string;
  doctorId: string | null;
};

export function ConsultationDesktop(props: ConsultationDesktopProps) {
  const { consultationId, doctorId } = props;
  return (
    <>
      <SehatqNavbar withCompanyPartner />
      <GridBlock my={6} isReverse>
        <GridBlockItem>
          <Flex direction="column" minH="calc(100vh - 168px)" w="100%">
            <Consultation consultationId={consultationId} />
          </Flex>
        </GridBlockItem>
        {doctorId && (
          <GridBlockItem>
            <ConsultationSideMenu doctorId={doctorId} />
          </GridBlockItem>
        )}
      </GridBlock>
      <Box marginTop={10}>
        <SimpleSehatQFooter />
      </Box>
    </>
  );
}
