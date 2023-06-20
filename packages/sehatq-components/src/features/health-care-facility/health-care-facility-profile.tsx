import React, { useState } from "react";
import {
  HealthCareFacilityProfileDesktop,
  HealthCareFacilityProfileDesktopSkeleton,
} from "./health-care-facility-profile-desktop";
import {
  HealthCareFacilityProfileMobile,
  HealthCareFacilityProfileMobileSkeleton,
} from "./health-care-facility-profile-mobile";
import {
  HCFDetailCache,
  useGetHCFDetail,
} from "./health-care-facility-queries";

export type HealthCareFacilityProfileProps = {
  isMobile?: boolean;
  slug: string;
  userLat: string;
  userLong: string;
};

function selectDetail(cache: HCFDetailCache) {
  return { description: cache.data.description, hcfType: cache.data.type };
}

export function HealthCareFacilityProfile(
  props: HealthCareFacilityProfileProps
) {
  const [showAll, setShowAll] = useState(false);
  const { data, isLoading } = useGetHCFDetail(
    {
      hcfSlug: props.slug,
      userLat: props.userLat,
      userLong: props.userLong,
    },
    { select: selectDetail }
  );

  function onShowMore() {
    setShowAll(!showAll);
  }

  if (isLoading) {
    return <HealthCareFacilityProfileSkeleton isMobile={props.isMobile} />;
  }

  if (!data) {
    return null;
  }

  const otherProps = {
    description: data.description,
    showMoreButton: data.description.length > (props.isMobile ? 369 : 306),
    showAll,
    onShowMore,
    hcfType: data.hcfType,
  };

  if (props.isMobile) {
    return <HealthCareFacilityProfileMobile {...otherProps} />;
  }
  return <HealthCareFacilityProfileDesktop {...otherProps} />;
}

export type HealthCareFacilityProfileSkeletonProps = {
  isMobile?: boolean;
};

export function HealthCareFacilityProfileSkeleton(
  props: HealthCareFacilityProfileSkeletonProps
) {
  if (props.isMobile) {
    return <HealthCareFacilityProfileMobileSkeleton />;
  }
  return <HealthCareFacilityProfileDesktopSkeleton />;
}
