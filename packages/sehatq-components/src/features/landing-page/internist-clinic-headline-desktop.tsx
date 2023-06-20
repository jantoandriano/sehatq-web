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

export function InternistClinicHeadlineDesktop() {
  const Image = useImage();
  const ASSETS = useAssets(["ILLUSTRATION_INTERNIST"]);

  return (
    <Box position="relative" width="full">
      <Image
        priority
        src={ASSETS.ILLUSTRATION_INTERNIST}
        alt="Headline Penyakit Dalam"
        height={650}
        width={1440}
        layout="responsive"
        wrapperProps={{
          width: "100%",
        }}
      />
      <SimpleBlock
        position="absolute"
        top="223px"
        left={0}
        right={0}
        zIndex={1}
      >
        <Text
          fontSize="60px"
          color="white"
          fontWeight="bold"
          w="668px"
          fontFamily="poppins"
          lineHeight="80px"
          mb="8px"
        >
          Pahami Kondisi Tubuhmu dari Dalam
        </Text>
        <Text fontSize="xl" color="white" w="668px">
          Klinik Online SehatQ Spesialis Penyakit Dalam memiliki beragam pilihan
          dokter ahli yang siap membantumu terkait pencegahan sampai rekomendasi
          pemulihan tubuh saat sakit. Konsultasi mudah lewat fitur Video Chat
          Dokter.
        </Text>
      </SimpleBlock>
    </Box>
  );
}

export function InternistClinicHeadlineSkeletonDesktop() {
  return (
    <Box position="relative" h="648px">
      <Skeleton backgroundColor="gray.500" h="648px" />
      <SimpleBlock position="absolute" top={10} left={0} right={0}>
        <SkeletonText w="668px" mt="223px" mb="20px" />
        <SkeletonText w="668px" />
      </SimpleBlock>
    </Box>
  );
}
