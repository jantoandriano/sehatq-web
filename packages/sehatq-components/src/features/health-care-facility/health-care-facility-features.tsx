import React from "react";
import {
  HealthCareFacilityFeaturesDesktop,
  HealthCareFacilityFeaturesDesktopSkeleton,
} from "./health-care-facility-features-desktop";
import {
  HealthCareFacilityFeaturesMobile,
  HealthCareFacilityFeaturesMobileSkeleton,
} from "./health-care-facility-features-mobile";
import {
  HCFDetailCache,
  useGetHCFDetail,
} from "./health-care-facility-queries";

export type HealthCareFacilityFeaturesProps = {
  isMobile?: boolean;
  slug: string;
  userLat: string;
  userLong: string;
};

function selectDetail(cache: HCFDetailCache) {
  const data = cache.data;
  return {
    generalFacility: data.generalFacility,
    medicalFacility: data.medicalFacility,
    insurance: data.insurance,
  };
}

export function HealthCareFacilityFeatures(
  props: HealthCareFacilityFeaturesProps
) {
  const { data, isLoading } = useGetHCFDetail(
    {
      hcfSlug: props.slug,
      userLat: props.userLat,
      userLong: props.userLong,
    },
    { select: selectDetail }
  );

  if (isLoading) {
    return <HealthCareFacilityFeaturesSkeleton isMobile={props.isMobile} />;
  }

  if (
    !data?.medicalFacility.length &&
    !data?.generalFacility.length &&
    !data?.insurance.length
  ) {
    return null;
  }

  const otherProps = {
    generalFacility: data?.generalFacility ?? [],
    medicalFacility: data?.medicalFacility ?? [],
    insurance: data?.insurance ?? [],
  };

  if (props.isMobile) {
    return <HealthCareFacilityFeaturesMobile {...otherProps} />;
  }
  return <HealthCareFacilityFeaturesDesktop {...otherProps} />;
}

export type HealthCareFacilityFeaturesSkeletonProps = {
  isMobile?: boolean;
};

export function HealthCareFacilityFeaturesSkeleton(
  props: HealthCareFacilityFeaturesSkeletonProps
) {
  if (props.isMobile) {
    return <HealthCareFacilityFeaturesMobileSkeleton />;
  }
  return <HealthCareFacilityFeaturesDesktopSkeleton />;
}
