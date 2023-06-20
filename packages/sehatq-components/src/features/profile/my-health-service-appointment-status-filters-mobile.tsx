import React from "react";
import { useNavigation } from "@sehatq/utils";
import { Slider, Link, Box } from "../../user-interfaces";
import { HealthServiceStatusCode } from "./health-service-appointment-constants";

type statusFilterProps = {
  id: string;
  status: string;
  statusLabel: string;
};

export type MyHealthServiceAppointmentStatusFiltersMobileProps = {
  userId: string;
  status: HealthServiceStatusCode;
  statusFilter: Array<statusFilterProps>;
};

export function MyHealthServiceAppointmentStatusFiltersMobile(
  props: MyHealthServiceAppointmentStatusFiltersMobileProps
) {
  const { userId, status, statusFilter } = props;
  const { Navigate } = useNavigation();
  return (
    <Slider
      slides={statusFilter}
      slideGap={0}
      startSlideIndex={statusFilter.findIndex(
        (healthServiceStatus) => healthServiceStatus.status === status
      )}
      hideArrowButton
      renderSlide={({ slide: healthServiceStatus }) => (
        <Box ml={healthServiceStatus.id === "all" ? 2.5 : 0} mr={2.5}>
          <Navigate
            name="MY_HEALTH_SERVICES"
            query={{ status: healthServiceStatus.status, userId }}
          >
            <Link
              variant="chip"
              colorScheme="paleBlue"
              size="xs"
              background={
                status === healthServiceStatus.status ? "white" : undefined
              }
              isActive={status === healthServiceStatus.status}
            >
              {healthServiceStatus.statusLabel}
            </Link>
          </Navigate>
        </Box>
      )}
    />
  );
}
