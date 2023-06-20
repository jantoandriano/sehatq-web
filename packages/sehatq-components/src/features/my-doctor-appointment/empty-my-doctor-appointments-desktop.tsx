import React from "react";
import { useAssets, useNavigation } from "@sehatq/utils";
import { Image, Text, Flex, Link } from "../../user-interfaces";

export type EmptyMyDoctorAppointmentsDesktopProps = unknown;

export function EmptyMyDoctorAppointmentsDesktop() {
  const { Navigate } = useNavigation();
  const ASSETS = useAssets(["EMPTY_BOOKING_DOCTOR"]);
  const telemedNavigation = {
    name: "TELEMEDICINES" as const,
    query: {},
  };
  return (
    <>
      <Flex align="center" flexDirection="column">
        <Image
          src={ASSETS.EMPTY_BOOKING_DOCTOR}
          alt={ASSETS.EMPTY_BOOKING_DOCTOR}
          width="43%"
        />
        <Text
          fontWeight="semibold"
          fontSize="2xl"
          color="sea.900"
          mb={2}
          mt={5}
          fontFamily="poppins"
        >
          Booking Dokter
        </Text>
        <Text
          color="sea.900"
          fontSize="lg"
          width="290px"
          lineHeight="1.43"
          textAlign="center"
        >
          Sakit itu enggak enak. Mending rutin periksa biar kondisi tetap prima.
        </Text>
      </Flex>
      <Flex justifyContent="center" marginTop={5}>
        <Navigate name={telemedNavigation.name} query={telemedNavigation.query}>
          <Link
            size="md"
            fontWeight="semibold"
            isFullWidth
            variant="solid"
            colorScheme="main"
            width="100%"
            maxWidth="300px"
          >
            Booking Sekarang
          </Link>
        </Navigate>
      </Flex>
    </>
  );
}
