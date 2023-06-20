import React from "react";

import { useAssets, useNavigation } from "@sehatq/utils";
import {
  Box,
  useImage,
  Text,
  VStack,
  HStack,
  Link,
} from "../../user-interfaces";

export function CardiacClinicHealthToolDesktop() {
  const Image = useImage();
  const ASSETS = useAssets([
    "BANNER_CARDIAC_HEALTH_TOOL",
    "ILLUSTRATION_CARDIAC_HEALTH_TOOL",
    "ICON_GLUKOMETER_SHADOW",
  ]);
  const { Navigate } = useNavigation();

  return (
    <HStack w="full" spacing={32}>
      <VStack spacing={10} w="full" align="start">
        <Text
          fontSize="52px"
          fontFamily="Poppins"
          fontWeight="bold"
          color="charcoalGrey"
          lineHeight="80px"
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
          <HStack
            position="absolute"
            zIndex={1}
            left={0}
            right={0}
            top={0}
            bottom={0}
            justifyContent="space-between"
            pr={5}
            pl={2}
          >
            <HStack spacing={4} w="50%">
              <Image
                priority
                src={ASSETS.ICON_GLUKOMETER_SHADOW}
                alt="Icon Glukometer"
                height={80}
                width={80}
                layout="fixed"
              />
              <Text
                fontSize="xl"
                color="white"
                fontFamily="poppins"
                lineHeight={9}
                fontWeight="semibold"
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
                w="251px"
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
          </HStack>
          <Image
            priority
            src={ASSETS.BANNER_CARDIAC_HEALTH_TOOL}
            alt="banner health tool"
            width={668}
            height={154}
            layout="responsive"
            wrapperProps={{
              width: "100%",
            }}
          />
        </Box>
      </VStack>
      <Box>
        <Image
          priority
          src={ASSETS.ILLUSTRATION_CARDIAC_HEALTH_TOOL}
          alt="Ilustrasi"
          height={352}
          width={352}
          layout="fixed"
          wrapperProps={{
            width: "100%",
          }}
        />
      </Box>
    </HStack>
  );
}
