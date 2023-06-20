import React from "react";
import dynamic from "next/dynamic";
import {
  Flex,
  ConsultationProps,
  WaitingForConsultation,
} from "@sehatq/components";

const Consultation = dynamic<ConsultationProps>(
  () => import("@sehatq/components").then((mod) => mod.Consultation),
  {
    ssr: false,
    loading: () => (
      <Flex
        flex="1"
        direction="column"
        height="100%"
        align="center"
        justify="start"
        overflow="hidden"
        padding={4}
      >
        <WaitingForConsultation isMobile />
      </Flex>
    ),
  }
);

export type ConsultationMobileProps = {
  consultationId: string;
};

export function ConsultationMobile(props: ConsultationMobileProps) {
  const { consultationId } = props;
  return (
    <Flex direction="column" minH="100vh" w="100%">
      <Consultation isMobile consultationId={consultationId} />
    </Flex>
  );
}
