import React from "react";

import { useAssets } from "@sehatq/utils";
import { Box, Text, useImage } from "../../user-interfaces";
import { ClinicBooking } from "./clinic-booking";

export function CardiacClinicBookingMobile() {
  const Image = useImage();
  const ASSETS = useAssets(["BANNER_CLINIC_BOOKING_MOBILE"]);
  return (
    <Box>
      <Box position="relative" mb={6} mx={4}>
        <Image
          priority
          src={ASSETS.BANNER_CLINIC_BOOKING_MOBILE}
          alt="Buat janji temu dokter kini lebih cepat"
          layout="responsive"
          height={141}
          width={328}
        />
        <Text
          color="white"
          fontSize="sm"
          fontWeight="bold"
          fontFamily="poppins"
          w="188px"
          position="absolute"
          left="40%"
          top="calc(50% - 8px)"
        >
          Buat Janji Temu Dokter Kini Lebih Cepat
        </Text>
      </Box>
      <ClinicBooking
        isMobile
        specialitySlug="jantung"
        title="Booking Dokter di Mana Saja & Kapan Saja"
      />
    </Box>
  );
}
