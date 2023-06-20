import React from "react";

import { NavigationValue } from "@sehatq/utils";
import {
  TelemedicineDoctorsCache,
  useGetTelemedicineDoctors,
} from "../telemedicine/doctor-queries";
import {
  ClinicTelemedicineDesktop,
  ClinicTelemedicineSkeletonDesktop,
} from "./clinic-telemedicine-desktop";
import {
  ClinicTelemedicineMobile,
  ClinicTelemedicineSkeletonMobile,
} from "./clinic-telemedicine-mobile";

export type ClinicTelemedicineProps = {
  isMobile: boolean;
  title: string;
  specialitySlug: string;
  telemedicinesNavigation?: NavigationValue;
};
export type ClinicTelemedicineSkeletonProps = { isMobile: boolean };

function selectTelemedListData(telemed: TelemedicineDoctorsCache) {
  return telemed.data.map((item) => ({
    ...item,
    isBookingChannel:
      item.channels.findIndex((item) => item.code === "ConsultationBooking") >=
      0,
    isPrivateChannel:
      item.channels.findIndex((item) => item.code === "ConsultationPrivate") >=
      0,
  }));
}

export function ClinicTelemedicine(props: ClinicTelemedicineProps) {
  const { isMobile, title, specialitySlug, telemedicinesNavigation } = props;

  const productsQuery = {
    page: "1",
    perPage: "12",
    sort: "",
    userLat: "",
    userLon: "",
    search: "",
    campaignSlug: "",
    city: "",
    doctorExperience: "",
    gender: "",
    price: "",
    specialityId: specialitySlug,
    hospitalId: "",
  };

  const { data: telemed = [], isLoading } = useGetTelemedicineDoctors(
    productsQuery,
    {
      select: selectTelemedListData,
    }
  );

  if (isLoading) {
    return <ClinicTelemedicineSkeleton isMobile={isMobile} />;
  }

  const newProps = { title, telemedicinesNavigation, telemed };

  if (isMobile) {
    return <ClinicTelemedicineMobile {...newProps} />;
  }
  return <ClinicTelemedicineDesktop {...newProps} />;
}

export function ClinicTelemedicineSkeleton(
  props: ClinicTelemedicineSkeletonProps
) {
  const { isMobile } = props;

  if (isMobile) {
    return <ClinicTelemedicineSkeletonMobile />;
  }
  return <ClinicTelemedicineSkeletonDesktop />;
}
