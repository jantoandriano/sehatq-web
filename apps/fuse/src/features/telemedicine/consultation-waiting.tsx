import React, { useEffect } from "react";
import {
  Box,
  Button,
  Fallback,
  Flex,
  VStack,
  Text,
  Image,
} from "@sehatq/components";
import { useAssets } from "@sehatq/utils";
import {
  ConsultationCache,
  useGetConsultation,
} from "../telemedicine/consultation-queries";

export type ConsultationWaitingProps = {
  consultationId?: string;
};

function selectScreen(chat: ConsultationCache) {
  return chat.data.screen;
}

export function ConsultationWaiting(props: ConsultationWaitingProps) {
  const { consultationId } = props;
  const query = {
    consultationId: consultationId ?? "",
  };
  const { data: screen, refetch: refetchConsultation } = useGetConsultation(
    query,
    {
      select: selectScreen,
      enabled: !!consultationId,
    }
  );

  useEffect(() => {
    const delay = 5000;
    const tick = () => refetchConsultation({ cancelRefetch: true });
    if (screen === "waiting") {
      const intervalId = setInterval(tick, delay);
      return () => clearInterval(intervalId);
    }
  }, [screen, refetchConsultation]);

  function onRefresh() {
    refetchConsultation({ cancelRefetch: true });
  }

  const ASSETS = useAssets(["ILLUSTRATION_WAITING", "SEHATQ"]);

  return (
    <Flex flexDirection="column" align="center" justify="center" minH="100vh">
      <Image src={ASSETS.SEHATQ} alt="SehatQ" width={160} height={132} />
      <Box my="auto">
        <Fallback
          image={{
            src: ASSETS.ILLUSTRATION_WAITING,
            width: 264,
            height: 264,
          }}
          layout="vertical"
          title="Menghubungkan dengan Dokter"
          description={
            <Text
              color="charcoalGrey"
              fontSize="sm"
              fontFamily="openSans"
              textAlign="center"
            >
              Tunggu sebentar ya, kamu akan segera <br /> terhubung dengan
              dokter
            </Text>
          }
          isMobile
        />
        <VStack spacing={2} mt={5}>
          <Button
            isLoading
            colorScheme="teal"
            variant="outline"
            spinnerPlacement="end"
            borderColor="white"
            size="lg"
          />
          <Button
            isFullWidth
            variant="unstyled"
            fontWeight="semibold"
            color="sea.500"
            onClick={onRefresh}
            fontSize="sm"
          >
            Refresh
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
}
