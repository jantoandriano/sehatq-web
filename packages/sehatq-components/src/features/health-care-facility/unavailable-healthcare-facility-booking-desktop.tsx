import { useAssets } from "@sehatq/utils";
import React from "react";
import { Button, Text, useImage, VStack } from "../../user-interfaces";

export function UnavailableHealthCareFacilityBookingInfoDesktop() {
  const ASSETS = useAssets(["UNAVAILABLE_AT_THE_MOMENT"]);
  const Image = useImage();
  return (
    <VStack
      bg="white"
      w="xs"
      borderRadius="xl"
      boxShadow="0 2px 12px rgba(218, 218, 218, 0.5)"
      py={8}
      px={5}
      spacing={8}
    >
      <Image
        src={ASSETS.UNAVAILABLE_AT_THE_MOMENT}
        layout="responsive"
        alt="Booking not available at the moment"
        width={1}
        height={1.1}
        wrapperProps={{
          width: "165px",
        }}
      />
      <VStack>
        <Text fontFamily="Poppins" fontWeight="semibold">
          Layanan Belum Tersedia Saat Ini
        </Text>
        <Text fontSize="sm" textAlign="center" pb={4}>
          Kamu bisa hubungi faskes ini untuk info lebih lanjut.
        </Text>
        <Button
          as="a"
          href="https://wa.me/6281288588167"
          variant="outline"
          color="sea.500"
          borderColor="main.500"
          fontSize="sm"
          isFullWidth
        >
          Hubungi CS SehatQ
        </Button>
      </VStack>
    </VStack>
  );
}
