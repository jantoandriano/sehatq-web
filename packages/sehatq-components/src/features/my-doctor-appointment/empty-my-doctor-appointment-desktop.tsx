import React from "react";
import { useAssets } from "@sehatq/utils";

import { Flex, Image, Text } from "../../user-interfaces";

export function EmptyMyDoctorAppointmentDesktop() {
  const ASSETS = useAssets(["EMPTY_BOOKING_DOCTOR"]);
  return (
    <Flex align="center" flexDirection="column" mt={4}>
      <Image
        src={ASSETS.EMPTY_BOOKING_DOCTOR}
        alt={ASSETS.EMPTY_BOOKING_DOCTOR}
        width="239px"
        height="240px"
      />
      <Text
        fontWeight="semibold"
        fontFamily="poppins"
        fontSize="2xl"
        color="charcoalGrey"
        mb={2}
        mt={6}
      >
        Data tidak ditemukan
      </Text>
      <Text fontSize="md" color="charcoalGrey">
        Konfirmasi tidak tersedia di akun ini
      </Text>
    </Flex>
  );
}
