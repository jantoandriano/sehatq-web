import React from "react";
import { useNavigation, useAssets } from "@sehatq/utils";

import { Flex, Link, Text, VStack, useImage } from "../../user-interfaces";

export function MyEmptyMentalRecordMobile() {
  const { Navigate } = useNavigation();
  const Image = useImage();
  const ASSETS = useAssets(["EMPTY_MENTAL_HEALTH_RECORD"]);
  return (
    <Flex
      background="iceBlue.500"
      align="center"
      minHeight="calc(100vh - 210px)"
      flexDirection="column"
      justify="space-between"
      px={4}
      py={6}
    >
      <VStack spacing={2.5}>
        <Image
          src={ASSETS.EMPTY_MENTAL_HEALTH_RECORD}
          alt="Kenali Kesehatan Mentalmu"
          layout="fixed"
          height={235}
          width={235}
          priority
        />
        <Text fontFamily="poppins" fontWeight="semibold" fontSize="md">
          Kenali Kesehatan Mentalmu
        </Text>
        <Text w="290px" fontSize="sm" textAlign="center">
          Cek dan dapatkan gambaran kondisi kesehatan mentalmu saat ini
        </Text>
      </VStack>
      <Navigate name="MENTAL_HEALTH_TEST">
        <Link
          size="md"
          fontWeight="semibold"
          variant="solid"
          colorScheme="main"
          width="100%"
          boxShadow="blue-base"
        >
          Cek Kesehatan Mental
        </Link>
      </Navigate>
    </Flex>
  );
}
