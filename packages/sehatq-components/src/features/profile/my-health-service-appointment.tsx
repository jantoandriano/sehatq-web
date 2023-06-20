import React from "react";
import { Box, VStack, Skeleton } from "../../user-interfaces";
import { PatientInfoCardSkeleton } from "./patient-info-card";
import {
  useGetMyHealthServiceAppointment,
  useCancelMyHealthServiceAppointment,
} from "./my-health-service-appointment-queries";
import { MyHealthServiceAppointmentDesktop } from "./my-health-service-appointment-desktop";
import { MyHealthServiceAppointmentMobile } from "./my-health-service-appointment-mobile";
import { MyHealthServiceAppointmentInfoCardSkeleton } from "./my-health-service-appointment-info-card";

export type MyHealthServiceAppointmentProps = {
  bookingId: string;
  isMobile: boolean;
};

export function MyHealthServiceAppointment(
  props: MyHealthServiceAppointmentProps
) {
  const cancelMyHealthServiceAppointmentMutation =
    useCancelMyHealthServiceAppointment();

  const { bookingId, isMobile } = props;

  const { data, refetch: refetchMyHealthAppointmentDetail } =
    useGetMyHealthServiceAppointment({ bookingId });

  if (!data) {
    if (isMobile) {
      return (
        <>
          <Box mb={2}>
            <PatientInfoCardSkeleton isMobile />
          </Box>
          <MyHealthServiceAppointmentInfoCardSkeleton isMobile={true} />
          <Skeleton w="100%" height="40px" />
        </>
      );
    }

    return (
      <VStack spacing={4} w="100%">
        <PatientInfoCardSkeleton isMobile={false} />
        <MyHealthServiceAppointmentInfoCardSkeleton isMobile={false} />
        <Skeleton w="100%" height="40px" />
      </VStack>
    );
  }

  if (isMobile) {
    return (
      <MyHealthServiceAppointmentMobile
        {...data?.data}
        id={bookingId}
        mutateCancelationReason={
          cancelMyHealthServiceAppointmentMutation.mutate
        }
        onSuccessCancelationReason={refetchMyHealthAppointmentDetail}
      />
    );
  }
  return (
    <MyHealthServiceAppointmentDesktop
      {...data?.data}
      id={bookingId}
      mutateCancelationReason={cancelMyHealthServiceAppointmentMutation.mutate}
      onSuccessCancelationReason={refetchMyHealthAppointmentDetail}
    />
  );
}
