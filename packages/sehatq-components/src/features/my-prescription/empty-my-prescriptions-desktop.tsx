import React from "react";
import { useAssets } from "@sehatq/utils";
import { Text, Flex, useImage } from "../../user-interfaces";

export function EmptyMyPrescriptionsDesktop() {
  const ASSETS = useAssets(["EMPTY_MY_PRESCRIPTIONS"]);
  const Image = useImage();
  return (
    <Flex align="center" flexDirection="column">
      <Image
        src={ASSETS.EMPTY_MY_PRESCRIPTIONS}
        alt="empty-my-prescriptions"
        width={220}
        height={227}
        layout="fixed"
      />
      <Text
        fontWeight="semibold"
        fontSize="2xl"
        color="charcoalGrey"
        mb={2}
        mt={5}
      >
        Belum Ada Resep
      </Text>
      <Text color="charcoalGrey" fontSize="md" width="498px" textAlign="center">
        Setelah konsultasi dengan Dokter, kamu dapat melihat resep kamu disini
      </Text>
    </Flex>
  );
}
