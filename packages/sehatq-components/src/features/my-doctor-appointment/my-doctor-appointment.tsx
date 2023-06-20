import React from "react";
import { formatDate } from "@sehatq/utils";
import {
  SehatqUserIcon,
  Avatar,
  VStack,
  useDisclosure,
} from "../../user-interfaces";

import { PatientInfoCardSkeleton } from "../profile/patient-info-card";
import { MyDoctorAppointmentDesktop } from "./my-doctor-appointment-desktop";
import { MyDoctorAppointmentMobile } from "./my-doctor-appointment-mobile";
import { MyDoctorAppointmentInfoCardSkeleton } from "./my-doctor-appointment-info-card";
import { EmptyMyDoctorAppointment } from "./empty-my-doctor-appointment";
import {
  MyDoctorAppointmentCache,
  useGetMyDoctorAppointment,
} from "./my-doctor-appointments-queries";
import { BOOKING_DOCTOR_STATUS } from "./my-doctor-appointment-constant";

const FORMAT_DATE = "d MMMM yyyy";

function selectMyDoctorAppointmentInfo(response: MyDoctorAppointmentCache) {
  const boStatus = BOOKING_DOCTOR_STATUS[response.status];
  return {
    ...response,
    createdAt: formatDate(new Date(response.createdDate), "d MMM, HH:mm"),
    bookingDate: formatDate(new Date(response.createdDate), FORMAT_DATE),
    arrivalDate: formatDate(new Date(response.bookingDate), FORMAT_DATE),
    patientDob: formatDate(new Date(response.patientDob), FORMAT_DATE),
    status: {
      ...boStatus,
      id: boStatus.status,
    },
    statusCode: response.status,
  };
}

export interface MyDoctorAppointmentProps {
  isMobile?: boolean;
  bookingId: string;
  utmSource?: string;
}

export function MyDoctorAppointment({
  isMobile,
  bookingId,
  utmSource,
}: MyDoctorAppointmentProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    data,
    error,
    refetch: refetchMyDoctorAppointment,
  } = useGetMyDoctorAppointment(
    { bookingId },
    { select: selectMyDoctorAppointmentInfo }
  );

  const placeholderUserImg = data?.doctorImgSrc ? (
    <Avatar boxSize="80px" src={data?.doctorImgSrc} />
  ) : (
    <SehatqUserIcon boxSize="30px" />
  );

  if (error?.status === 400) {
    return <EmptyMyDoctorAppointment isMobile={isMobile} />;
  }

  if (!data) {
    if (isMobile) {
      return (
        <VStack spacing={5} w="100%">
          <MyDoctorAppointmentInfoCardSkeleton isMobile={true} />
        </VStack>
      );
    }

    return (
      <VStack spacing={5} w="100%">
        <PatientInfoCardSkeleton isMobile={false} />
        <MyDoctorAppointmentInfoCardSkeleton isMobile={false} />
      </VStack>
    );
  }

  const otherProps = {
    ...data,
    bookingId,
    utmSource,
    placeholderUserImg,
    onSuccessCancelationReason: refetchMyDoctorAppointment,
    onSuccessSubmitMyDoctorAppointmentReview: refetchMyDoctorAppointment,
    isOpen,
    onOpen,
    onClose,
  };

  if (isMobile) {
    return <MyDoctorAppointmentMobile {...otherProps} />;
  }

  return <MyDoctorAppointmentDesktop {...otherProps} />;
}
