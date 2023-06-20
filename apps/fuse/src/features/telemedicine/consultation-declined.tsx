import React from "react";
import { useAssets } from "@sehatq/utils";
import { Box, Button, Fallback, Flex, Image, Text } from "@sehatq/components";
import { ConsultationCache, useGetConsultation } from "./consultation-queries";

export type ConsultationDeclinedProps = {
  consultationId?: string;
};

function selectConsultation(chat: ConsultationCache) {
  return chat.data;
}

export function ConsultationDeclined(props: ConsultationDeclinedProps) {
  const { consultationId } = props;
  const query = {
    consultationId: consultationId ?? "",
  };
  const { isFetching, refetch: refetchConsultation } = useGetConsultation(
    query,
    {
      select: selectConsultation,
      enabled: Boolean(consultationId),
    }
  );

  function onRefresh() {
    refetchConsultation({ cancelRefetch: true });
  }

  const ASSETS = useAssets(["ILLUSTRATION_DOCTOR_BUSY", "SEHATQ"]);

  return (
    <Flex flexDirection="column" align="center" justify="center" minH="100vh">
      <Image src={ASSETS.SEHATQ} alt="SehatQ" width={160} height={132} />
      <Box my="auto">
        <Fallback
          image={{
            src: ASSETS.ILLUSTRATION_DOCTOR_BUSY,
            width: 264,
            height: 264,
          }}
          layout="vertical"
          title="Dokter Belum Bisa Melayanimu"
          description={
            <Text
              color="charcoalGrey"
              fontSize="sm"
              fontFamily="openSans"
              textAlign="center"
              width="260px"
            >
              Silakan ulangi 5-10 menit lagi atau coba konsultasi dengan dokter
              spesialis
            </Text>
          }
          isMobile
          isFullWidth
        />
        <Button
          isFullWidth
          isLoading={isFetching}
          variant="ghost"
          fontWeight="semibold"
          color="sea.500"
          onClick={onRefresh}
          fontSize="sm"
          mt={5}
        >
          Refresh
        </Button>
      </Box>
    </Flex>
  );
}
