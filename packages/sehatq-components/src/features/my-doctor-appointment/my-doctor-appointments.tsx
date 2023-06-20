import React, { useCallback } from "react";
import { formatDate } from "@sehatq/utils";
import { UseMutationResult } from "react-query";

import {
  BookingDoctorsCache,
  CancelMyDoctorAppointmentVariables,
  useCancelMyDoctorAppointment,
  useGetMyDoctorAppointments,
} from "./my-doctor-appointments-queries";
import { MyDoctorAppointmentsMobile } from "./my-doctor-appointments-mobile";
import { ModelMyDoctorAppointments } from "./my-doctor-appointments-model";
import {
  BookingDoctorStatusName,
  BOOKING_DOCTOR_STATUS,
} from "./my-doctor-appointment-constant";
import { MyDoctorAppointmentsDesktop } from "./my-doctor-appointments-desktop";

export type MyDoctorAppointmentsProps = {
  isMobile: boolean;
  userId: string;
  status: BookingDoctorStatusName;
};

function modelMyDoctorAppointmentCard(
  bookingDoctor: ModelMyDoctorAppointments & {
    userId: string;
    cancelMyDoctorAppointmentMutation: UseMutationResult<
      {
        message: string;
      },
      {
        url: string | undefined;
        message: string;
        status: number | null;
        clientId: string;
      },
      CancelMyDoctorAppointmentVariables,
      unknown
    >;
    refetchMyDoctorAppointments: () => void;
  }
) {
  const {
    bookingId,
    bookingDate,
    createdDate,
    doctorSlug,
    rating,
    cancelMyDoctorAppointmentMutation,
    refetchMyDoctorAppointments,
    ...otherAttr
  } = bookingDoctor;
  return {
    ...otherAttr,
    createdDate: formatDate(new Date(createdDate), "d MMM, HH:mm"),
    bookingDate: formatDate(new Date(bookingDate), "d MMM yyyy"),
    bookingId,
    bookingIdLabel: `Booking ID: ${bookingId}`,
    doctorNavigation: {
      name: "HEALTH_CARE_PROFESIONAL" as const,
      query: { slugs: [doctorSlug] },
    },
    rating,
    mutateCancelationReason: cancelMyDoctorAppointmentMutation.mutate,
    onSuccessCancelationReason: () => {
      refetchMyDoctorAppointments();
    },
    onSuccessSubmitMyDoctorAppointmentReview: () => {
      refetchMyDoctorAppointments();
    },
  };
}

export function MyDoctorAppointments(props: MyDoctorAppointmentsProps) {
  const {
    isMobile,
    userId = "",
    status = BOOKING_DOCTOR_STATUS["all"].status,
  } = props;
  const cancelMyDoctorAppointmentMutation = useCancelMyDoctorAppointment();
  const { refetch: refetchMyDoctorAppointments } = useGetMyDoctorAppointments({
    userId,
  });
  const selectBookingDoctorsFilter = useCallback(
    (response: BookingDoctorsCache) => {
      return response.data
        .map((item) =>
          modelMyDoctorAppointmentCard({
            ...item,
            userId: userId || "all",
            cancelMyDoctorAppointmentMutation,
            refetchMyDoctorAppointments,
          })
        )
        .filter((bookingDoctor) =>
          status === BOOKING_DOCTOR_STATUS["all"].status
            ? true
            : status === bookingDoctor.status
        );
    },
    [
      status,
      userId,
      cancelMyDoctorAppointmentMutation,
      refetchMyDoctorAppointments,
    ]
  );
  const { data: bookingDoctors, error: errorBookingDoctors } =
    useGetMyDoctorAppointments(
      { userId },
      { select: selectBookingDoctorsFilter }
    );

  const otherProps = {
    bookingDoctors: errorBookingDoctors ? [] : bookingDoctors,
  };

  if (isMobile) {
    return <MyDoctorAppointmentsMobile {...otherProps} />;
  }
  return <MyDoctorAppointmentsDesktop {...otherProps} />;
}
