import { ASSETS } from "@sehatq/constants";
import React from "react";
import {
  HealthCareFacilityDetailCardDesktop,
  HealthCareFacilityDetailCardDesktopSkeleton,
} from "./health-care-facility-detail-card-desktop";
import {
  HealthCareFacilityDetailCardMobile,
  HealthCareFacilityDetailCardMobileSkeleton,
} from "./health-care-facility-detail-card-mobile";
import {
  HCFDetailCache,
  useGetHCFDetail,
} from "./health-care-facility-queries";

export type HealthCareFacilityDetailCardProps = {
  isMobile?: boolean;
  slug: string;
  userLat: string;
  userLong: string;
};

function selectDetail(cache: HCFDetailCache) {
  return cache.data;
}

export function HealthCareFacilityDetailCard(
  props: HealthCareFacilityDetailCardProps
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
    return <HealthCareFacilityDetailCardSkeleton isMobile={props.isMobile} />;
  }

  const otherProps = {
    imageUrl: data?.imageUrl ?? ASSETS.NO_IMAGE,
    hcfName: data?.name ?? "",
    hcfType: data?.type ?? "",
    hcfClass: data?.class ?? "",
    isPartner: Boolean(data?.partner),
    isEmergency: Boolean(data?.emergency),
    distance: data?.distance,
    openTime: data?.openTime ?? "",
    district: data?.district ?? "",
    city: data?.city ?? "",
    rating: data?.rating ?? 0,
    mapsUrl: data?.mapsUrl ?? "",
    isAllowBPJS: Boolean(data?.bpjs),
    address: data?.address ?? "",
  };

  if (props.isMobile) {
    const mobileProps = {
      ...otherProps,
      shareUrl: data?.shareUrl ?? "",
    };
    return <HealthCareFacilityDetailCardMobile {...mobileProps} />;
  }
  return <HealthCareFacilityDetailCardDesktop {...otherProps} />;
}

export type HealthCareFacilityDetailCardSkeletonProps = {
  isMobile?: boolean;
};

export function HealthCareFacilityDetailCardSkeleton(
  props: HealthCareFacilityDetailCardSkeletonProps
) {
  if (props.isMobile) {
    return <HealthCareFacilityDetailCardMobileSkeleton />;
  }
  return <HealthCareFacilityDetailCardDesktopSkeleton />;
}
