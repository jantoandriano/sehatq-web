import React from "react";

import { useAssets } from "@sehatq/utils";

import {
  Box,
  useImage,
  Text,
  Skeleton,
  SkeletonText,
} from "../../user-interfaces";

export function PediatricClinicHeadlineMobile() {
  const Image = useImage();
  const ASSETS = useAssets(["ILLUSTRATION_CHILD_HEADLINES_MOBILE"]);

  return (
    <Box position="relative" width="full">
      <Text
        position="absolute"
        zIndex={1}
        fontSize="32px"
        color="white"
        textShadow="-1px -1.5px #36454F, -1px 0 #36454F, 1px 1px #36454F, 1px 0 #36454F, -3px 5px #36454F"
        fontWeight="700"
        top="124px"
        left="16px"
        fontFamily="poppins"
        width="calc(100% - 32px)"
      >
        Dampingi Tumbuh Kembang Si Kecil Tiap Waktu
      </Text>
      <Image
        priority
        src={ASSETS.ILLUSTRATION_CHILD_HEADLINES_MOBILE}
        alt="headline spesialis anak"
        height={650}
        width={360}
        layout="responsive"
        wrapperProps={{
          width: "100%",
        }}
      />
    </Box>
  );
}

export function PediatricClinicHeadlineSkeletonMobile() {
  return (
    <Box position="relative" h="737px">
      <Skeleton backgroundColor="gray.500" h="737px" />
      <Box px={10} pb={4} position="absolute" top={10} left={0} right={0}>
        <SkeletonText mt="231px" />
      </Box>
    </Box>
  );
}
