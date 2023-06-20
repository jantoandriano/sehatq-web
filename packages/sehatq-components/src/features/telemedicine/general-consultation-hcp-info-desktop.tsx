import React from "react";
import { useAssets } from "@sehatq/utils";
import { Box, HStack, Text, useImage, VStack } from "../../user-interfaces";

export function GeneralConsultationHCPInfoDesktop() {
  const ASSETS = useAssets(["REGULAR_TELEMED_BANNER"]);
  const Image = useImage();
  return (
    <VStack
      align="start"
      justify="space-between"
      background="white"
      borderRadius="lg"
      boxShadow="base"
      width="300px"
      p={6}
      spacing={3}
    >
      <Text
        color="charcoalGrey"
        fontSize="md"
        fontWeight="semibold"
        fontFamily="poppins"
      >
        Informasi Dokter
      </Text>
      <HStack>
        <Image
          alt="Dokter Umum"
          src={ASSETS.REGULAR_TELEMED_BANNER}
          priority={true}
          layout="fill"
          objectFit="cover"
          sizes="60px"
          wrapperProps={{
            boxSize: "60px",
            position: "relative",
            borderRadius: "full",
            overflow: "hidden",
          }}
        />
        <Box>
          <Text
            color="charcoalGrey"
            fontSize="sm"
            fontWeight="semibold"
            fontFamily="poppins"
          >
            Konsultasi Dokter Umum
          </Text>
          <Text color="brownGrey.500" fontSize="xs">
            Dokter Umum
          </Text>
        </Box>
      </HStack>
    </VStack>
  );
}
