import React from "react";
import { Stack } from "../../user-interfaces";
import {
  MyDoctorAppointmentCardSkeleton,
  MyDoctorAppointmentCardProps,
  MyDoctorAppointmentCard,
} from "./my-doctor-appointment-card";
import { EmptyMyDoctorAppointments } from "./empty-my-doctor-appointments";

export type MyDoctorAppointmentsMobileProps = {
  bookingDoctors?: Omit<MyDoctorAppointmentCardProps, "isMobile">[];
};

export function MyDoctorAppointmentsMobile(
  props: MyDoctorAppointmentsMobileProps
) {
  const { bookingDoctors } = props;

  if (bookingDoctors) {
    if (bookingDoctors.length) {
      return (
        <Stack spacing={2.5}>
          {bookingDoctors.map((bookingDoctor) => {
            return (
              <MyDoctorAppointmentCard
                isMobile
                {...bookingDoctor}
                key={bookingDoctor.bookingId}
              />
            );
          })}
        </Stack>
      );
    } else {
      return <EmptyMyDoctorAppointments isMobile />;
    }
  } else {
    return (
      <Stack spacing={2.5}>
        {Array.from(Array(3).keys()).map((id) => (
          <MyDoctorAppointmentCardSkeleton key={id} isMobile />
        ))}
      </Stack>
    );
  }
}
