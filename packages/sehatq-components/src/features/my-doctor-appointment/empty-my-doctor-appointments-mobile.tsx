import React from "react";
import { useAssets, useNavigation } from "@sehatq/utils";
import { Image, Text, Flex, Link } from "../../user-interfaces";

export type EmptyMyDoctorAppointmentsMobileProps = unknown;

export function EmptyMyDoctorAppointmentsMobile() {
  const { Navigate } = useNavigation();
  const ASSETS = useAssets(["EMPTY_BOOKING_DOCTOR"]);
  const telemedNavigation = {
    name: "TELEMEDICINES" as const,
    query: {},
  };
  return (
    <>
      <Flex align="center" flexDirection="column" mt={7}>
        <Image
          src={ASSETS.EMPTY_BOOKING_DOCTOR}
          alt={ASSETS.EMPTY_BOOKING_DOCTOR}
          width="64%"
          height="262px"
        />
        <Text fontWeight="semibold" fontSize="lg" color="sea.900" mb={2} mt={5}>
          Booking Dokter
        </Text>
        <Text
          color="sea.900"
          fontSize="md"
          width="290px"
          lineHeight="1.43"
          textAlign="center"
        >
          Sakit itu enggak enak. Mending rutin periksa biar kondisi tetap prima.
        </Text>
      </Flex>
      <Navigate name={telemedNavigation.name} query={telemedNavigation.query}>
        <Link
          size="md"
          isFullWidth
          variant="solid"
          colorScheme="main"
          width="100%"
        >
          Booking Sekarang
        </Link>
      </Navigate>
    </>
  );
}
