import React from "react";

import { useAssets, NavigationValue } from "@sehatq/utils";
import {
  Box,
  useImage,
  Text,
  Skeleton,
  SkeletonText,
  HStack,
} from "../../user-interfaces";

import { ClinicProduct } from "./clinic-product";

type PediatricClinicProductMobileProps = {
  title: string;
  sortBy: string;
  categorySlug: string;
  productsNavigation: NavigationValue;
};

function renderTextTitle() {
  const style = {
    fontWeight: "bold",
    fontFamily: "poppins",
    lineHeight: "24px",
  };
  return (
    <Box position="relative">
      <Text
        {...style}
        position="absolute"
        zIndex={1}
        color="white"
        left="1.5px"
        textShadow="-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;"
      >
        Berikan yang Terbaik! Temukan Susu hingga Vitamin untuk Si Kecil
      </Text>
      <Text
        {...style}
        position="absolute"
        top="1.5px"
        color="#FAC425"
        textShadow="-1.5px -1.5px 0 #36454F, 1.5px -1.5px 0 #36454F, -1.5px 1.5px 0 #36454F, 1.5px 1.5px 0 #36454F;"
      >
        Berikan yang Terbaik! Temukan Susu hingga Vitamin untuk Si Kecil
      </Text>
    </Box>
  );
}

export function PediatricClinicProductMobile(
  props: PediatricClinicProductMobileProps
) {
  const Image = useImage();
  const ASSETS = useAssets(["ILLUSTRATION_BANNER_PRODUCT_MOBILE"]);

  return (
    <Box position="relative">
      <Box position="relative" mb="20px" mx="16px">
        <Image
          priority
          src={ASSETS.ILLUSTRATION_BANNER_PRODUCT_MOBILE}
          alt="Berikan yang Terbaik! Temukan Susu hingga Vitamin untuk Si Kecil"
          height={164}
          width={350}
          layout="responsive"
        />
        <Box
          position="absolute"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          bottom="30px"
          top="0"
          right="20px"
          w="205px"
          zIndex={1}
        >
          {renderTextTitle()}
        </Box>
      </Box>

      <ClinicProduct isMobile {...props} />
    </Box>
  );
}

export function PediatricClinicProductSkeletonMobile() {
  return (
    <>
      <Skeleton h="164px" borderRadius="12px" mb="20px" />
      <SkeletonText mb="32px" />
      <HStack spacing={3}>
        <Box w="150px">
          <Skeleton w="150px" h="141px" borderRadius="12px" mb="15px" />
          <SkeletonText />
        </Box>
        <Box w="150px">
          <Skeleton w="150px" h="141px" borderRadius="12px" mb="15px" />
          <SkeletonText />
        </Box>
      </HStack>
    </>
  );
}
