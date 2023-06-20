import React from "react";
import {
  HCPProfileContentDesktop,
  HCPProfileContentDesktopSkeleton,
} from "./health-care-professional-profile-content-desktop";
import {
  HCPProfileContentMobile,
  HCPProfileContentMobileSkeleton,
} from "./health-care-professional-profile-content-mobile";
import {
  HCPDetailCache,
  useGetHCPDetail,
} from "./health-care-professional-queries";

export type HCPProfileContentProps = {
  isMobile?: boolean;
  hcpSlug: string;
};

function selectHCPData(hcp: HCPDetailCache) {
  return hcp.data;
}

export function HCPProfileContent(props: HCPProfileContentProps) {
  const { isMobile, hcpSlug } = props;

  const query = {
    hcpSlug,
    userLat: "",
    userLong: "",
  };
  const { data: hcpData } = useGetHCPDetail(query, {
    select: selectHCPData,
  });

  const otherProps = {
    profile: hcpData?.profile ?? "",
  };

  if (!hcpData) {
    return null;
  }

  if (isMobile) {
    return <HCPProfileContentMobile {...otherProps} />;
  }

  return <HCPProfileContentDesktop {...otherProps} />;
}

export type HCPProfileContentSkeletonProps = {
  isMobile: boolean;
};

export function HCPProfileContentSkeleton(
  props: HCPProfileContentSkeletonProps
) {
  const { isMobile } = props;
  if (isMobile) {
    return <HCPProfileContentMobileSkeleton />;
  }
  return <HCPProfileContentDesktopSkeleton />;
}
