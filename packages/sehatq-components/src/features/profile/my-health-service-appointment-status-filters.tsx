import React from "react";
import { Slider, Skeleton } from "../../user-interfaces";
import {
  HEALTH_SERVICE_STATUS,
  HealthServiceStatusCode,
} from "./health-service-appointment-constants";
import {
  useGetInfiniteMyHealthServiceAppointments,
  InfiniteHealthServiceAppointmentsCache,
} from "./my-health-service-appointment-queries";
import { MyHealthServiceAppointmentStatusFiltersDesktop } from "./my-health-service-appointment-status-filters-desktop";
import { MyHealthServiceAppointmentStatusFiltersMobile } from "./my-health-service-appointment-status-filters-mobile";

function selectStatusFilter(
  statusFilter: InfiniteHealthServiceAppointmentsCache
) {
  return [
    { id: "all", status: "", statusLabel: "Semua" },
    ...statusFilter.pages[0].filter.status.map((statusFilter) => ({
      id: statusFilter.code,
      status: statusFilter.code,
      statusLabel: statusFilter.name,
    })),
  ];
}

export type MyHealthServiceAppointmentStatusFiltersProps = {
  userId: string;
  isMobile: boolean;
  status: HealthServiceStatusCode;
};

export function MyHealthServiceAppointmentStatusFiltersSkeleton(props: {
  isMobile: boolean;
}) {
  const slidesDummy = [{ id: 0 }, { id: 1 }, { id: 2 }];
  const { isMobile } = props;
  return (
    <Slider
      slides={slidesDummy}
      slideGap={2.5}
      renderSlide={() => (
        <Skeleton
          width="80px"
          height={isMobile ? "30px" : "40px"}
          borderRadius="40px"
        />
      )}
    />
  );
}

export function MyHealthServiceAppointmentStatusFilters(
  props: MyHealthServiceAppointmentStatusFiltersProps
) {
  const { status = HEALTH_SERVICE_STATUS[""].status, isMobile } = props;
  const { userId } = props;
  // handle if userId is all, will remove later after updated API
  const MyHealthServiceAppointmentsQuery = {
    userId: userId === "all" ? "" : userId,
    perPage: "5",
    page: "1",
    status: status || "",
  };
  const { data } = useGetInfiniteMyHealthServiceAppointments(
    MyHealthServiceAppointmentsQuery,
    { select: selectStatusFilter }
  );

  if (!data) {
    return (
      <MyHealthServiceAppointmentStatusFiltersSkeleton isMobile={isMobile} />
    );
  }

  const { ...otherProps } = {
    ...props,
    status,
    userId,
    statusFilter: data,
  };

  if (isMobile) {
    return <MyHealthServiceAppointmentStatusFiltersMobile {...otherProps} />;
  }
  return <MyHealthServiceAppointmentStatusFiltersDesktop {...otherProps} />;
}
