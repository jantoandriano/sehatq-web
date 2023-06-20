import React from "react";

import { useAssets, useNavigation } from "@sehatq/utils";
import {
  Box,
  useImage,
  Text,
  Flex,
  Link,
  HStack,
  VStack,
} from "../../user-interfaces";

export function CardiacClinicHealthToolMobile() {
  const Image = useImage();
  const ASSETS = useAssets([
    "BANNER_CARDIAC_HEALTH_TOOL_MOBILE",
    "ILLUSTRATION_CARDIAC_HEALTH_TOOL",
    "ICON_GLUKOMETER_SHADOW",
  ]);
  const { Navigate } = useNavigation();

  return (
    <VStack spacing={4} w="full" align="start">
      <Text
        fontSize="5xl"
        fontFamily="Poppins"
        fontWeight="bold"
        color="charcoalGrey"
        lineHeight="40px"
        letterSpacing="0.01em"
      >
        Seberapa Sehat Jantungmu
      </Text>
      <Text
        fontSize="md"
        color="brownGrey.300"
        maxW="570px"
        fontFamily="Poppins"
        lineHeight={8}
      >
        Cari tahu sekarang kondisi kesehatan jantungmu serta tips menjaganya.
      </Text>
      <Box position="relative" w="full">
        <Flex
          position="absolute"
          zIndex={1}
          left={0}
          right={0}
          top={0}
          bottom={0}
          flexDirection="column"
          justifyContent="center"
          gap={7}
          pr={5}
          pl={5}
        >
          <HStack spacing={2} justifyContent="start" w="full">
            <Image
              priority
              src={ASSETS.ICON_GLUKOMETER_SHADOW}
              alt="Icon Glukometer"
              height={60}
              width={60}
              layout="fixed"
            />
            <Text
              fontSize="16px"
              color="white"
              fontFamily="poppins"
              lineHeight={7}
              fontWeight="semibold"
              maxWidth="212px"
            >
              Cek Risiko Penyakit Jantung
            </Text>
          </HStack>

          <Navigate
            name="HEALTH_TOOL_DETAIL"
            query={{ slug: "cek-risiko-penyakit-jantung" }}
          >
            <Link
              fontWeight="semibold"
              fontSize="sm"
              color="charcoalGrey"
              bgColor="white"
              whiteSpace="nowrap"
              py={3}
              textAlign="center"
              borderRadius="base"
              shadow="md"
              fontFamily="Poppins"
              letterSpacing="0.01em"
              variant="unstyled"
            >
              Tes Sekarang
            </Link>
          </Navigate>
        </Flex>
        <Image
          priority
          src={ASSETS.BANNER_CARDIAC_HEALTH_TOOL_MOBILE}
          alt="banner health tool"
          width={656}
          height={356}
          layout="responsive"
          wrapperProps={{
            width: "100%",
          }}
        />
      </Box>
    </VStack>
  );
}
