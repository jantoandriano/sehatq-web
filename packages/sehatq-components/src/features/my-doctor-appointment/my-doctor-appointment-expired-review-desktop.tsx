import React from "react";

import { Alert } from "../../user-interfaces";

export function MyDoctorAppointmentExpiredReviewDesktop() {
  return (
    <Alert status="warning" height="46px">
      Kamu tidak dapat memberikan rating dan review lebih dari 8 hari setelah
      waktu konsultasi.
    </Alert>
  );
}
