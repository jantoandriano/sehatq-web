import React from "react";

import { useAssets } from "@sehatq/utils";
import { Text, Box, useImage } from "../../user-interfaces";
import { ClinicTelemedicine } from "./clinic-telemedicine";

export function CardiacClinicTelemedicineDesktop() {
  const Image = useImage();
  const ASSETS = useAssets(["BANNER_CARDIAC_CLINIC_TELEMEDICINE"]);
  return (
    <Box>
      <Box position="relative" mb={5}>
        <Image
          priority
          src={ASSETS.BANNER_CARDIAC_CLINIC_TELEMEDICINE}
          alt="Konsultasikan Kesehatan Jantungmu di SehatQ"
          layout="responsive"
          height={290}
          width={1160}
        />
        <Text
          position="absolute"
          color="white"
          left={14}
          top="110px"
          fontSize="40px"
          fontWeight="bold"
          fontFamily="poppins"
          w="584px"
        >
          Konsultasikan Kesehatan Jantungmu di SehatQ
        </Text>
      </Box>
      <ClinicTelemedicine
        isMobile={false}
        specialitySlug="jantung"
        telemedicinesNavigation={{
          name: "TELEMED_HCPS",
          query: { slugs: ["jantung"] },
        }}
        title="Tanya Langsung ke Ahlinya"
      />
    </Box>
  );
}
