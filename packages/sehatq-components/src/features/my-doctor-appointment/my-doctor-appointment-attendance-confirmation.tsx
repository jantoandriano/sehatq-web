import React from "react";
import { useAttendanceConfirmationMyDoctorAppointment } from "./my-doctor-appointments-queries";
import {
  MyDoctorAppointmentAttendanceConfirmationDesktop,
  MyDoctorAppointmentAttendanceConfirmationDesktopProps,
} from "./my-doctor-appointment-attendance-confirmation-desktop";
import {
  MyDoctorAppointmentAttendanceConfirmationMobile,
  MyDoctorAppointmentAttendanceConfirmationMobileProps,
} from "./my-doctor-appointment-attendance-confirmation-mobile";

export type MyDoctorAppointmentAttendanceConfirmationProps =
  | ({
      isMobile: true;
    } & Omit<
      MyDoctorAppointmentAttendanceConfirmationMobileProps,
      "onSubmitAttendanceConfirmation"
    >)
  | ({
      isMobile: false;
    } & Omit<
      MyDoctorAppointmentAttendanceConfirmationDesktopProps,
      "onSubmitAttendanceConfirmation"
    >);

export function MyDoctorAppointmentAttendanceConfirmation(
  props: MyDoctorAppointmentAttendanceConfirmationProps
) {
  const { isMobile, bookingId, onSuccessSubmit, onClose, ...modalProps } =
    props;
  const attendanceConfirmationMyDoctorAppointmentMutation =
    useAttendanceConfirmationMyDoctorAppointment();

  function onSubmitAttendanceConfirmation(value: string) {
    attendanceConfirmationMyDoctorAppointmentMutation.mutate(
      {
        bookingId,
        status: value,
      },
      {
        onSuccess: () => {
          onSuccessSubmit();
        },
      }
    );
    onClose();
  }

  const otherProps = {
    ...modalProps,
    onSuccessSubmit,
    bookingId,
    onClose,
    onSubmitAttendanceConfirmation,
  };

  if (isMobile)
    return <MyDoctorAppointmentAttendanceConfirmationMobile {...otherProps} />;

  return <MyDoctorAppointmentAttendanceConfirmationDesktop {...otherProps} />;
}
