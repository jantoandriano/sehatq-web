import React from "react";
import { Alert } from "../../user-interfaces";

export function MyDoctorAppointmentExpiredReviewMobile() {
  return (
    <Alert fontSize="sm" status="warning">
      Kamu tidak dapat memberikan rating dan review lebih dari 8 hari setelah
      waktu konsultasi.
    </Alert>
  );
}
