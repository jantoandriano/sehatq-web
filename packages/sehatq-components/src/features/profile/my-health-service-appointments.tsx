import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import {
  useGetInfiniteMyHealthServiceAppointments,
  InfiniteHealthServiceAppointmentsCache,
  useCancelMyHealthServiceAppointment,
} from "./my-health-service-appointment-queries";
import { ModelMyHealthServiceAppointments } from "./my-health-service-appointment-model";
import { MyHealthServiceAppointmentsDesktop } from "./my-health-service-appointments-desktop";
import { MyHealthServiceAppointmentsMobile } from "./my-health-service-appointments-mobile";
import { useGetProfile, ProfileCache } from "./profile-queries";

function selectProfileId(profile: ProfileCache) {
  return profile.id;
}

function selectMyHealthServiceAppointments(
  MyHealthServiceAppointments: InfiniteHealthServiceAppointmentsCache
) {
  return MyHealthServiceAppointments.pages.reduce<
    ModelMyHealthServiceAppointments[]
  >((oldItems, page) => [...oldItems, ...page.data], []);
}

function selectMyHealthServiceAppointmentsPagination(
  MyHealthServiceAppointments: InfiniteHealthServiceAppointmentsCache
) {
  return MyHealthServiceAppointments.pages[
    MyHealthServiceAppointments.pages.length - 1
  ].pagination;
}

export interface MyHealthServiceAppointmentsProps {
  isMobile?: boolean;
  userId?: string;
  status?: string;
}

export function MyHealthServiceAppointments(
  props: MyHealthServiceAppointmentsProps
) {
  const { isMobile = false, status, userId } = props;
  const { ref: refInView, inView } = useInView();
  // handle if userId is all, will remove later after updated API
  const { data: userIdCache } = useGetProfile({ select: selectProfileId });
  const userIdQuery = userId === "all" ? userIdCache : userId;

  const MyHealthServiceAppointmentsQuery = {
    userId: `${userIdQuery || ""}`,
    perPage: "5",
    page: "1",
    status: status || "",
  };

  const cancelMyHealthServiceAppointmentMutation =
    useCancelMyHealthServiceAppointment();

  const {
    fetchNextPage,
    isFetchingNextPage,
    data: MyHealthServiceAppointments,
    isLoading,
    error,
    refetch: refetchMyDoctorAppointments,
  } = useGetInfiniteMyHealthServiceAppointments(
    MyHealthServiceAppointmentsQuery,
    { select: selectMyHealthServiceAppointments }
  );

  const { data: pagination } = useGetInfiniteMyHealthServiceAppointments(
    MyHealthServiceAppointmentsQuery,
    { select: selectMyHealthServiceAppointmentsPagination }
  );

  const hasAnotherMyHealthServiceAppointments =
    pagination && !error
      ? pagination.page * pagination.perPage < pagination.total
      : false;
  useEffect(() => {
    if (
      inView &&
      !isFetchingNextPage &&
      hasAnotherMyHealthServiceAppointments
    ) {
      fetchNextPage();
    }
  }, [
    inView,
    isFetchingNextPage,
    hasAnotherMyHealthServiceAppointments,
    fetchNextPage,
  ]);

  const baseProps = {
    MyHealthServiceAppointments: MyHealthServiceAppointments?.map((item) => ({
      ...item,
      mutateCancelationReason: cancelMyHealthServiceAppointmentMutation.mutate,
      onSuccessCancelationReason: refetchMyDoctorAppointments,
      userId: `${userIdQuery || ""}`,
    })),
    isLoading: isLoading && !error,
    hasAnotherMyHealthServiceAppointments,
  };

  if (isMobile) {
    return (
      <MyHealthServiceAppointmentsMobile {...baseProps} refInView={refInView} />
    );
  }
  return (
    <MyHealthServiceAppointmentsDesktop {...baseProps} refInView={refInView} />
  );
}
