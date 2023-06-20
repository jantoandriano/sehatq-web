import React from "react";

import { useAssets } from "@sehatq/utils";
import { Text, Box, useImage } from "../../user-interfaces";
import { ClinicTelemedicine } from "./clinic-telemedicine";

export function InternistClinicTelemedicineDesktop() {
  const Image = useImage();
  const ASSETS = useAssets(["BANNER_INTERNIST_CLINIC_TELEMEDICINE"]);
  return (
    <Box>
      <Box position="relative" mb={5}>
        <Image
          priority
          src={ASSETS.BANNER_INTERNIST_CLINIC_TELEMEDICINE}
          alt="Konsultasikan keluhanmu cukup dari rumah"
          layout="responsive"
          height={413}
          width={1160}
        />
        <Text
          position="absolute"
          color="white"
          left={14}
          top="197px"
          fontSize="40px"
          fontWeight="bold"
          fontFamily="poppins"
          w="584px"
        >
          Konsultasikan Keluhanmu Cukup dari Rumah
        </Text>
      </Box>
      <ClinicTelemedicine
        isMobile={false}
        specialitySlug="penyakit-dalam"
        telemedicinesNavigation={{
          name: "TELEMED_HCPS",
          query: { slugs: ["penyakit-dalam"] },
        }}
        title="Mau Konsultasi Lebih Lanjut? Chat Dokter Sekarang"
      />
    </Box>
  );
}
