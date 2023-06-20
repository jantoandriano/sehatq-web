import React from "react";

import {
  TelemedicineHCPExperienceRatingMobile,
  TelemedicineHCPExperienceRatingMobileSkeleton,
} from "./telemedicine-hcp-experience-rating-mobile";
import {
  TelemedicineHCPExperienceRatingDesktop,
  TelemedicineHCPExperienceRatingDesktopSkeleton,
} from "./telemedicine-hcp-experience-rating-desktop";
import {
  TelemedicineDoctorCache,
  useGetTelemedicineDoctor,
} from "./doctor-queries";

export type TelemedicineHCPExperienceRatingProps = {
  isMobile?: boolean;
  doctorSlug: string;
};

function selectTelemedicineDoctor(doctor: TelemedicineDoctorCache) {
  const { rating, experience } = doctor.data;
  return {
    experience,
    ratingAverage: rating?.average ?? 0,
    ratingTotal: rating?.count ?? 0,
  };
}

export function TelemedicineHCPExperienceRating(
  props: TelemedicineHCPExperienceRatingProps
) {
  const { isMobile, doctorSlug, ...otherProps } = props;

  const { data: doctor, isLoading } = useGetTelemedicineDoctor(
    { doctorId: doctorSlug },
    { select: selectTelemedicineDoctor }
  );

  const newProps = {
    ...otherProps,
    doctor,
  };

  if (isLoading)
    return <TelemedicineHCPExperienceRatingSkeleton isMobile={isMobile} />;

  if (isMobile) {
    return <TelemedicineHCPExperienceRatingMobile {...newProps} />;
  }
  return <TelemedicineHCPExperienceRatingDesktop {...newProps} />;
}

export type TelemedicineHCPExperienceRatingSkeletonProps = {
  isMobile?: boolean;
};

export function TelemedicineHCPExperienceRatingSkeleton(
  props: TelemedicineHCPExperienceRatingSkeletonProps
) {
  if (props.isMobile) return <TelemedicineHCPExperienceRatingMobileSkeleton />;
  return <TelemedicineHCPExperienceRatingDesktopSkeleton />;
}
