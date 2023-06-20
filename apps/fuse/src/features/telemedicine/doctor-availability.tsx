import React from "react";
import { UserChannel } from "../user-channel";
import { useGetDoctorAvailability } from "./doctor-availability-queries";
import { DoctorUnavailable } from "./doctor-unavailable";

export function DoctorAvailability() {
  const {
    data: dataDoctorAvailability,
    isSuccess: isGetDoctorAvailabilitySuccess,
  } = useGetDoctorAvailability();

  if (
    isGetDoctorAvailabilitySuccess &&
    !dataDoctorAvailability?.data.available
  ) {
    return <DoctorUnavailable />;
  }

  return <UserChannel />;
}
