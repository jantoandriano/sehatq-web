import React from "react";
import { useAssets } from "@sehatq/utils";
import { HStack, Text, useImage } from "../../user-interfaces";

export function OfficialPartnerBanner() {
  const Image = useImage();
  const ASSETS = useAssets(["MINISTRY_OF_HEALTH"]);

  return (
    <>
      <HStack
        spacing={0.5}
        justify="center"
        py={2}
        height="40px"
        width="full"
        background="iceBlue.500"
        borderRadius="xl"
      >
        <Text fontSize="xs">Mitra Tepercaya</Text>
        <Image
          src={ASSETS.MINISTRY_OF_HEALTH}
          alt="logo-kementerian-kesehatan"
          height={24}
          width={49}
          layout="fixed"
          priority
        />
      </HStack>
    </>
  );
}
