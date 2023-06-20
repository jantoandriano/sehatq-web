import React from "react";
import {
  Box,
  Text,
  ProfileSideMenu,
  GridBlock,
  GridBlockItem,
  MyDoctorAppointment as _MyDoctorAppointment,
  MyDoctorAppointmentExpiredReview as _MyDoctorAppointmentExpiredReview,
} from "@sehatq/components";
import { SehatqNavbar } from "@components/ui/sehatq-navbar";
import { withQuery } from "src/utils";
import {
  MyDoctorAppointmentParams,
  MyDoctorAppointmentQuery,
} from "@get-props";

const MyDoctorAppointment = withQuery(
  _MyDoctorAppointment,
  (query: MyDoctorAppointmentParams & MyDoctorAppointmentQuery) => ({
    bookingId: query.bookingId,
    utmSource: query.utm_source,
  })
);

const MyDoctorAppointmentExpiredReview = withQuery(
  _MyDoctorAppointmentExpiredReview,
  (query: MyDoctorAppointmentParams) => ({
    bookingId: query.bookingId,
  })
);

export function MyDoctorAppointmentDesktop() {
  return (
    <>
      <SehatqNavbar withCompanyPartner />
      <GridBlock my={6}>
        <GridBlockItem>
          <ProfileSideMenu isMobile={false} />
        </GridBlockItem>
        <GridBlockItem>
          <Box>
            <Text fontSize="5xl" fontWeight="semibold" fontFamily="poppins">
              Aktivitas
            </Text>
            <Text fontSize="md">Catatan semua aktivitasmu.</Text>
          </Box>
          <Box mt={5}>
            <MyDoctorAppointmentExpiredReview isMobile={false} />
          </Box>
          <MyDoctorAppointment isMobile={false} />
        </GridBlockItem>
      </GridBlock>
    </>
  );
}
