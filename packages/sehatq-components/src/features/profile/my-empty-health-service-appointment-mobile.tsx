import React from "react";
import { useNavigation, useAssets } from "@sehatq/utils";
import { Flex, Image, Link, Text, Spacer } from "../../user-interfaces";

export function MyEmptyHealthServiceAppointmentMobile() {
  const { Navigate } = useNavigation();
  const ASSETS = useAssets(["EMPTY_HEALTH_SERVICE_APPOINTMENT"]);
  const hcfsNavigation = {
    name: "HEALTH_CARE_FACILITIES" as const,
    query: {},
  };
  return (
    <Flex align="center" height="100%" flexDirection="column" pt={8} pb={6}>
      <Image
        src={ASSETS.EMPTY_HEALTH_SERVICE_APPOINTMENT}
        alt="Chat Dokter tidak ditemukan"
        width="72.5%"
      />
      <Text
        fontFamily="poppins"
        fontWeight="semibold"
        fontSize="md"
        mb={2}
        mt={3}
      >
        Layanan Pemeriksaan
      </Text>
      <Text fontSize="sm" lineHeight="1.43" textAlign="center">
        Sakit itu enggak enak. Mending rutin
      </Text>
      <Text fontSize="sm" lineHeight="1.43" textAlign="center" mb={2}>
        periksa biar kondisi tetap prima.
      </Text>
      <Spacer />
      <Navigate name={hcfsNavigation.name} query={hcfsNavigation.query}>
        <Link
          size="md"
          isFullWidth
          variant="solid"
          colorScheme="main"
          width="100%"
          height="50px"
          boxShadow="blue-base"
        >
          Booking Layanan Pemeriksaan
        </Link>
      </Navigate>
    </Flex>
  );
}
