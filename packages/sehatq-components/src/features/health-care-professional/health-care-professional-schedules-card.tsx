import { ASSETS } from "@sehatq/constants";
import { formatDate } from "@sehatq/utils";
import React, { useState } from "react";
import {
  HCPSchedulesCardDesktop,
  HCPSchedulesCardDesktopSkeleton,
} from "./health-care-professional-schedules-card-desktop";
import {
  HCPSchedulesCardMobile,
  HCPSchedulesCardMobileSkeleton,
} from "./health-care-professional-schedules-card-mobile";
import {
  HCPSchedulesCache,
  useGetHCPSchedules,
} from "./health-care-professional-schedules-queries";

export type HCPSchedulesCardProps = {
  isMobile: boolean;
  hcpId: number;
  hcpSlug: string;
  hcfId: number;
  hcfName: string;
  hcfAddress: string;
  hcfDistance: number;
  hcfLatitude: number;
  hcfLongitude: number;
  hcfImageUrl: string;
  hcfImageAlt: string;
  hcfPartner: number;
  procedures: string[];
  bookingOnline: number;
  phone: string;
  isCollapse?: boolean;
  onCollapseToggle?: (hcfId: number, hcpId: number) => void;
  onScheduleClick?: (schedule?: {
    hcpId: number;
    hcfId: number;
    date: string;
    time: string;
    bookingOnline: number;
    refHcp: string;
  }) => void;
  selectedSchedule?: {
    hcpId: number;
    hcfId: number;
    date: string;
    time: string;
    bookingOnline: number;
    refHcp: string;
  };
  defaultDate?: Date;
};

function selectHCPSchedules(schedules: HCPSchedulesCache) {
  return schedules.data;
}
export function HCPSchedulesCard(props: HCPSchedulesCardProps) {
  const {
    isMobile,
    hcpId,
    hcfId,
    hcpSlug,
    bookingOnline,
    isCollapse,
    onCollapseToggle,
    onScheduleClick,
    selectedSchedule,
    defaultDate,
  } = props;
  const [showOtherSched, setShowOtherSched] = useState(false);
  const [showOtherProcedures, setShowOtherProcedures] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(
    defaultDate ?? new Date()
  );

  const query = {
    date: formatDate(selectedDate, "yyyy-MM-dd"),
    hcfId: `${props.hcfId}`,
    hcpId: `${props.hcpId}`,
    range: "6",
  };

  const { data: schedules, isLoading } = useGetHCPSchedules(query, {
    select: selectHCPSchedules,
    enabled: isCollapse,
  });

  function onShowOtherSched() {
    setShowOtherSched(!showOtherSched);
  }

  function onShowOtherProcedures() {
    setShowOtherProcedures(!showOtherProcedures);
  }

  function onSelectSchedule(date: string, time: string) {
    if (onScheduleClick) {
      onScheduleClick({
        hcpId,
        hcfId,
        date,
        time,
        bookingOnline,
        refHcp: hcpSlug,
      });
    }
  }

  function onCollapse() {
    if (onCollapseToggle) {
      onCollapseToggle(hcfId, hcpId);
    }
  }

  function onChangeDate(value: Date | undefined) {
    setSelectedDate(value ?? new Date());
    if (onScheduleClick) {
      onScheduleClick();
    }
  }

  if (isLoading) {
    return <HCPSchedulesCardSkeleton isMobile={isMobile} />;
  }

  const otherProps = {
    ...props,
    bookingOnline: !!bookingOnline,
    hcfImageUrl: props.hcfImageUrl || ASSETS.NO_IMAGE,
    schedules: schedules?.filter((f) => f.activeSchedules.length > 0) ?? [],
    isPartner: !!+props.hcfPartner,
    procedures: props.procedures.join(", "),
    showOtherSched,
    onShowOtherSched,
    showOtherProcedures,
    onShowOtherProcedures,
    collapse: !!isCollapse,
    onCollapse,
    onChangeDate,
    selectedDate,
    selectedSchedule: selectedSchedule,
    onSelectSchedule,
  };
  if (isMobile) {
    return <HCPSchedulesCardMobile {...otherProps} />;
  }
  return <HCPSchedulesCardDesktop {...otherProps} />;
}

export type HCPSchedulesCardSkeletonProps = {
  isMobile: boolean;
};

export function HCPSchedulesCardSkeleton(props: HCPSchedulesCardSkeletonProps) {
  const { isMobile } = props;
  if (isMobile) {
    return <HCPSchedulesCardMobileSkeleton />;
  }
  return <HCPSchedulesCardDesktopSkeleton />;
}
