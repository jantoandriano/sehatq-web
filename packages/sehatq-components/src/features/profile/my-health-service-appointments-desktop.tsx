import React from "react";
import { Box, Stack } from "../../user-interfaces";
import {
  MyHealthServiceAppointmentCard,
  MyHealthServiceAppointmentCardProps,
  MyHealthServiceAppointmentCardSkeleton,
} from "./my-health-service-appointment-card";
import { MyEmptyHealthServiceAppointment } from "./my-empty-health-service-appointment";

export interface MyHealthServiceAppointmentsDesktopProps {
  isLoading: boolean;
  MyHealthServiceAppointments: Omit<
    MyHealthServiceAppointmentCardProps,
    "isMobile"
  >[];
  refInView: (node?: Element | null) => void;
  hasAnotherMyHealthServiceAppointments: boolean;
}

export function MyHealthServiceAppointmentsDesktop({
  isLoading,
  MyHealthServiceAppointments,
  refInView,
  hasAnotherMyHealthServiceAppointments,
}: MyHealthServiceAppointmentsDesktopProps) {
  return (
    <>
      {MyHealthServiceAppointments?.length > 0 ? (
        <Stack spacing={4} width="100%">
          {MyHealthServiceAppointments.map((item) => (
            <MyHealthServiceAppointmentCard
              key={item.id}
              {...item}
              isMobile={false}
            />
          ))}
          {hasAnotherMyHealthServiceAppointments ? (
            <Box ref={refInView}>
              <MyHealthServiceAppointmentCardSkeleton isMobile={false} />
            </Box>
          ) : null}
        </Stack>
      ) : isLoading ? (
        <Stack spacing={4}>
          {Array.from(Array(3).keys()).map((id) => (
            <MyHealthServiceAppointmentCardSkeleton key={id} isMobile={false} />
          ))}
        </Stack>
      ) : (
        <MyEmptyHealthServiceAppointment isMobile={false} />
      )}
    </>
  );
}
