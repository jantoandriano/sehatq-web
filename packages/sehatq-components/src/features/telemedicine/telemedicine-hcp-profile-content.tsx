import React from "react";

import {
  TelemedicineHCPProfileContentMobile,
  TelemedicineHCPProfileContentSkeletonMobile,
} from "./telemedicine-hcp-profile-content-mobile";
import {
  TelemedicineHCPProfileContentDesktop,
  TelemedicineHCPProfileContentSkeletonDesktop,
} from "./telemedicine-hcp-profile-content-desktop";
import {
  TelemedicineDoctorCache,
  useGetTelemedicineDoctor,
} from "./doctor-queries";

export type TelemedicineHCPProfileContentProps = {
  isMobile?: boolean;
  doctorSlug: string;
};

function selectTelemedicineDoctor(doctor: TelemedicineDoctorCache) {
  const { hospital, ...data } = doctor.data;
  return {
    ...data,
    hospitalName: hospital.name ?? "",
  };
}

export function TelemedicineHCPProfileContent(
  props: TelemedicineHCPProfileContentProps
) {
  const { isMobile, doctorSlug } = props;

  const { data: doctor, isLoading } = useGetTelemedicineDoctor(
    { doctorId: doctorSlug },
    { select: selectTelemedicineDoctor }
  );

  const newProps = {
    doctor,
  };

  if (isLoading)
    return <TelemedicineHCPProfileContentSkeleton isMobile={isMobile} />;

  if (isMobile) {
    return <TelemedicineHCPProfileContentMobile {...newProps} />;
  }
  return <TelemedicineHCPProfileContentDesktop {...newProps} />;
}

export type TelemedicineHCPProfileContentSkeletonProps = {
  isMobile?: boolean;
};

export function TelemedicineHCPProfileContentSkeleton(
  props: TelemedicineHCPProfileContentSkeletonProps
) {
  if (props.isMobile) return <TelemedicineHCPProfileContentSkeletonMobile />;
  return <TelemedicineHCPProfileContentSkeletonDesktop />;
}
