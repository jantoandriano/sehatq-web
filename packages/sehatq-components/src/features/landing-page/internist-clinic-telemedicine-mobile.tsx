import React from "react";
import { useAssets } from "@sehatq/utils";
import { Box, Text, useImage } from "../../user-interfaces";
import { ClinicTelemedicine } from "./clinic-telemedicine";

export function InternistClinicTelemedicineMobile() {
  const Image = useImage();
  const ASSETS = useAssets(["BANNER_INTERNIST_CLINIC_TELEMEDICINE_MOBILE"]);
  return (
    <Box>
      <Box position="relative" mb={4} mx={4}>
        <Image
          priority
          src={ASSETS.BANNER_INTERNIST_CLINIC_TELEMEDICINE_MOBILE}
          alt="Konsultasikan keluhanmu cukup dari rumah"
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
          Konsultasikan Keluhanmu Cukup dari Rumah
        </Text>
      </Box>
      <ClinicTelemedicine
        isMobile
        specialitySlug="penyakit-dalam"
        title="Mau Konsultasi Lebih Lanjut? Chat Dokter Sekarang"
      />
    </Box>
  );
}
