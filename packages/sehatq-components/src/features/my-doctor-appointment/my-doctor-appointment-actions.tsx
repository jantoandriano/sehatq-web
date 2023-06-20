import React from "react";

import {
  MyDoctorAppointmentActionsMobile,
  MyDoctorAppointmentActionsMobileProps,
} from "./my-doctor-appointment-actions-mobile";
import {
  MyDoctorAppointmentActionsDesktop,
  MyDoctorAppointmentActionsDesktopProps,
} from "./my-doctor-appointment-actions-desktop";
import { useCancelMyDoctorAppointment } from "./my-doctor-appointments-queries";

export type MyDoctorAppointmentActionsProps =
  | ({
      isMobile: true;
      doctorSlug: string;
    } & MyDoctorAppointmentActionsMobileProps)
  | ({
      isMobile: false;
      doctorSlug: string;
    } & MyDoctorAppointmentActionsDesktopProps);

export function MyDoctorAppointmentActions(
  props: MyDoctorAppointmentActionsProps
) {
  const {
    isMobile,
    bookingId,
    doctorSlug,
    status,
    onSuccessCancelationReason,
    ...otherProps
  } = props;

  const cancelMyDoctorAppointmentMutation = useCancelMyDoctorAppointment();

  const baseProps = {
    ...otherProps,
    status,
    bookingId,
    doctorNavigation: {
      name: "HEALTH_CARE_PROFESIONAL" as const,
      query: { slugs: [doctorSlug] },
    },
    mutateCancelationReason: cancelMyDoctorAppointmentMutation.mutate,
    onSuccessCancelationReason,
  };

  if (isMobile) {
    return <MyDoctorAppointmentActionsMobile {...baseProps} />;
  }
  return <MyDoctorAppointmentActionsDesktop {...baseProps} />;
}
