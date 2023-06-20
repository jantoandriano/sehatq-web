import React from "react";
import { useNavigation, useAssets } from "@sehatq/utils";
import { Flex, Image, Link, Text, Box } from "../../user-interfaces";

export function MyEmptyHealthServiceAppointmentDesktop() {
  const { Navigate } = useNavigation();
  const ASSETS = useAssets(["EMPTY_HEALTH_SERVICE_APPOINTMENT"]);
  const hcfsNavigation = {
    name: "HEALTH_CARE_FACILITIES" as const,
    query: {},
  };
  return (
    <>
      <Flex align="center" flexDirection="column">
        <Image
          src={ASSETS.EMPTY_HEALTH_SERVICE_APPOINTMENT}
          alt="Booking layanan pemeriksaan tidak ditemukan"
          width="44.7%"
        />
        <Text
          fontFamily="poppins"
          fontWeight="semibold"
          fontSize="2xl"
          mb={2}
          mt={5}
        >
          Layanan Pemeriksaan
        </Text>
        <Text fontSize="lg" lineHeight="1.43" textAlign="center">
          Sakit itu enggak enak. Mending rutin
        </Text>
        <Text fontSize="lg" lineHeight="1.43" textAlign="center">
          periksa biar kondisi tetap prima.
        </Text>
      </Flex>
      <Box mt={6} textAlign="center">
        <Navigate name={hcfsNavigation.name} query={hcfsNavigation.query}>
          <Link size="md" variant="solid" colorScheme="main" width="300px">
            Booking Layanan Pemeriksaan
          </Link>
        </Navigate>
      </Box>
    </>
  );
}
