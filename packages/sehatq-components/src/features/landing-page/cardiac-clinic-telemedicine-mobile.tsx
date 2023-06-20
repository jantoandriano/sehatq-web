import React from "react";
import { useAssets } from "@sehatq/utils";
import { Box, Text, useImage } from "../../user-interfaces";
import { ClinicTelemedicine } from "./clinic-telemedicine";

export function CardiacClinicTelemedicineMobile() {
  const Image = useImage();
  const ASSETS = useAssets(["BANNER_CARDIAC_CLINIC_TELEMEDICINE_MOBILE"]);
  return (
    <Box>
      <Box position="relative" mb={4} mx={4}>
        <Image
          priority
          src={ASSETS.BANNER_CARDIAC_CLINIC_TELEMEDICINE_MOBILE}
          alt="Konsultasikan Kesehatan Jantungmu di SehatQ"
          layout="responsive"
          height={141}
          width={328}
        />
        <Text
          position="absolute"
          color="white"
          left={4}
          top={14}
          fontSize="sm"
          fontWeight="bold"
          fontFamily="poppins"
          w="188px"
        >
          Konsultasikan Kesehatan Jantungmu di SehatQ
        </Text>
      </Box>
      <ClinicTelemedicine
        isMobile
        specialitySlug="jantung"
        title="Tanya Langsung ke Ahlinya"
      />
    </Box>
  );
}
