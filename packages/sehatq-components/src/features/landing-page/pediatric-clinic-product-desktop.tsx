import React from "react";

import { useAssets, NavigationValue } from "@sehatq/utils";
import {
  Box,
  useImage,
  Text,
  Flex,
  Skeleton,
  SkeletonText,
  HStack,
} from "../../user-interfaces";
import { ClinicProduct } from "./clinic-product";

type PediatricClinicProductDesktopProps = {
  title: string;
  sortBy: string;
  categorySlug: string;
  productsNavigation: NavigationValue;
};

function renderTextTitle() {
  const style = {
    fontSize: "40px",
    fontWeight: "bold",
    fontFamily: "poppins",
    lineHeight: "60px",
  };
  return (
    <Box position="relative">
      <Text
        {...style}
        position="absolute"
        zIndex={1}
        color="white"
        left="3px"
        textShadow="-1.5px -1.5px 0 #000, 1.5px -1.5px 0 #000, -1.5px 1.5px 0 #000, 1.5px 1.5px 0 #000;"
      >
        Berikan yang Terbaik! Temukan Susu hingga Vitamin untuk Si Kecil
      </Text>
      <Text
        {...style}
        position="absolute"
        top="3px"
        color="#FAC425"
        textShadow="-2.5px -2.5px 0 #36454F, 2.5px -2.5px 0 #36454F, -2.5px 2.5px 0 #36454F, 2.5px 2.5px 0 #36454F;"
      >
        Berikan yang Terbaik! Temukan Susu hingga Vitamin untuk Si Kecil
      </Text>
    </Box>
  );
}

export function PediatricClinicProductDesktop(
  props: PediatricClinicProductDesktopProps
) {
  const Image = useImage();
  const ASSETS = useAssets([
    "ILLUSTRATION_BANNER_PRODUCT",
    "ICON_FREE_SHIPPING",
    "NO_IMAGE",
  ]);

  return (
    <Box position="relative">
      <Image
        priority
        src={ASSETS.ILLUSTRATION_BANNER_PRODUCT}
        alt="Berikan yang Terbaik! Temukan Susu hingga Vitamin untuk Si Kecil"
        layout="responsive"
        height={353}
        width={1160}
        wrapperProps={{
          mb: "20px",
        }}
      />
      <Box position="absolute" top="140px" right="155px" w="509px" zIndex={1}>
        {renderTextTitle()}
      </Box>
      <ClinicProduct isMobile={false} {...props} />
    </Box>
  );
}

export function PediatricClinicProductSkeletonDesktop() {
  return (
    <>
      <Skeleton w="1160px" h="353px" borderRadius="12px" mb="20px" />
      <Flex justifyContent="space-between" alignItems="flex-end" mb="28px">
        <SkeletonText w="570px" />
        <Skeleton w="150px" h="20px" />
      </Flex>
      <HStack spacing={5}>
        {Array.from(Array(6).keys()).map((id) => (
          <Box key={id}>
            <Skeleton w="177px" h="142" borderRadius="12px" mb="15px" />
            <SkeletonText />
          </Box>
        ))}
      </HStack>
    </>
  );
}
