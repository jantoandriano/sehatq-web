import React from "react";
import dynamic from "next/dynamic";
import {
  Flex,
  ConsultationHistoryProps,
  ChatSkeleton,
} from "@sehatq/components";

const ConsultationHistory = dynamic<ConsultationHistoryProps>(
  () => import("@sehatq/components").then((mod) => mod.ConsultationHistory),
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
      >
        <ChatSkeleton isMobile isHistory />
      </Flex>
    ),
  }
);

export type ConsultationHistoryMobileProps = {
  consultationId: string;
};

export function ConsultationHistoryMobile(
  props: ConsultationHistoryMobileProps
) {
  const { consultationId } = props;
  return (
    <Flex direction="column" minH="100vh" w="100%">
      <ConsultationHistory isMobile consultationId={consultationId} />
    </Flex>
  );
}
