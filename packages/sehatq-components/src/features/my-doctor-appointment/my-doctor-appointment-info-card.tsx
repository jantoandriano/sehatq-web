import React, { useEffect } from "react";

import { useToast, useDisclosure } from "../../user-interfaces";
import {
  MyDoctorAppointmentInfoCardDesktop,
  MyDoctorAppointmentInfoCardDesktopProps,
  MyDoctorAppointmentInfoCardSkeletonDesktop,
} from "./my-doctor-appointment-info-card-desktop";
import {
  MyDoctorAppointmentInfoCardMobile,
  MyDoctorAppointmentInfoCardMobileProps,
  MyDoctorAppointmentInfoCardSkeletonMobile,
} from "./my-doctor-appointment-info-card-mobile";
import { BOOKING_DOCTOR_STATUS } from "./my-doctor-appointment-constant";

export type MyDoctorAppointmentInfoCardProps =
  | ({ isMobile: false } & MyDoctorAppointmentInfoCardDesktopProps)
  | ({ isMobile: true } & MyDoctorAppointmentInfoCardMobileProps);

export function MyDoctorAppointmentInfoCard(
  props: MyDoctorAppointmentInfoCardProps
) {
  const { isMobile, isConfirmedAttendance, status, utmSource } = props;
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (
      (isConfirmedAttendance === 0 &&
        status === BOOKING_DOCTOR_STATUS["attended"].status) ||
      (isConfirmedAttendance === 0 &&
        utmSource === "attendance-confirmation-email" &&
        (status === BOOKING_DOCTOR_STATUS["attended"].status ||
          status === BOOKING_DOCTOR_STATUS["not-attended"].status))
    ) {
      const id = "attendance_0";
      toast({
        message: "Waktu untuk konfirmasi kehadiran telah habis",
        status: "error",
        id,
      });
    }

    if (
      isConfirmedAttendance === 1 &&
      utmSource === "attendance-confirmation-email" &&
      (status === BOOKING_DOCTOR_STATUS["attended"].status ||
        status === BOOKING_DOCTOR_STATUS["not-attended"].status)
    ) {
      const id = "attendance_1";
      toast({
        message: "Konfirmasimu sebelumnya sudah kami terima",
        status: "success",
        id,
      });
    }
  }, [isConfirmedAttendance, status, utmSource, toast]);

  const otherProps = {
    ...props,
    isOpen,
    onOpen,
    onClose,
  };

  if (isMobile) {
    return <MyDoctorAppointmentInfoCardMobile {...otherProps} />;
  }
  return <MyDoctorAppointmentInfoCardDesktop {...otherProps} />;
}

export type MyDoctorAppointmentInfoCardSkeletonProps = { isMobile: boolean };

export function MyDoctorAppointmentInfoCardSkeleton(
  props: MyDoctorAppointmentInfoCardSkeletonProps
) {
  const { isMobile } = props;

  if (isMobile) {
    return <MyDoctorAppointmentInfoCardSkeletonMobile />;
  }
  return <MyDoctorAppointmentInfoCardSkeletonDesktop />;
}
