import React from "react";

import { useAssets } from "@sehatq/utils";
import { Text, Box, useImage } from "../../user-interfaces";
import { ClinicBooking } from "./clinic-booking";

export function CardiacClinicBookingDesktop() {
  const Image = useImage();
  const ASSETS = useAssets(["BANNER_INTERNIST_CLINIC_BOOKING"]);
  return (
    <Box>
      <Box position="relative" mb={8}>
        <Image
          priority
          src={ASSETS.BANNER_INTERNIST_CLINIC_BOOKING}
          alt="Buat janji temu dokter kini lebih cepat"
          layout="responsive"
          height={413}
          width={1160}
        />
        <Text
          position="absolute"
          color="white"
          right="109px"
          top="193px"
          fontSize="40px"
          fontWeight="bold"
          fontFamily="poppins"
          w="584px"
        >
          Buat Janji Temu Dokter Kini Lebih Cepat
        </Text>
      </Box>
      <ClinicBooking
        isMobile={false}
        specialitySlug="jantung"
        bookingsNavigation={{
          name: "HEALTH_CARE_PROFESIONAL",
          query: { slugs: ["jantung"] },
        }}
        title="Booking Dokter di Mana Saja & Kapan Saja"
      />
    </Box>
  );
}
