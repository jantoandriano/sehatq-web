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
import { ClinicBooking } from "./clinic-booking";

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
        Mari jaga pertumbuhan si Kecil, penuhi dengan nutrisi yang cukup
      </Text>
      <Text
        {...style}
        position="absolute"
        top="1.5px"
        color="#A80E62"
        textShadow="-1.5px -1.5px 0 #36454F, 1.5px -1.5px 0 #36454F, -1.5px 1.5px 0 #36454F, 1.5px 1.5px 0 #36454F;"
      >
        Mari jaga pertumbuhan si Kecil, penuhi dengan nutrisi yang cukup
      </Text>
    </Box>
  );
}

export function PediatricClinicBookingMobile() {
  const Image = useImage();
  const ASSETS = useAssets(["ILLUSTRATION_BANNER_BOOKING_MOBILE"]);

  return (
    <Box>
      <Box position="relative" mb="20px" mx="16px">
        <Image
          priority
          src={ASSETS.ILLUSTRATION_BANNER_BOOKING_MOBILE}
          alt="Mari jaga pertumbuhan si Kecil, penuhi dengan nutrisi yang cukup"
          height={144}
          width={328}
          layout="responsive"
        />
        <Box
          position="absolute"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          bottom="60px"
          top="0"
          left="20px"
          w="205px"
          zIndex={1}
        >
          {renderTextTitle()}
        </Box>
      </Box>
      <ClinicBooking
        isMobile
        specialitySlug="anak"
        title="Booking Dokter di Mana Saja, Kapan Saja"
      />
    </Box>
  );
}

export function PediatricClinicBookingSkeletonMobile() {
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
