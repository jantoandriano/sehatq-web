import { formatDate, parseToDate } from "@sehatq/utils";
import { useAtom } from "jotai";
import React from "react";
import {
  HCPBookingButtonDesktop,
  HCPBookingButtonDesktopSkeleton,
} from "./health-care-professional-booking-button-desktop";
import {
  HCPBookingButtonMobile,
  HCPBookingButtonMobileSkeleton,
} from "./health-care-professional-booking-button-mobile";
import { hcpScheduleSelectedAtom } from "./health-care-professional-schedules-card-atoms";

export type HCPBookingButtonProps = {
  isMobile?: boolean;
};

export function HCPBookingButton(props: HCPBookingButtonProps) {
  const { isMobile } = props;
  const [atomSelectedSchedule] = useAtom(hcpScheduleSelectedAtom);

  const queries = atomSelectedSchedule
    ? {
        "hcp-id": `${atomSelectedSchedule.hcpId}`,
        "hcf-id": `${atomSelectedSchedule.hcfId}`,
        refHcp: atomSelectedSchedule.refHcp,
        time: atomSelectedSchedule.time,
        date: formatDate(
          parseToDate(atomSelectedSchedule.date, "EEEE, dd MMMM yyyy", true),
          "yyyy-MM-dd"
        ),
        bookingOnline: `${atomSelectedSchedule.bookingOnline}`,
      }
    : undefined;

  if (isMobile) {
    return <HCPBookingButtonMobile queries={queries} />;
  }
  return <HCPBookingButtonDesktop queries={queries} />;
}

export type HCPBookingButtonSkeletonProps = {
  isMobile?: boolean;
};
export function HCPBookingButtonSkeleton(props: HCPBookingButtonSkeletonProps) {
  const { isMobile } = props;
  if (isMobile) {
    return <HCPBookingButtonMobileSkeleton />;
  }
  return <HCPBookingButtonDesktopSkeleton />;
}
