import React from "react";
import {
  HealthCareFacilityServicesDesktop,
  HealthCareFacilityServicesDesktopSkeleton,
} from "./health-care-facility-services-desktop";
import {
  HealthCareFacilityServicesMobile,
  HealthCareFacilityServicesMobileSkeleton,
} from "./health-care-facility-services-mobile";
import {
  HCFServicesCache,
  useGetHCFServices,
} from "./health-care-facility-services-queries";

export type HealthCareFacilityServicesProps = {
  isMobile?: boolean;
  slug: string;
};

function selectServices(cache: HCFServicesCache) {
  return cache.data;
}

export function HealthCareFacilityServices(
  props: HealthCareFacilityServicesProps
) {
  const { data, isLoading } = useGetHCFServices(
    { hcfSlug: props.slug },
    { select: selectServices }
  );

  if (isLoading) {
    return <HealthCareFacilityServicesSkeleton isMobile={props.isMobile} />;
  }

  if (data?.length == 0) {
    return null;
  }

  const otherProps = {
    hcfSlug: props.slug,
    procedures: data ? data.slice(0, 4) : [],
  };

  if (props.isMobile) {
    return <HealthCareFacilityServicesMobile {...otherProps} />;
  }
  return <HealthCareFacilityServicesDesktop {...otherProps} />;
}

export type HealthCareFacilityServicesSkeletonProps = {
  isMobile?: boolean;
};

export function HealthCareFacilityServicesSkeleton(
  props: HealthCareFacilityServicesSkeletonProps
) {
  if (props.isMobile) {
    return <HealthCareFacilityServicesMobileSkeleton />;
  }
  return <HealthCareFacilityServicesDesktopSkeleton />;
}
