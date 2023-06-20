import React from "react";
import { useNavigation, useAssets } from "@sehatq/utils";

import { VStack, Link, Text, useImage } from "../../user-interfaces";

export function MyEmptyMentalRecordDesktop() {
  const { Navigate } = useNavigation();
  const Image = useImage();
  const ASSETS = useAssets(["EMPTY_MENTAL_HEALTH_RECORD"]);
  return (
    <VStack
      spacing={6}
      border="0.5px solid"
      borderColor="veryLightPink"
      borderRadius="xl"
      background="iceBlue.500"
      pb={6}
    >
      <Image
        src={ASSETS.EMPTY_MENTAL_HEALTH_RECORD}
        alt="Kenali Kesehatan Mentalmu"
        layout="fixed"
        height={287}
        width={287}
        priority
      />
      <VStack spacing={2}>
        <Text fontFamily="poppins" fontWeight="semibold" fontSize="2xl">
          Kenali Kesehatan Mentalmu
        </Text>
        <Text w="456px" fontSize="md" textAlign="center">
          Cek dan dapatkan gambaran kondisi kesehatan mentalmu saat ini
        </Text>
      </VStack>
      <Navigate name="MENTAL_HEALTH_TEST">
        <Link
          size="md"
          fontWeight="semibold"
          variant="solid"
          colorScheme="main"
          width="300px"
          height="50px"
          boxShadow="main.500"
        >
          Cek Kesehatan Mental
        </Link>
      </Navigate>
    </VStack>
  );
}
