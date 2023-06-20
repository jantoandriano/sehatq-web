import { ASSETS } from "@sehatq/constants";
import React from "react";
import {
  BasicHCPProfileCardDesktop,
  BasicHCPProfileCardDesktopSkeleton,
} from "./basic-health-care-professional-profile-card-desktop";
import {
  BasicHCPProfileCardMobile,
  BasicHCPProfileCardMobileSkeleton,
} from "./basic-health-care-professional-profile-card-mobile";
import {
  HCPDetailCache,
  useGetHCPDetail,
} from "./health-care-professional-queries";

export type BasicHCPProfileCardProps = {
  isMobile: boolean;
  hcpSlug: string;
};

function selectHCPData(hcp: HCPDetailCache) {
  return hcp.data;
}

export function BasicHCPProfileCard(props: BasicHCPProfileCardProps) {
  const { isMobile, hcpSlug } = props;
  const query = {
    hcpSlug,
    userLat: "",
    userLong: "",
  };
  const { data: hcpData, isLoading } = useGetHCPDetail(query, {
    select: selectHCPData,
  });

  const defaultImage =
    hcpData?.gender.toLowerCase() == "m"
      ? ASSETS.NO_IMAGE_DOCTOR_MALE
      : ASSETS.NO_IMAGE_DOCTOR_FEMALE;

  const otherProps = {
    imageUrl: hcpData?.imageUrl || defaultImage,
    imageAlt: hcpData?.imageAlt ?? `doctor-${hcpData?.name}`,
    doctorName: hcpData?.name ?? "",
    speciality: hcpData?.specialityName ?? "",
  };

  if (isLoading) {
    return <BasicHCPProfileCardSkeleton isMobile={isMobile} />;
  }

  if (isMobile) {
    return <BasicHCPProfileCardMobile {...otherProps} />;
  }

  return <BasicHCPProfileCardDesktop {...otherProps} />;
}

export type BasicHCPProfileCardSkeletonProps = {
  isMobile: boolean;
};

export function BasicHCPProfileCardSkeleton(
  props: BasicHCPProfileCardSkeletonProps
) {
  if (props.isMobile) {
    return <BasicHCPProfileCardMobileSkeleton />;
  }

  return <BasicHCPProfileCardDesktopSkeleton />;
}
