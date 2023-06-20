import React from "react";
import { useAssets, useNavigation } from "@sehatq/utils";

import { Button, Flex, VStack, Link, Text } from "../../user-interfaces";
import { Fallback } from "../general";

export type WaitingForConsultationMobileProps = {
  onRefresh: () => void;
};

export function WaitingForConsultationMobile(
  props: WaitingForConsultationMobileProps
) {
  const { onRefresh } = props;

  const ASSETS = useAssets(["ILLUSTRATION_WAITING"]);
  const { Navigate } = useNavigation();
  return (
    <Flex
      flex="1"
      flexDirection="column"
      justifyContent="space-between"
      height="100%"
      width="100%"
    >
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
            Tunggu sebentar ya, kamu akan segera <br /> terhubung dengan dokter
          </Text>
        }
        isMobile
      />
      <Button
        isLoading
        colorScheme="teal"
        variant="outline"
        spinnerPlacement="end"
        borderColor="white"
        size="lg"
      />
      <VStack spacing={2}>
        <Button
          isFullWidth
          variant="outline"
          fontWeight="semibold"
          color="sea.500"
          onClick={onRefresh}
          fontSize="sm"
        >
          Refresh
        </Button>
        <Navigate name="HOME">
          <Link
            variant="unstyled"
            fontWeight="semibold"
            color="sea.400"
            width="full"
            height="40px"
            fontSize="sm"
            borderRadius="base"
          >
            Kembali ke Home
          </Link>
        </Navigate>
      </VStack>
    </Flex>
  );
}
