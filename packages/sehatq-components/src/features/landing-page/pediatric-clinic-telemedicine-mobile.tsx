import React from "react";
import { useAssets } from "@sehatq/utils";
import {
  Box,
  useImage,
  Text,
  Skeleton,
  SkeletonText,
  HStack,
} from "../../user-interfaces";
import { ClinicTelemedicine } from "./clinic-telemedicine";

function renderTextTitle({ label }: { label: string }) {
  const style = {
    fontWeight: "bold",
    fontFamily: "poppins",
    lineHeight: "19.6px",
    fontSize: "13px",
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
        {label}
      </Text>
      <Text
        {...style}
        position="absolute"
        top="1.5px"
        color="#30ACAD"
        textShadow="-1px -1px 0 #36454F, 1px -1px 0 #36454F, -1px 1px 0 #36454F, 1px 1px 0 #36454F;"
      >
        {label}
      </Text>
    </Box>
  );
}

export function PediatricClinicTelemedicineMobile() {
  const Image = useImage();
  const ASSETS = useAssets(["ILLUSTRATION_BANNER_TELEMEDICINE_MOBILE"]);

  return (
    <Box position="relative">
      <Box position="relative" mb="20px" mx="16px">
        <Image
          priority
          src={ASSETS.ILLUSTRATION_BANNER_TELEMEDICINE_MOBILE}
          alt="Siaga Kapan Saja untuk Anak Konsultasi Cukup dari Rumah"
          height={144}
          width={328}
          layout="responsive"
        />
        <Box
          position="absolute"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          bottom="30px"
          top="0"
          right={16}
          w="155px"
          zIndex={1}
        >
          {renderTextTitle({
            label: "Siaga Kapan Saja untuk Anak Konsultasi Cukup dari Rumah",
          })}
        </Box>
      </Box>

      <ClinicTelemedicine
        isMobile
        specialitySlug="anak"
        title="Si Kecil Sakit? Chat Dokter Sekarang"
      />
    </Box>
  );
}

export function PediatricClinicTelemedicineSkeletonMobile() {
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
