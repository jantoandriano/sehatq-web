import React from "react";
import { useNavigation } from "@sehatq/utils";
import { Slider, Link } from "../../user-interfaces";
import {
  BookingDoctorStatusName,
  BOOKING_DOCTOR_STATUS,
} from "./my-doctor-appointment-constant";

export type MyDoctorAppointmentsFiltersDesktopProps = {
  userId: string;
  status: BookingDoctorStatusName;
};

export function MyDoctorAppointmentsFiltersDesktop(
  props: MyDoctorAppointmentsFiltersDesktopProps
) {
  const { userId, status } = props;
  const { Navigate } = useNavigation();
  return (
    <>
      <Slider
        slides={Object.values(BOOKING_DOCTOR_STATUS)}
        slideGap={2.5}
        startSlideIndex={Object.values(BOOKING_DOCTOR_STATUS).findIndex(
          (bookingDoctorStatus) => bookingDoctorStatus.status === status
        )}
        renderSlide={({ slide: bookingDoctorStatus }) => (
          <Navigate
            name="MY_BOOKING_DOCTORS"
            query={{ status: bookingDoctorStatus.status, userId }}
          >
            <Link
              variant="chip"
              colorScheme="paleBlue"
              size="md"
              fontSize="sm"
              fontWeight="semibold"
              isActive={status === bookingDoctorStatus.status}
            >
              {bookingDoctorStatus.label}
            </Link>
          </Navigate>
        )}
      />
    </>
  );
}
