import React from "react";

import {
  HealthToolListDesktop,
  HealthToolListDesktopSkeleton,
} from "./health-tool-list-desktop";
import {
  HealthToolListMobile,
  HealthToolListMobileSkeleton,
} from "./health-tool-list-mobile";
import { useGetHealthTools, HealthToolsCache } from "./health-tool-queries";

export type HealthToolListProps = {
  isMobile?: boolean;
};

function selectHealtTools(healthTools: HealthToolsCache) {
  return healthTools.data;
}

export function HealthToolList(props: HealthToolListProps) {
  const { isMobile } = props;

  const query = {
    page: "1",
    perPage: "10",
    keyword: "",
  };

  const {
    data: healthTools = [],
    isLoading,
    error,
  } = useGetHealthTools(query, {
    select: selectHealtTools,
  });

  if (isLoading) return <HealthToolListSkeleton isMobile={isMobile} />;

  const otherProps = {
    healthTools: error ? [] : healthTools ?? [],
  };

  if (isMobile) {
    return <HealthToolListMobile {...otherProps} />;
  }

  return <HealthToolListDesktop {...otherProps} />;
}

export type HealthToolListSkeletonProps = {
  isMobile?: boolean;
};

export function HealthToolListSkeleton(props: HealthToolListSkeletonProps) {
  const { isMobile } = props;
  if (isMobile) return <HealthToolListMobileSkeleton />;

  return <HealthToolListDesktopSkeleton />;
}
