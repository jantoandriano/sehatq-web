import React from "react";
import { useNavigation } from "@sehatq/utils";
import { Slider, Link } from "../../user-interfaces";
import { HealthServiceStatusCode } from "./health-service-appointment-constants";

type statusFilterProps = {
  id: string;
  status: string;
  statusLabel: string;
};

export type MyHealthServiceAppointmentStatusFiltersDesktopProps = {
  userId: string;
  status: HealthServiceStatusCode;
  statusFilter: Array<statusFilterProps>;
};

export function MyHealthServiceAppointmentStatusFiltersDesktop(
  props: MyHealthServiceAppointmentStatusFiltersDesktopProps
) {
  const { userId, status, statusFilter } = props;
  const { Navigate } = useNavigation();
  return (
    <>
      <Slider
        slides={statusFilter}
        slideGap={2.5}
        startSlideIndex={statusFilter.findIndex(
          (healthServiceStatus) => healthServiceStatus.status === status
        )}
        renderSlide={({ slide: healthServiceStatus }) => (
          <Navigate
            name="MY_HEALTH_SERVICES"
            query={{ status: healthServiceStatus.status, userId }}
          >
            <Link
              variant="chip"
              colorScheme="paleBlue"
              size="md"
              fontSize="sm"
              fontWeight="semibold"
              background={
                status === healthServiceStatus.status ? "white" : undefined
              }
              isActive={status === healthServiceStatus.status}
            >
              {healthServiceStatus.statusLabel}
            </Link>
          </Navigate>
        )}
      />
    </>
  );
}
