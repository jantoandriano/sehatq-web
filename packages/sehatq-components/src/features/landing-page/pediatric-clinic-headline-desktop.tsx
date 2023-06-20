import React from "react";

import { useAssets } from "@sehatq/utils";

import {
  Box,
  useImage,
  Text,
  Skeleton,
  SkeletonText,
} from "../../user-interfaces";
import { SimpleBlock } from "../layout";

export function PediatricClinicHeadlineDesktop() {
  const Image = useImage();
  const ASSETS = useAssets(["ILLUSTRATION_CHILD_HEADLINES"]);

  return (
    <Box position="relative" width="100%">
      <Image
        priority
        src={ASSETS.ILLUSTRATION_CHILD_HEADLINES}
        alt="headline spesialis anak"
        height={646}
        width={1440}
        layout="responsive"
        wrapperProps={{
          width: "100%",
        }}
      />
      <SimpleBlock
        position="absolute"
        zIndex={1}
        top="220px"
        left={0}
        right={0}
      >
        <Text
          fontSize="52px"
          color="white"
          textShadow="-1px -1.5px #36454F, -1px 0 #36454F, 1px 1px #36454F, 1px 0 #36454F, -3px 5px #36454F"
          fontWeight="700"
          w="566px"
          fontFamily="poppins"
        >
          Dampingi Tumbuh Kembang Si Kecil Tiap Waktu
        </Text>
      </SimpleBlock>
    </Box>
  );
}

export function PediatricClinicHeadlineSkeletonDesktop() {
  return (
    <Box position="relative" h="648px">
      <Skeleton backgroundColor="gray.500" h="648px" />
      <Box px={10} pb={4} position="absolute" top={10} left={0} right={0}>
        <SkeletonText w="566px" mt="231px" />
      </Box>
    </Box>
  );
}
