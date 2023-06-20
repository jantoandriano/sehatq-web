import React from "react";

import { useAssets } from "@sehatq/utils";
import {
  Box,
  useImage,
  Text,
  Flex,
  Skeleton,
  SkeletonText,
  HStack,
} from "../../user-interfaces";
import { ClinicBooking } from "./clinic-booking";

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
        Mari jaga pertumbuhan si Kecil, penuhi dengan nutrisi yang cukup
      </Text>
      <Text
        {...style}
        position="absolute"
        top="3px"
        color="#A80E62"
        textShadow="-2.5px -2.5px 0 #36454F, 2.5px -2.5px 0 #36454F, -2.5px 2.5px 0 #36454F, 2.5px 2.5px 0 #36454F;"
      >
        Mari jaga pertumbuhan si Kecil, penuhi dengan nutrisi yang cukup
      </Text>
    </Box>
  );
}

export function PediatricClinicBookingDesktop() {
  const Image = useImage();
  const ASSETS = useAssets(["ILLUSTRATION_BANNER_BOOKING"]);

  return (
    <Box position="relative">
      <Image
        priority
        src={ASSETS.ILLUSTRATION_BANNER_BOOKING}
        alt="Mari jaga pertumbuhan si Kecil, penuhi dengan nutrisi yang cukup"
        layout="responsive"
        height={353}
        width={1160}
        wrapperProps={{
          mb: "20px",
        }}
      />
      <Box position="absolute" top="130px" left="72px" w="509px" zIndex={1}>
        {renderTextTitle()}
      </Box>
      <ClinicBooking
        isMobile={false}
        specialitySlug="anak"
        bookingsNavigation={{
          name: "HEALTH_CARE_PROFESIONAL",
          query: { slugs: ["anak"] },
        }}
        title="Booking Dokter di Mana Saja, Kapan Saja"
      />
    </Box>
  );
}

export function PediatricClinicBookingSkeletonDesktop() {
  return (
    <>
      <Skeleton w="1160px" h="353px" borderRadius="12px" mb="20px" />
      <Flex justifyContent="space-between" alignItems="flex-end" mb="28px">
        <SkeletonText w="570px" />
        <Skeleton w="150px" h="20px" />
      </Flex>
      <HStack spacing={5}>
        {Array.from(Array(4).keys()).map((id) => (
          <Box key={id} w="275px">
            <Flex justifyContent="space-between" w="full" mb="12px">
              <SkeletonText flex="1" />
              <Skeleton w="56px" h="56px" borderRadius="full" />
            </Flex>
            <SkeletonText mb="16px" />
            <Skeleton w="full" h="32px" />
          </Box>
        ))}
      </HStack>
    </>
  );
}
