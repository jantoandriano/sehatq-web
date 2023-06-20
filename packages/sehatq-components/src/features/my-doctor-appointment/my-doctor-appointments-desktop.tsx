import React from "react";
import { Stack } from "../../user-interfaces";
import {
  MyDoctorAppointmentCardSkeleton,
  MyDoctorAppointmentCardProps,
  MyDoctorAppointmentCard,
} from "./my-doctor-appointment-card";
import { EmptyMyDoctorAppointments } from "./empty-my-doctor-appointments";

export type MyDoctorAppointmentsDesktopProps = {
  bookingDoctors?: Omit<MyDoctorAppointmentCardProps, "isMobile">[];
};

export function MyDoctorAppointmentsDesktop(
  props: MyDoctorAppointmentsDesktopProps
) {
  const { bookingDoctors } = props;

  if (bookingDoctors) {
    if (bookingDoctors.length) {
      return (
        <Stack spacing={2.5}>
          {bookingDoctors.map((bookingDoctor) => {
            return (
              <MyDoctorAppointmentCard
                isMobile={false}
                {...bookingDoctor}
                key={bookingDoctor.bookingId}
              />
            );
          })}
        </Stack>
      );
    } else {
      return <EmptyMyDoctorAppointments isMobile={false} />;
    }
  } else {
    return (
      <Stack spacing={2.5}>
        {Array.from(Array(3).keys()).map((id) => (
          <MyDoctorAppointmentCardSkeleton key={id} isMobile={false} />
        ))}
      </Stack>
    );
  }
}
