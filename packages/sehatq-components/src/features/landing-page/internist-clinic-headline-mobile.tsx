import React from "react";

import { useAssets } from "@sehatq/utils";

import {
  Box,
  useImage,
  Text,
  Skeleton,
  SkeletonText,
} from "../../user-interfaces";

export function InternistClinicHeadlineMobile() {
  const Image = useImage();
  const ASSETS = useAssets(["ILLUSTRATION_INTERNIST_MOBILE"]);

  return (
    <Box position="relative" width="full">
      <Text
        position="absolute"
        zIndex={1}
        fontSize="7xl"
        color="white"
        fontWeight="bold"
        top="107px"
        left={4}
        fontFamily="poppins"
      >
        Pahami Kondisi Tubuhmu dari Dalam
      </Text>
      <Image
        priority
        src={ASSETS.ILLUSTRATION_INTERNIST_MOBILE}
        alt="Headline Penyakit Dalam"
        height={632}
        width={360}
        layout="responsive"
        wrapperProps={{
          width: "100%",
        }}
      />
    </Box>
  );
}

export function InternistClinicHeadlineSkeletonMobile() {
  return (
    <Box position="relative" h="632px">
      <Skeleton backgroundColor="gray.500" h="632px" />
      <Box px={4} position="absolute" top={10} left={0} right={0}>
        <SkeletonText mt="107px" />
      </Box>
    </Box>
  );
}
