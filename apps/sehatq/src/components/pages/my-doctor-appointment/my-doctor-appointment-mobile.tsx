import React from "react";
import {
  Box,
  MyDoctorAppointment as _MyDoctorAppointment,
  MyDoctorAppointmentExpiredReview as _MyDoctorAppointmentExpiredReview,
} from "@sehatq/components";
import { withQuery } from "src/utils";
import {
  MyDoctorAppointmentParams,
  MyDoctorAppointmentQuery,
} from "@get-props";
import { SehatQHeader } from "@components/ui/sehatq-header";

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

export function MyDoctorAppointmentMobile() {
  return (
    <>
      <SehatQHeader variant="text" text="Detail Booking Dokter" />
      <Box>
        <MyDoctorAppointmentExpiredReview isMobile />
      </Box>
      <MyDoctorAppointment isMobile={true} />
    </>
  );
}
