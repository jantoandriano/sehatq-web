import React from "react";
import { useAssets } from "@sehatq/utils";
import { Text, Flex, useImage } from "../../user-interfaces";

export function EmptyMyPrescriptionsMobile() {
  const ASSETS = useAssets(["EMPTY_MY_PRESCRIPTIONS"]);
  const Image = useImage();
  return (
    <Flex align="center" flexDirection="column" mt={4}>
      <Image
        src={ASSETS.EMPTY_MY_PRESCRIPTIONS}
        alt="empty-my-prescriptions"
        width={222}
        height={229}
        layout="fixed"
      />
      <Text
        fontWeight="semibold"
        fontSize="md"
        color="charcoalGrey"
        mb={2}
        mt={5}
      >
        Belum Ada Resep
      </Text>
      <Text color="charcoalGrey" fontSize="xs" width="277px" textAlign="center">
        Setelah konsultasi dengan Dokter, kamu dapat melihat resep kamu disini
      </Text>
    </Flex>
  );
}
