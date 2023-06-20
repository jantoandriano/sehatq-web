import React from "react";
import { useAssets } from "@sehatq/utils";

import { Box, Image, Text } from "../../user-interfaces";

export function EmptyMyDoctorAppointmentMobile() {
  const ASSETS = useAssets(["EMPTY_BOOKING_DOCTOR"]);
  return (
    <Box
      background="iceBlue.500"
      align="center"
      pt={4}
      minHeight="calc(100vh - 56px)"
    >
      <Image
        src={ASSETS.EMPTY_BOOKING_DOCTOR}
        alt={ASSETS.EMPTY_BOOKING_DOCTOR}
        width="191px"
        height="192px"
      />
      <Text
        fontWeight="semibold"
        fontFamily="poppins"
        fontSize="md"
        color="charcoalGrey"
        mb={2}
        mt={4}
      >
        Data tidak ditemukan
      </Text>
      <Text fontSize="sm" color="charcoalGrey">
        Konfirmasi tidak tersedia di akun ini
      </Text>
    </Box>
  );
}
