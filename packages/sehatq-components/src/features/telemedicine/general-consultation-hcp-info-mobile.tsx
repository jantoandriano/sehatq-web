import React from "react";
import { useAssets } from "@sehatq/utils";
import { Box, HStack, Text, useImage, VStack } from "../../user-interfaces";

export function GeneralConsultationHCPInfoMobile() {
  const ASSETS = useAssets(["REGULAR_TELEMED_BANNER"]);
  const Image = useImage();
  return (
    <VStack width="full" spacing={6} align="start">
      <Text
        color="charcoalGrey"
        fontFamily="poppins"
        fontWeight="semibold"
        fontSize="md"
      >
        Detail Dokter
      </Text>
      <HStack
        background="white"
        borderRadius="lg"
        boxShadow="base"
        width="full"
        p={6}
        spacing={3}
      >
        <Image
          alt="Dokter Umum"
          src={ASSETS.REGULAR_TELEMED_BANNER}
          priority={true}
          layout="fill"
          objectFit="cover"
          sizes="63px"
          wrapperProps={{
            boxSize: "63px",
            position: "relative",
            borderRadius: "full",
            overflow: "hidden",
          }}
        />
        <Box>
          <Text
            color="charcoalGrey"
            fontSize="15px"
            fontWeight="semibold"
            fontFamily="poppins"
          >
            Konsultasi Dokter Umum
          </Text>
          <Text color="sea.500" fontSize="xs">
            Dokter Umum
          </Text>
        </Box>
      </HStack>
    </VStack>
  );
}
