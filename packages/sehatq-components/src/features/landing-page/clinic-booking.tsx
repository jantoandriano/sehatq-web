import React from "react";

import { NavigationValue } from "@sehatq/utils";
import { useGetMyLocation } from "@sehatq/components";
import {
  HCPListCache,
  useGetHCPList,
} from "../health-care-professional/health-care-professional-queries";
import {
  ClinicBookingDesktop,
  ClinicBookingSkeletonDesktop,
} from "./clinic-booking-desktop";
import {
  ClinicBookingMobile,
  ClinicBookingSkeletonMobile,
} from "./clinic-booking-mobile";

export type ClinicBookingProps = {
  isMobile: boolean;
  title: string;
  specialitySlug: string;
  bookingsNavigation?: NavigationValue;
};
export type ClinicBookingSkeletonProps = { isMobile: boolean };

function selectHcpListData(hcpList: HCPListCache) {
  return hcpList.data;
}

export function ClinicBooking(props: ClinicBookingProps) {
  const { isMobile, title, specialitySlug, bookingsNavigation } = props;

  const { data: location } = useGetMyLocation();
  const productsQuery = {
    page: "1",
    perPage: "12",
    userLat: location?.lat ?? "",
    userLong: location?.long ?? "",
    query: "",
    procedureId: "",
    scheduleDayId: "",
    citySlug: "",
    gender: "",
    specialitySlug,
    sortBy: "terdekat",
    hcfId: "",
  };

  const { data: hcpList = [], isLoading } = useGetHCPList(productsQuery, {
    select: selectHcpListData,
  });

  if (isLoading) {
    return <ClinicBookingSkeleton isMobile={isMobile} />;
  }

  const newProps = {
    title,
    bookingsNavigation,
    hcpList,
  };

  if (isMobile) {
    return <ClinicBookingMobile {...newProps} />;
  }
  return <ClinicBookingDesktop {...newProps} />;
}

export function ClinicBookingSkeleton(props: ClinicBookingSkeletonProps) {
  const { isMobile } = props;

  if (isMobile) {
    return <ClinicBookingSkeletonMobile />;
  }
  return <ClinicBookingSkeletonDesktop />;
}
