import React from "react";
import {
  MyHealthServiceAppointmentActionsDesktop,
  MyHealthServiceAppointmentActionsDesktopProps,
} from "./my-health-service-appointment-actions-desktop";
import {
  MyHealthServiceAppointmentActionsMobile,
  MyHealthServiceAppointmentActionsMobileProps,
} from "./my-health-service-appointment-actions-mobile";

export type MyHealthServiceAppointmentActionsProps =
  | ({
      isMobile: true;
    } & MyHealthServiceAppointmentActionsMobileProps)
  | ({ isMobile: false } & MyHealthServiceAppointmentActionsDesktopProps);
export function MyHealthServiceAppointmentActions(
  props: MyHealthServiceAppointmentActionsProps
) {
  const { isMobile, ...otherProps } = props;

  if (isMobile) {
    return <MyHealthServiceAppointmentActionsMobile {...otherProps} />;
  }
  return <MyHealthServiceAppointmentActionsDesktop {...otherProps} />;
}
