import React from "react";

import { useGetHealthTools } from "./health-tool-queries";
import {
  HealthToolRecordListDesktop,
  HealthToolRecordListDesktopSkeleton,
} from "./health-tool-record-list-desktop";
import {
  HealthToolRecordListMobile,
  HealthToolRecordListMobileSkeleton,
} from "./health-tool-record-list-mobile";

export type HealthToolRecordListProps = {
  isMobile: boolean;
  userId: string;
};

export function HealthToolRecordList({
  isMobile,
  userId,
}: HealthToolRecordListProps) {
  const { data, isLoading } = useGetHealthTools({
    page: "1",
    perPage: "10",
    keyword: "",
  });

  const props = {
    contents: data?.data || [],
    userId,
  };

  if (isLoading) {
    if (isMobile) return <HealthToolRecordListMobileSkeleton />;
    return <HealthToolRecordListDesktopSkeleton />;
  }

  if (isMobile) {
    return <HealthToolRecordListMobile {...props} />;
  }
  return <HealthToolRecordListDesktop {...props} />;
}
