import React from "react";
import { Box, Stack } from "../../user-interfaces";
import {
  MyHealthServiceAppointmentCard,
  MyHealthServiceAppointmentCardProps,
  MyHealthServiceAppointmentCardSkeleton,
} from "./my-health-service-appointment-card";
import { MyEmptyHealthServiceAppointment } from "./my-empty-health-service-appointment";

export interface MyHealthServiceAppointmentsMobileProps {
  isLoading: boolean;
  MyHealthServiceAppointments: Omit<
    MyHealthServiceAppointmentCardProps,
    "isMobile"
  >[];
  refInView: (node?: Element | null) => void;
  hasAnotherMyHealthServiceAppointments: boolean;
}

export function MyHealthServiceAppointmentsMobile({
  isLoading,
  MyHealthServiceAppointments,
  refInView,
  hasAnotherMyHealthServiceAppointments,
}: MyHealthServiceAppointmentsMobileProps) {
  return (
    <>
      {MyHealthServiceAppointments?.length > 0 ? (
        <Stack spacing={4} width="100%">
          {MyHealthServiceAppointments.map((item) => (
            <MyHealthServiceAppointmentCard
              key={item.id}
              {...item}
              isMobile={true}
            />
          ))}
          {hasAnotherMyHealthServiceAppointments ? (
            <Box ref={refInView}>
              <MyHealthServiceAppointmentCardSkeleton isMobile={true} />
            </Box>
          ) : null}
        </Stack>
      ) : isLoading ? (
        <Stack spacing={4}>
          {Array.from(Array(3).keys()).map((id) => (
            <MyHealthServiceAppointmentCardSkeleton key={id} isMobile={true} />
          ))}
        </Stack>
      ) : (
        <MyEmptyHealthServiceAppointment isMobile={true} />
      )}
    </>
  );
}
